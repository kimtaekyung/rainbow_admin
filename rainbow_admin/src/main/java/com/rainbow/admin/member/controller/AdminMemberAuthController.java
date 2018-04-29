package com.rainbow.admin.member.controller;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.rainbow.admin.member.service.AdminMemberAuthServiceImpl;

@Controller
public class AdminMemberAuthController {
	
	@Autowired
	private AdminMemberAuthServiceImpl adminMemberAuthService;
	
	/**
	 * 관리자 로그인 페이지
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/auth/adminLogin.do", method = {RequestMethod.GET, RequestMethod.POST})
	public String adminLogin(HttpServletRequest req) throws Exception{
		return "/login";
	}

	/**
	 * rsa 공개키 가져오기 및 개인키 생성후 세션 저장
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/auth/getRsaPublicKey.do", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String,Object> getRsaPublicKey(HttpServletRequest req) throws Exception{
		return adminMemberAuthService.getRsaPublicKey(req);
	}
	
	/**
	 * 관리자 로그인
	 * @param req
	 * @param memberVo
	 * @param bindingResult
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/auth/adminLoginAjax.do", method = RequestMethod.POST)
	@ResponseBody
	public HashMap<String,Object> adminLoginAjax(HttpServletRequest req) throws Exception{
		return adminMemberAuthService.adminLogin(req);
	}
	
	/**
	 * 관리자 로그아웃
	 * @param req
	 * @param memberVo
	 * @param bindingResult
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/auth/adminLogout.do", method = {RequestMethod.GET, RequestMethod.POST})
	public String adminLogout(HttpServletRequest req) throws Exception{
		adminMemberAuthService.adminLogout(req);
		return "redirect:/";
	}
}
