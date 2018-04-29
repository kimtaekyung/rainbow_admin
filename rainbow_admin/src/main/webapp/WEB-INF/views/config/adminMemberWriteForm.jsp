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
<script type="text/javascript" src="/js/config/adminMemberWriteForm.js"></script>

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
			
				<!-- content_inner[S] -->
				<div class="content_inner sub_content">
					<h3 class="sub_tit">관리자 계정생성</h3>
					
					<form>
						<input type="text" name="admin_seq" value="${resultMap.adminMember.ADMIN_SEQ }"/>
					</form>
					
					<!-- 쓰기 영역 -->
					<div class="board_write">
						<fieldset>
							<legend>글쓰기</legend>
							<table class="ta_write01">
								<colgroup>
									<col width="12%">
									<col width="auto">
									<col width="12%">
									<col width="35%">
								</colgroup>	
								<tbody>
									<tr>
										<th>관리자ID</th>
										<td><input type="text" name="admin_id" class="wh30" value="${resultMap.adminMember.ADMIN_ID }" ${not empty resultMap.adminMember ? 'readonly':'' }/></td>
										<th>관리자PW</th>
										<td><input type="password" name="admin_password" class="wh30" value=""/></td>
									</tr>
									<tr>
										<th>관리자명</th>
										<td><input type="text" name="admin_name" value="${resultMap.adminMember.ADMIN_NAME }"/></td>
										<th>관리자HP</th>
										<td>
											<input type="hidden" name="admin_hp" value="${resultMap.adminMember.ADMIN_HP }"/>
											<c:set var="arrAdminHp" value="${fn:split(resultMap.adminMember.ADMIN_HP, '-') }"/>
											<select name="hp1"> 
												<option value="010" ${fn:length(arrAdminHp) eq 3 and arrAdminHp[0] eq '010'? 'selected':''}>010</option> 
												<option value="011" ${fn:length(arrAdminHp) eq 3 and arrAdminHp[0] eq '011'? 'selected':''}>011</option> 
												<option value="016" ${fn:length(arrAdminHp) eq 3 and arrAdminHp[0] eq '016'? 'selected':''}>016</option> 
												<option value="017" ${fn:length(arrAdminHp) eq 3 and arrAdminHp[0] eq '017'? 'selected':''}>017</option> 
												<option value="018" ${fn:length(arrAdminHp) eq 3 and arrAdminHp[0] eq '018'? 'selected':''}>018</option> 
												<option value="019" ${fn:length(arrAdminHp) eq 3 and arrAdminHp[0] eq '019'? 'selected':''}>019</option> 
											</select>
											<span><font face="fixedsys">-</font></span>
										    <input type="text" class="numberData wh20" maxlength="4" name="hp2" value="${fn:length(arrAdminHp) eq 3 ? arrAdminHp[1]:'' }">
										    <span><font face="fixedsys">-</font></span>
										    <input type="text" class="numberData wh20" maxlength="4" name="hp3" value="${fn:length(arrAdminHp) eq 3 ? arrAdminHp[2]:'' }">
										</td>
									</tr>
									<tr >
										<th>관리자이메일</th>
										<td>
											<input type="hidden" name="admin_email" class="wh20" value="${resultMap.adminMember.ADMIN_EMAIL }"/>
											<c:set var="arrAdminEmail" value="${fn:split(resultMap.adminMember.ADMIN_EMAIL, '@') }"/>
											<input type="text" name="email1" class="wh20" value="${fn:length(arrAdminEmail) eq 2 ? arrAdminEmail[0]:'' }"/> @
											<input type="text" name="email2" class="wh20" value="${fn:length(arrAdminEmail) eq 2 ? arrAdminEmail[1]:'' }" maxlength="40">
											<select name="mail3" onchange="setMailForm(this);">
												<option value="">직접입력</option>
												<option value="naver.com">네이버</option>
												<option value="gmail.com">구글</option>
												<option value="hanmail.net">한메일</option>
												<option value="hotmail.com">핫메일</option>
												<option value="chollian.net">천리안</option>
												<option value="hitel.net">하이텔</option>
												<option value="dreamwiz.com">드림위즈</option>
												<option value="yahoo.co.kr">야후</option>
												<option value="lycos.co.kr">라이코스</option>
												<option value="netian.com">네띠앙</option>
												<option value="korea.com">코리아닷컴</option>
												<option value="orgio.net">오르지오</option>
												<option value="empal.com">엠파스(엠팔)</option>
												<option value="hanafos.com">하나포스</option>
											</select>
										</td>
										<th>관리자상태</th>
										<td>
											<select name="admin_state" class="wh15">
												<option value="1" ${resultMap.adminMember.ADMIN_STATE eq '1' ? 'selected':'' }>정상</option>
												<option value="2" ${resultMap.adminMember.ADMIN_STATE eq '2' ? 'selected':'' }>정지</option>
												<option value="3" ${resultMap.adminMember.ADMIN_STATE eq '3' ? 'selected':'' }>삭제</option>
											</select>
										</td>
									</tr>
									<tr>
										<th>메뉴권한</th>
										<td colspan="3">
											<table class="ta_list01" style="width:97%;">
												<colgroup>
													<col width="5%">
													<col width="15%">
													<col width="15%">
													<col width="auto">
												</colgroup>
												<thead>
													<tr>
														<th><input type="checkbox" id="chk_menu_all" value="" children_name="chk_menu_seq" onchange="checkBoxAllCheck(this)"/></th>
														<th colspan="2">메뉴명</th>
														<th>메뉴링크</th>
													</tr>
												</thead>
												<tbody>
												
											<c:forEach var="data" items="${resultMap.authList }">
												<c:if test="${data.MENU_DEPTH eq 1 }">
													<tr>
														<td><input type="checkbox" name="chk_menu_seq" value="${data.MENU_SEQ }" ${data.IS_MENU_AUTH ne 0 ? 'checked':'' } onchange="checkBoxOneCheck(this,'chk_menu_all');"/></td>
														<td>${data.MENU_NAME }</td>
														<td></td>
														<td>${data.MENU_LINK }</td>
													</tr>
												<c:forEach var="data2" items="${resultMap.authList }">
													<c:if test="${data2.MENU_DEPTH eq 2 and data.MENU_SEQ eq data2.MENU_PARENT }">
														<tr>
															<td><input type="checkbox" name="chk_menu_seq" value="${data2.MENU_SEQ }" ${data2.IS_MENU_AUTH ne 0 ? 'checked':'' } onchange="checkBoxOneCheck(this,'chk_menu_all');"/></td>
															<td>└</td>
															<td>${data2.MENU_NAME }</td>
															<td>${data2.MENU_LINK }</td>
														</tr>
													</c:if>
												</c:forEach>
												</c:if>
											</c:forEach>
													
												</tbody>
											</table>
										</td>
									</tr>
								</tbody>
							</table>
							<div class="board_in_bt ta_right">
							<c:if test="${empty resultMap.adminMember }">
								<a href="javascript:void(0);" class="btn-middle" onclick="insertAdminMember();return false;">등록</a>
							</c:if>
							<c:if test="${not empty resultMap.adminMember }">
								<a href="javascript:void(0);" class="btn-middle" onclick="updateAdminMember();return false;">저장</a>
							</c:if>
								<a href="/config/adminMemberList.do" class="btn-middle-white">목록</a>
							</div>

						</fieldset>
					</div>
					
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