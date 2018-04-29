package com.rainbow.admin.config.dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

public interface AdminMemberDao {

	ArrayList<HashMap<String, Object>> getAdminMemberList(HashMap<String, Object> paramMap) throws SQLException;
	int getAdminMemberListCount(HashMap<String, Object> paramMap) throws SQLException;
	HashMap<String, Object> getAdminMemberOne(HashMap<String, Object> paramMap) throws SQLException;
	ArrayList<HashMap<String, Object>> getAdminMemberMenuAuthList(HashMap<String, Object> paramMap) throws SQLException;
	int insertAdminMember(HashMap<String, Object> paramMap) throws SQLException;
	int updateAdminMember(HashMap<String, Object> paramMap) throws SQLException;
	int insertAdminMenuAuth(HashMap<String, Object> paramMap) throws SQLException;
	int deleteAdminMenuAuth(HashMap<String, Object> paramMap) throws SQLException;
}
