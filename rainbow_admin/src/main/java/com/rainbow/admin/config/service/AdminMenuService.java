package com.rainbow.admin.config.service;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

public interface AdminMenuService {

	public HashMap<String, Object> getAdminMenuList(HttpServletRequest req) throws Exception;
	public HashMap<String, Object> saveAdminMenu(HttpServletRequest req) throws Exception;
}
