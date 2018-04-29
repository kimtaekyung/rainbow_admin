package com.rainbow.admin.config.controller;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rainbow.admin.config.service.AdminMemberServiceImpl;

@Controller
public class AdminMemberController {
	
	@Autowired
	private AdminMemberServiceImpl service;
	
	/**
	 * 관리자목록 페이지
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/config/adminMemberList.do", method = RequestMethod.GET)
	public String adminMemberList(HttpServletRequest req) throws Exception{
		
		req.setAttribute("resultMap", service.adminMemberList(req));
		
		return "/config/adminMemberList";
	}
	
	/**
	 * 관리자 등록,수정 페이지
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/config/adminMemberWriteForm.do", method = RequestMethod.GET)
	public String adminMemberWriteForm(HttpServletRequest req) throws Exception{
		req.setAttribute("resultMap", service.adminMemberWriteForm(req));
		return "/config/adminMemberWriteForm";
	}
	
	/**
	 * 관리자 등록
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/config/insertAdminMemberAjax.do", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> insertAdminMemberAjax(HttpServletRequest req) throws Exception{
		return null;
	}
	
	/**
	 * 관리자 수정
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/config/updateAdminMemberAjax.do", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String, Object> updateAdminMemberAjax(HttpServletRequest req) throws Exception{
		return service.updateAdminMember(req);
	}
	
}
