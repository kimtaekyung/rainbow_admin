<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>RShop Admin</title>
<meta charset="utf-8">
<meta http-equiv="Content-Script-Type" content="text/javascript">
<meta http-equiv="Content-Style-Type" content="text/css">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<%@include file="/WEB-INF/views/common/include.jsp"%>
<link rel="stylesheet" type="text/css" href="/css/login.css"/>

<script type="text/javascript" src="/js/RSA/rsa.js"></script>
<script type="text/javascript" src="/js/RSA/jsbn.js"></script>
<script type="text/javascript" src="/js/RSA/prng4.js"></script>
<script type="text/javascript" src="/js/RSA/rng.js"></script>
<script type="text/javascript" src="/js/login.js"></script>
</head>
<body>
	<div id="wrap">
		<header id="header">
			<h1><a href="/"><img src="/images/main/logo.png" alt="rshop" /></a></h1>
		</header><!--header_end-->
		<div id="container" class="login">
			<div class="login_cont">
				<form id="frmLogin" name="frmLogin">
					<fieldset>
						<h2><span class="cblue">RShop</span> 로그인</h2>
						<p class="sub_txt">로그인에 문제가 있을시에 개발자에게 문의주세요!</p>
						<div class="login_box">
							<input type="text" name="admin_id" value="superadmin" placeholder="ID" />
							<input type="password" name="admin_password_tmp" value="superadmin1!" placeholder="PASSWORD"/>
							<input type="hidden" name="admin_password" value=""/>
							<a href="javascript:void(0);" onclick="loginProc();" id="login"><img src="/images/login/btn_login.png" alt="로그인" /></a>
						</div>
					</fieldset>
				</form>
			</div>
		</div><!-- //container End -->
		<footer id="footer">
			<span>COPYRIGHT (C) 2108 rshop All Rights Reserved</span>
		</footer><!--footer_end-->
	</div><!--wrap_end-->
</body>
</html>