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
		
			<!-- 섹션 content[S] -->
			<section class="content">
			
				<!-- content_inner[S] -->
				<div class="content_inner sub_content" style="width:90%;">
					<h3 class="sub_tit">관리자 메인</h3>
					
					<!-- 검색조건 영역 -->
					<div class="board_search">
						<span>
							<label for="">콤보검색조건</label>
							<select name="serach_cate" id="serach_cate" class="search_select">
								<option value="">-선택-</option>
								<option value="1">조건1</option>
								<option value="2">조건2</option>
							</select>
							<input type="text" maxlength="50" class="search_text" id="serach_key" name="serach_key" value="" >
						</span>
						<span>
							<label for="">날짜검색조건</label><input type="text" class="date_pic" id="start_dt" name="start_dt" value=""> ~ 
							<input type="text" class="date_pic" id="end_dt" name="end_dt" value=""> 
							<input type="button" value="검색" class="btn-primary" >
						</span>
					</div>
					
					<!-- 리스트 영역 -->
					<fieldset>
						<legend>게시판</legend>
						<div class="board_list">
							<div class="list_table_top" >
								<p class="f_left">
								<strong> 10건</strong> 이 검색 되었습니다.</p>
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
									<col width="auto">
									<col width="10%">
									<col width="5%">
									<col width="15%">
								</colgroup>
								<thead>
									<tr>
										<th>컬럼1</th>
										<th>컬럼2</th>
										<th>컬럼3</th>
										<th>컬럼4</th>
										<th>컬럼5</th>
										<th>컬럼6</th>
										<th>컬럼7</th>
										<th>컬럼8</th>
									</tr>
								</thead>
								<tbody>
										<tr>
											<%-- <td><fmt:formatNumber value="${list.ROWNUM }" pattern="#" /></td> --%>
											<td>TD1</td>
											<td>TD2</td>
											<td>TD3</td>
											<td>TD4</td>
											<td class="subject">TD5</td>										
											<td>TD6</td>
											<td>TD7</td>
											<td>TD8</td>
										</tr>
								</tbody>
							</table>
							<div class="board_page clearfix">
								${paging}
								<div class="page_move">
									<a href="javascript:void(0);" id="letter_write_btn" class="btn-middle" id="letter_write" >버튼</a>
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





