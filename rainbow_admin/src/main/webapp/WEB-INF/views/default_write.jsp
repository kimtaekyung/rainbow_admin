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
					<h3 class="sub_tit">화면 타이틀</h3>
					
					<!-- 쓰기 영역 -->
					<div class="board_write">
						<fieldset>
							<legend>글쓰기</legend>
							<table class="ta_write01">
								<colgroup>
									<col width="12%">
									<col width="auto">
									<col width="12%">
									<col width="15%">
								</colgroup>	
								<tbody>
									<tr>
										<th>라벨1</th>
										<td><input type="text" name="" class="wh20 ta_right" value=""/></td>
										<th>라벨2</th>
										<td><input type="text" name="" class="wh20 ta_right" value=""/></td>
									</tr>
									<tr>
										<th>라벨3</th>
										<td><p>미인증</p></td>
										<th>라벨4</th>
										<td>내용</td>
									</tr>
									<tr >
										<th>라벨5</th>
										<td>
											<input type="text" name="" class="wh20 ta_right" value=""/>
											<a href="javascript:void(0);" class="btn_check" id="nick_name_check">중복확인</a>
										</td>
										<th>라벨6</th>
										<td>내용</td>
									</tr>
									<tr>
										<th>이미지</th>
										<td colspan="3">
											<dl class="member_veiw_photo">
												<dt>
													<img src="/images/sub/noimg.png" />
												</dt>
												<dd>
													<span class="guide_text">* 사이즈 150x150이상, 최대 용량 1MB입니다.</span><br />
													<span class="guide_text">* 선정적. 사회적으로 이슈가되는 이미지 등록 금지.</span>
													<p class="btn_del_small"><a href="javascript:void(0);" id="del_img">X 삭제</a></p>
												</dd>
											</dl>
										</td>
									</tr>
									<tr>
										<th>보안정보</th>
										<td colspan="3">
											<ul class="safety_box">
												<li>
													<strong>2차 비밀번호</strong> : <span class="text_black">설정</span>
												</li>
												<li>
													<strong>지정IP서비스</strong> : <span class="text_black">1개 설정</span>
												</li>
											</ul>
										</td>
									</tr>
									<tr>
										<th>콤보박스</th>
										<td>
											<select name="">
												<option value="">-선택-</option>
											</select>
										</td>
										<th>라벨</th>
										<td>내용</td>
									</tr>
									<tr>
										<th>라벨</th>
										<td><input type="text" id="" name="" class="ta_left" value=""/></td>
										<th>라벨</th>
										<td><input type="text" id="" name="" class="ta_right" value=""/></td>
									</tr>
								</tbody>
							</table>
							<div class="board_in_bt ta_right">
								<a href="#" class="btn-middle">확인</a>
								<a href="#" class="btn-middle">삭제</a>
								<a href="#" class="btn-middle-white">목록</a>
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