package com.rainbow.admin.config.dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

public interface AdminMenuDao {

	public ArrayList<HashMap<String, Object>> getAdminMenuList(HashMap<String, Object> paramMap) throws SQLException;
	public int insertAdminMenu(HashMap<String, Object> paramMap) throws SQLException;
	public int updateAdminMenu(HashMap<String, Object> paramMap) throws SQLException;
}
