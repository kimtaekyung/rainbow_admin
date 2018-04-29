package com.rainbow.admin.member.service;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

public interface AdminMemberAuthService {

	public HashMap<String, Object> getRsaPublicKey(HttpServletRequest req) throws Exception;
	public HashMap<String, Object> adminLogin(HttpServletRequest req) throws Exception;
	public void adminLogout(HttpServletRequest req) throws Exception;
	public void memberLogoutProcess(HashMap<String,Object> member) throws Exception;
}
