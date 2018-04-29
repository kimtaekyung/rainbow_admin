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
<script type="text/javascript" src="/js/config/adminMenuList.js"></script>

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
					<span class="loc_active">메뉴관리</span>
				</div>
				
				<!-- content_inner[S] -->
				<div class="content_inner sub_content" style="width: 80%;">
					<h3 class="sub_tit">메뉴설정</h3>
					
					<!-- 검색조건 영역 -->
					<form name="schFrm" method="get">
					
					<div class="board_search">
						<span>
							<label for="">메뉴명</label><input type="text" name="menu_name" value="${resultMap.menu_name }">
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
								<strong> ${fn:length(resultMap.menuList) }건</strong> 이 검색 되었습니다.</p>
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
									<col width="10%">
									<col width="10%">
									<col width="auto">
									<col width="5%">
									<col width="5%">
									<col width="10%">
									<col width="20%">
								</colgroup>
								<thead>
									<tr>
										<th colspan="2">메뉴명</th>
										<th>메뉴링크</th>
										<th>레벨</th>
										<th>순번</th>
										<th>사용여부</th>
										<th>비고</th>
									</tr>
								</thead>
								<tbody id="menuTbody">
								
							<c:forEach var="data" items="${resultMap.menuList }">
								<c:if test="${data.MENU_DEPTH eq 1 }">		
									<tr class="depth1">
										<td>
											<input type="hidden" name="menu_seq" value="${data.MENU_SEQ }"/>
											<input type="hidden" name="menu_parent" value="${data.MENU_PARENT }"/>
											<input type="text" name="menu_name" value="${data.MENU_NAME }"/>
										</td>
										<td></td>
										<td class="subject"><input type="text" name="menu_link" value="${data.MENU_LINK }"/></td>
										<td><input type="text" name="menu_depth" value="${data.MENU_DEPTH }" style="width:25px;"/></td>
										<td><input type="text" name="menu_order" value="${data.MENU_ORDER }" style="width:25px;"/></td>
										<td>
											<select name="menu_use_yn">
												<option value="1" ${data.MENU_USE_YN eq '1' ? 'selected':'' }>사용</option>
												<option value="0" ${data.MENU_USE_YN eq '0' ? 'selected':'' }>미사용</option>
											</select>
										</td>
										<td><a href="javascript:void(0);" class="btn-middle" id="letter_write" onclick="addChileMenu(this, '${data.MENU_SEQ}');">하위메뉴추가</a></td>
									</tr>
								<c:forEach var="data2" items="${resultMap.menuList }">
									<c:if test="${data2.MENU_DEPTH eq 2 and data.MENU_SEQ eq data2.MENU_PARENT }">
										<tr class="depth${data.MENU_SEQ }_depth2">
											<td>└</td>
											<td>
												<input type="hidden" name="menu_seq" value="${data2.MENU_SEQ }"/>
												<input type="hidden" name="menu_parent" value="${data2.MENU_PARENT }"/>
												<input type="text" name="menu_name" value="${data2.MENU_NAME }"/>
											</td>
											<td class="subject"><input type="text" name="menu_link" value="${data2.MENU_LINK }"/></td>
											<td><input type="text" name="menu_depth" value="${data2.MENU_DEPTH }" style="width:25px;"/></td>
											<td><input type="text" name="menu_order" value="${data2.MENU_ORDER }" style="width:25px;"/></td>
											<td>
												<select name="menu_use_yn">
													<option value="1" ${data2.MENU_USE_YN eq '1' ? 'selected':'' }>사용</option>
													<option value="0" ${data2.MENU_USE_YN eq '0' ? 'selected':'' }>미사용</option>
												</select>
											</td>
											<td></td>
										</tr>
									</c:if>
								</c:forEach>
								</c:if>
							</c:forEach>
								
								</tbody>
							</table>
							
							<div class="board_page clearfix">
								<div class="page_move">
									<a href="javascript:void(0);" class="btn-middle" onclick="addMenu(1);return false;">메뉴추가</a>
									<a href="javascript:void(0);" class="btn-middle" onclick="saveAdminMenu();return false;">저장</a>
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