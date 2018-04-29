package com.rainbow.admin.config.service;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.rainbow.admin.config.dao.AdminMenuDao;
import com.rainbow.admin.util.StringTool;
import com.rainbow.admin.constant.Constant;

@Service
public class AdminMenuServiceImpl implements AdminMenuService {

	@Autowired
	private AdminMenuDao adminMenuDao;
	
	/**
	 * 관리자 메뉴목록을 조회한다.
	 */
	@Override
	public HashMap<String, Object> getAdminMenuList(HttpServletRequest req) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> paramMap = new HashMap<String, Object>();
		
		if(!StringUtils.isEmpty(req.getParameter("menu_name"))) {
			paramMap.put("menu_name", req.getParameter("menu_name"));
			resultMap.put("menu_name", req.getParameter("menu_name"));
		}
		
		resultMap.put("menuList", adminMenuDao.getAdminMenuList(paramMap));
		
		return resultMap;
	}
	
	/**
	 * 관리자 메뉴 저장
	 */
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	@Override
	public HashMap<String, Object> saveAdminMenu(HttpServletRequest req) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> memberMap = StringTool.getSessionMap(req);
		
		if(StringUtils.isEmpty(req.getParameter("menuList"))) {
			resultMap.put("result", Constant.AJAX_RESULT_FAIL);
			resultMap.put("message", "잘못된 요청입니다.");
			return resultMap;
		}
		
		String jsonStr = req.getParameter("menuList");
		
		Gson gson = new Gson();
		List<HashMap<String,Object>> list = gson.fromJson(jsonStr, new TypeToken<List<HashMap<String,Object>>>(){}.getType());
		
		for(HashMap<String, Object> map : list) {
			map.put("menu_reg_user", memberMap.get("ADMIN_SEQ"));
			
			StringTool.HashMapConsoleViewer(map);
			
			if(StringUtils.isEmpty(map.get("menu_seq"))) {
				adminMenuDao.insertAdminMenu(map);
			}else {
				adminMenuDao.updateAdminMenu(map);
			}
		}
		
		resultMap.put("result", Constant.AJAX_RESULT_SUCCESS);
		resultMap.put("message", "저장하였습니다.");
		
		return resultMap;
	}
	
}
