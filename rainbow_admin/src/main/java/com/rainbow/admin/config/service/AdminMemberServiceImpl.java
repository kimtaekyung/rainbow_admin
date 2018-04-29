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
import com.rainbow.admin.config.dao.AdminMemberDao;
import com.rainbow.admin.constant.Constant;
import com.rainbow.admin.util.AES256SecureUtil;
import com.rainbow.admin.util.QuerystringPageing;
import com.rainbow.admin.util.StringTool;

@Service
public class AdminMemberServiceImpl implements AdminMemberService {

	@Autowired
	private AdminMemberDao adminMemberDao;
	
	/**
	 * 관리자 회원 목록 조회
	 */
	@Override
	public HashMap<String, Object> adminMemberList(HttpServletRequest req) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> paramMap = new HashMap<String, Object>();
		
		int total = adminMemberDao.getAdminMemberListCount(paramMap);
		String page = !StringUtils.isEmpty(req.getParameter("page")) ? req.getParameter("page") : "1";
		String pageSize = !StringUtils.isEmpty(req.getParameter("pageSize")) ? req.getParameter("pageSize") : "10";
		QuerystringPageing paging = new QuerystringPageing(total, Integer.parseInt(page), Integer.parseInt(pageSize));
		paramMap.put("page", paging.getLimit().get("start"));
		paramMap.put("pageSize", paging.getLimit().get("end"));
		resultMap.put("adminMemberList", adminMemberDao.getAdminMemberList(paramMap));
		resultMap.put("paging", paging.getScript("schFrm"));
		resultMap.put("page", page);
		resultMap.put("pageSize", pageSize);
		resultMap.put("total", total);
		
		return resultMap;
	}
	
	/**
	 * 관리자 입력폼 필요 데이터
	 */
	@Override
	public HashMap<String, Object> adminMemberWriteForm(HttpServletRequest req) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> paramMap = new HashMap<String, Object>();
		
		if(!StringUtils.isEmpty(req.getParameter("admin_seq"))) {
			paramMap.put("admin_seq", req.getParameter("admin_seq"));
			
			HashMap<String, Object> adminMember = adminMemberDao.getAdminMemberOne(paramMap);
			if(!StringUtils.isEmpty(adminMember) && !StringUtils.isEmpty(adminMember.get("ADMIN_HP"))) {
				AES256SecureUtil aes = new AES256SecureUtil();
				adminMember.put("ADMIN_HP", aes.aesDecode(adminMember.get("ADMIN_HP").toString()));
			}
			resultMap.put("adminMember", adminMember);
		}else {
			paramMap.put("admin_seq", 0);
		}
		
		resultMap.put("authList", adminMemberDao.getAdminMemberMenuAuthList(paramMap));
		
		return resultMap;
	}
	
	/**
	 * 관리자 등록
	 */
	@Override
	@Transactional(propagation=Propagation.REQUIRED,  rollbackFor=Throwable.class)
	public HashMap<String, Object> insertAdminMember(HttpServletRequest req) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> paramMap = new HashMap<String, Object>();
		
		
		return resultMap;
	}
	
	/**
	 * 관리자 수정
	 */
	@Override
	@Transactional(propagation=Propagation.REQUIRED,  rollbackFor=Throwable.class)
	public HashMap<String, Object> updateAdminMember(HttpServletRequest req) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		HashMap<String, Object> paramMap = new HashMap<String, Object>();
		HashMap<String, Object> memberMap = StringTool.getSessionMap(req);
		
		if(StringUtils.isEmpty(req.getParameter("admin_seq"))) {
			resultMap.put("result", Constant.AJAX_RESULT_FAIL);
			resultMap.put("message", "관리자 고유번호가 유효하지 않습니다.");
			return resultMap;
		}
		
		String jsonStr = req.getParameter("authList");
		
		Gson gson = new Gson();
		List<String> list = gson.fromJson(jsonStr, new TypeToken<List<String>>(){}.getType());
		
		AES256SecureUtil aes = new AES256SecureUtil();
		paramMap.put("admin_seq", req.getParameter("admin_seq"));
		if(!StringUtils.isEmpty(req.getParameter("admin_password"))) {
			paramMap.put("admin_password", aes.aesEncode(req.getParameter("admin_password")));
		}
		paramMap.put("admin_name", req.getParameter("admin_name"));
		paramMap.put("admin_hp", aes.aesEncode(req.getParameter("admin_hp")));
		paramMap.put("admin_email", req.getParameter("admin_email"));
		paramMap.put("admin_state", req.getParameter("admin_state"));
		paramMap.put("authList", list);
		paramMap.put("admin_mod_user", memberMap.get("ADMIN_SEQ"));
		paramMap.put("auth_reg_user", memberMap.get("ADMIN_SEQ"));
		
		//관리자회원정보 수정
		adminMemberDao.updateAdminMember(paramMap);
		
		//기존 메뉴권한 삭제
		adminMemberDao.deleteAdminMenuAuth(paramMap);
		
		//메뉴권한 등록
		adminMemberDao.insertAdminMenuAuth(paramMap);
		
		resultMap.put("result", Constant.AJAX_RESULT_SUCCESS);
		resultMap.put("message", "수정하였습니다.");
		
		return resultMap;
	}
}
