<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

		<header id="header">
			<section class="header_01 clearfix">
				<h1 class="logo"><a href="#"><img src="/images/main/logo.png" alt="RSHOP" /></a></h1>
				
				<!-- 알람설정 영역 -->
				<div>
					<div id="ladderMaxWinCountRcntRecord">
					  <ul>
					  </ul>
					</div>
				</div>
				
				<ul class="top_menu clearfix">
					<!-- <li class="home"><a href="#" target="_blank">홈페이지바로가기</a></li> -->
					<li class="name"><a href="#"><strong class="cSblue">${sessionScope.admin_member.ADMIN_NAME }님 안녕하세요</strong></a></li>
					<li class="logout"><a href="/auth/adminLogout.do" >로그아웃</a></li>
				</ul>
			</section>
			<nav id="gnb">
				<h2 class="adm_main"><a href="/main.do">관리메인</a></h2>
				<ul class="gnb_list">
					<li><a href="/config/adminMenuList.do">환경설정</a></li>
					<li><a href="#">카테고리2</a></li>
					<li><a href="#">카테고리3</a></li>
					<li><a href="#">카테고리4</a></li>
					<li><a href="#">카테고리5</a></li>
					<li><a href="#">카테고리6</a></li>
					<li><a href="#">카테고리7</a></li>
					<li><a href="#">카테고리8</a></li>
				</ul>
			</nav>
			<div id="mp3_player1" style="display: none;"></div>
			<div id="mp3_player2" style="display: none;"></div>
			<div id="mp3_player3" style="display: none;"></div>
			<div id="mp3_player4" style="display: none;"></div>
			<div id="mp3_player5" style="display: none;"></div>
			<div id="mp3_player6" style="display: none;"></div>
			<div id="mp3_player7" style="display: none;"></div>
		</header>
