package com.rainbow.admin.config.controller;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rainbow.admin.config.service.AdminMenuServiceImpl;

@Controller
public class AdminMenuController {
	
	@Autowired
	private AdminMenuServiceImpl service;
	
	/**
	 * 메뉴설정 페이지
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/config/adminMenuList.do", method = RequestMethod.GET)
	public String adminMenuList(HttpServletRequest req) throws Exception{
		
		req.setAttribute("resultMap", service.getAdminMenuList(req));
		
		return "/config/adminMenuList";
	}
	
	/**
	 * 메뉴설정 페이지
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/config/saveAdminMenuAjax.do", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> saveAdminMenuAjax(HttpServletRequest req) throws Exception{
		return service.saveAdminMenu(req);
	}
}
