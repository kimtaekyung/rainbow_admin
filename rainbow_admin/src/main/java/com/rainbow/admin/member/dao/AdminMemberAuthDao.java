package com.rainbow.admin.member.dao;

import java.sql.SQLException;
import java.util.HashMap;

public interface AdminMemberAuthDao {

	public HashMap<String, Object> getAdminMemberById(HashMap<String, Object> paramMap) throws SQLException;
	public HashMap<String, Object> getAdminMember(HashMap<String, Object> paramMap) throws SQLException;
	public int updateAdminMemberIsLogin(HashMap<String, Object> paramMap) throws SQLException;
	public int insertAdminMemberLogin(HashMap<String, Object> paramMap) throws SQLException;
}
