package com.rainbow.admin.config.service;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

public interface AdminMemberService {

	HashMap<String, Object> adminMemberList(HttpServletRequest req) throws Exception;
	HashMap<String, Object> adminMemberWriteForm(HttpServletRequest req) throws Exception;
	HashMap<String, Object> insertAdminMember(HttpServletRequest req) throws Exception;
	HashMap<String, Object> updateAdminMember(HttpServletRequest req) throws Exception;
}
