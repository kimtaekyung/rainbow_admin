<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="ko">
<head>
<title>RShop</title>
<meta charset="utf-8">
<meta http-equiv="Content-Script-Type" content="text/javascript">
<meta http-equiv="Content-Style-Type" content="text/css">
<meta http-equiv="X-UA-Compatible" content="IE=edge">

<%@include file="/WEB-INF/views/common/include.jsp"%>

</head>
<body>

	<!-- wrap[S] -->
	<div id="wrap">
	
		<!-- 헤더[S] -->
		<%@include file="/WEB-INF/views/common/header.jsp"%>
		<!-- 헤더[E] -->
		
		<!-- container[S] -->
		<div id="container" class="sub">
		
			<!-- Left Menu -->
			<nav class="snb">
				<ul>
					<li><a href="/config/adminMenuList.do">메뉴관리</a></li>
					<li><a href="/config/adminMemberList.do">관리자관리</a></li>
				</ul>
			</nav>
		
			<!-- 섹션 content[S] -->
			<section class="content">
			
				<!-- 우측 네비 영역 //-->
				<div class="loc">
					<a href="/main.do" class="home">Home</a> &gt;
					<span class="gnb_active">환경설정</span> &gt;
					<span class="loc_active">관리자관리</span>
				</div>
				
				<!-- content_inner[S] -->
				<div class="content_inner sub_content">
					<h3 class="sub_tit">관리자관리</h3>
					
					<!-- 검색조건 영역 -->
					<form name="schFrm" id="schFrm" method="get">
					
					<div class="board_search">
						<span>
							<label for="">관리자명</label><input type="text" name="admin_name" value="${resultMap.admin_name }">
							<input type="button" value="검색" class="btn-primary" onclick="$('form[name=schFrm]').submit();">
						</span>
					</div>
					
					</form>
					
					<!-- 리스트 영역 -->
					<fieldset>
						<legend>게시판</legend>
						<div class="board_list">
							<div class="list_table_top" >
								<p class="f_left">
								<strong> ${fn:length(resultMap.adminMemberList) }건</strong> 이 검색 되었습니다.</p>
								<div class="settings_select" >									
									<select name="list_rows" id="list_rows">
										<option value="10">10줄씩 보기</option>
										<option value="25">25줄씩 보기</option>
										<option value="50">50줄씩 보기</option>
									</select>
								</div>
								
							</div>
							<table summary="번호 제목 답변여부 작성자 등록일 리스트" class="ta_list01">
								<caption>게시판 리스트</caption>
								<colgroup>
									<col width="5%">
									<col width="15%">
									<col width="15%">
									<col width="10%">
									<col width="10%">
									<col width="20%">
									<col width="25%">
								</colgroup>
								<thead>
									<tr>
										<th>번호</th>
										<th>관리자ID</th>
										<th>관리자명</th>
										<th>관리자상태</th>
										<th>로그인여부</th>
										<th>로그인IP</th>
										<th>등록일자</th>
									</tr>
								</thead>
								<tbody>
								
								<c:forEach var="data" items="${resultMap.adminMemberList }">
									<tr onclick="location.href='/config/adminMemberWriteForm.do?admin_seq=${data.ADMIN_SEQ}'">
										<td>${data.ADMIN_SEQ }</td>
										<td>${data.ADMIN_ID }</td>
										<td>${data.ADMIN_NAME }</td>
										<td>${data.ADMIN_STATE_NAME }</td>
										<td>${data.ADMIN_IS_LOGIN eq '0' ? '로그아웃':'로그인' }</td>
										<td>${data.ADMIN_LOGIN_IP }</td>
										<td>${data.ADMIN_REG_DTTM }</td>
									</tr>
								
								</c:forEach>
								
								</tbody>
							</table>
							
							<div class="board_page clearfix">
								${resultMap.paging }
							</div>
							
							<div class="board_page clearfix">
								<div class="page_move">
									<a href="/config/adminMemberWriteForm.do" class="btn-middle">계정생성</a>
								</div>
							</div>
							
						</div>
					</fieldset>
					
				</div>
				<!-- content_inner[E] -->
				
			</section>
			<!-- 섹션 content[E] -->
		
		</div>
		<!-- container[E] -->
		
		<!-- footer[S] -->
		<%@ include file="/WEB-INF/views/common/footer.jsp" %>
		<!-- footer[E] -->
		
	</div>
	<!-- wrap[E] -->

</body>
</html>