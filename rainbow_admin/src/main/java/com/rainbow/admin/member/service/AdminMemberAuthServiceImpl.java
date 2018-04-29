package com.rainbow.admin.member.service;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.rainbow.admin.util.AES256SecureUtil;
import com.rainbow.admin.util.RSASecureUtil;
import com.rainbow.admin.util.StringTool;
import com.rainbow.admin.constant.Constant;
import com.rainbow.admin.member.dao.AdminMemberAuthDao;

@Service
public class AdminMemberAuthServiceImpl implements AdminMemberAuthService {
	
	@Autowired
	private AdminMemberAuthDao adminMemberAuthDao;

	/**
	 * rsa 공개키 받기
	 */
	@Override
	public HashMap<String, Object> getRsaPublicKey(HttpServletRequest req) throws Exception{
		RSASecureUtil.destroyRsa(req);
		HashMap<String,Object> resultMap = RSASecureUtil.initRsa(req);
		return resultMap;
	}
	
	/**
	 * 관리자 로그인
	 */
	@Override
	@Transactional(propagation=Propagation.REQUIRED,  rollbackFor=Throwable.class)
	public HashMap<String, Object> adminLogin(HttpServletRequest req) throws Exception{
		
		HashMap<String,Object> paramMap = new HashMap<String,Object>();
		HashMap<String,Object> resultMap = new HashMap<String,Object>();
		
		if(!Constant.getRegexMatchResultOfString(req.getParameter("admin_id"),Constant.ID_REGULAR_EXPRESSTION)){
			resultMap.put("result", Constant.AJAX_RESULT_FAIL);
			resultMap.put("message","아이디가 유효하지 않습니다.");
			return resultMap;
		}
		if(StringUtils.isEmpty(req.getParameter("admin_password"))){
			resultMap.put("result", Constant.AJAX_RESULT_FAIL);
			resultMap.put("message","비밀번호를 입력해 주세요.");
			return resultMap;
		}
		
		String memberPassword = req.getParameter("admin_password");
		String decRsaAdminPassword = RSASecureUtil.decryptRsa(req, memberPassword);	//원본 비밀번호
		if(!Constant.getRegexMatchResultOfString(decRsaAdminPassword, Constant.PW_REGULAR_EXPRESSTION)){
			resultMap.put("result", Constant.AJAX_RESULT_FAIL);
			resultMap.put("message","비밀번호가 유효하지 않습니다.");
			return resultMap;
		}
		
		paramMap.put("admin_id", req.getParameter("admin_id"));
		HashMap<String, Object> adminMap = adminMemberAuthDao.getAdminMemberById(paramMap);
		if(StringUtils.isEmpty(adminMap)) {
			resultMap.put("result", Constant.AJAX_RESULT_FAIL);
			resultMap.put("message","존재하지 않는 아이디 입니다.");
			return resultMap;
		}
		
		AES256SecureUtil aes = new AES256SecureUtil();
		if(!decRsaAdminPassword.equals(aes.aesDecode(adminMap.get("ADMIN_PASSWORD").toString()))) {
			resultMap.put("result", Constant.AJAX_RESULT_FAIL);
			resultMap.put("message","비밀번호가 일치하지 않습니다.");
			return resultMap;
		}else {
			
			//로그인 상태정보 업데이트
			paramMap.put("admin_seq", adminMap.get("ADMIN_SEQ"));
			paramMap.put("admin_is_login", "1");
			paramMap.put("admin_login_ip", StringTool.getClientIp(req));
			adminMemberAuthDao.updateAdminMemberIsLogin(paramMap);
			
			//로그인(아웃)내역 등록
			paramMap.put("lo_type", "1");
			paramMap.put("lo_ip", StringTool.getClientIp(req));
			adminMemberAuthDao.insertAdminMemberLogin(paramMap);
			
			//세션저장
			adminMap = adminMemberAuthDao.getAdminMember(paramMap);
			HttpSession session = req.getSession();
			session.setAttribute("admin_member", adminMap);
			
			resultMap.put("result", Constant.AJAX_RESULT_SUCCESS);
			resultMap.put("message","로그인 성공.");
		}
		
		return resultMap;
	}
	
	/**
	 * 로그아웃
	 */
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public void adminLogout(HttpServletRequest req) throws Exception {
		HttpSession session = req.getSession();
		HashMap<String,Object> adminMember = (HashMap<String,Object>)session.getAttribute("admin_member");
		if(!StringUtils.isEmpty(adminMember)){
			adminMember.put("LO_TYPE", "2");
		}
//		adminMember.put("LO_DEVICE_ENV", req.getHeader("User-Agent"));
		//세션에 전달할 파라미터를 다시 셋팅한다.
		session.setAttribute("rb_member", adminMember);
		//세션을 파기 한다. 세션리스너에서 memberLogoutProcess() 호출한다.
		session.invalidate();
	}
	
	/**
	 * 로그 아웃 리스너 에서 호출 하는 함수.
	 */
	@Override
	@Transactional(propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public void memberLogoutProcess(HashMap<String,Object> adminMember) throws Exception{
		//세션타임아웃은 LO_TYPE 값이 없기때문에 넣어준다.
		if(StringUtils.isEmpty(adminMember.get("LO_TYPE"))){
			adminMember.put("LO_TYPE", "3");
		}
		
		HashMap<String,Object> paramMap = new HashMap<String,Object>();
		
		paramMap.put("admin_seq", adminMember.get("ADMIN_SEQ"));
		
		//로그인 상태정보 업데이트
		paramMap.put("admin_is_login", "0");
		adminMemberAuthDao.updateAdminMemberIsLogin(paramMap);
		
		//로그인(아웃)내역 등록
		paramMap.put("lo_type", adminMember.get("LO_TYPE"));
		paramMap.put("lo_ip", adminMember.get("ADMIN_LOGIN_IP"));
		adminMemberAuthDao.insertAdminMemberLogin(paramMap);
		
//		HashMap<String,Object> resultMap = memberAuthDao.memberLogoutProcess(paramMap); 
//		StringTool.HashMapConsoleViewer(resultMap);
		
	}

}
