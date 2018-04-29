/**
 * 
 */
$(document).ready(function(){
	getCategoryList();
	$("li.subMenu").on("mouseover",function(e){
		if($(this).children("ul")){
			$(this).children("ul").show();
		}
	});
	$("li.subMenu").on("mouseout",function(e){
		if($(this).children("ul")){
			$(this).children("ul").hide();
		}
	});
	$("button.WishBtn").on("click",function(e){
		animateHeaderWishBox();
		stopClickEventBubbling(e);
	});
	/**
	 * 관심상품 금액 분류 버튼 클릭
	 */
	$("a.priceTab_li").on("click",function(e){
		//페이징 값 초기화
		$("input[name=pageAjaxData]").val(1);
		//현재 클릭 된 금액 범위 타입을 넘긴다.
		getMyInterestItemList($(this).attr("price"));
		stopClickEventBubbling(e);
	});
	
});

/**
 * 페이징 버튼클릭
 * @param type
 * @returns
 */
function pageingPlusMinus(plusOrMinus){
	//현재 페이징 값
	var page = $("input[name=pageAjaxData]").val();
	
	//최대 페이징 값
	var maxPage = $("input#maxPage").val();
	page = plusOrMinus == "plus" ? Number(page) + Number(1) : Number(page) - Number(1);
	
	//처음 페이지 또는 마지막 페이지 일 경우는 아무일도일어 나지 않는다.
	if(page < 1 || page > maxPage){
		return;
	}else{
		$("input[name=pageAjaxData]").val(page);
		
		//기본은 전체 선택되어있을경우 선택된 타입으로 getMyInterestItemList 함수를 호출한다.
		var type = "0";
		$("ul#myInterestItemType_ul > li").each(function(){
			if($(this).hasClass("on")){
				type = $(this).children("a").attr("price");
			}
		});
		getMyInterestItemList(type);
	}
	
}

/**
 * 관심 상품 불러오기
 * @param type
 * @returns
 */
function getMyInterestItemList(type){
	
	$("ul#myInterestItemType_ul > li").removeClass("on");
	$("ul#myInterestItemType_ul > li").eq(type).addClass("on");
	
	var pageAjaxData = $("input[name=pageAjaxData]").val();
	var pageSizeAjaxData = $("input[name=pageSizeAjaxData]").val();
	
	var param = {
		"page" : pageAjaxData
		,"pageSize" : pageSizeAjaxData
		,"type" : type
	}
	
	$.ajax({
		type : "POST"
		,url : "/buyer/getMyInterestItemListAjax.do"
		,data : param
		,dataType : "json"
		,async : true
		,success : function(result, status, xhr) {
			if(result.result == AJAX_RESULT_SUCCESS){
				$("ul#interestItemList_ul").empty();
				//관심상품이 있을경우.
				if(result.myInterestItemList.length > 0){
					
					var html = '';
					
					for(var i in result.myInterestItemList){
						html += '<li>';
						html += '	<button onclick="javascript:deleteIterestItem('+result.myInterestItemList[i].ITEM_SEQ+','+result.type+'); return false;">닫기</button>';
						html += '	<a href="#">';
						html += '		<img src="'+result.myInterestItemList[i].ITEM_REPRESENT_IMAGE+'" alt="상품이미지">';
						html += '	</a>';
						html += '	<p>'+result.myInterestItemList[i].ITEM_NAME+'</p>';
						html += '	<span>'+$.number(result.myInterestItemList[i].ITEM_LAST_PRICE)+'</span>';
						html += '</li>';
					}
					$("ul#interestItemList_ul").append(html);
					$("strong#nowPage_strong").text(result.page);
					$("span#totalPage_span").text(result.totalPage);
					$("input[name=pageAjaxData]").val(result.page);
					$("input#maxPage").val(result.totalPage);
					$("div#interestItemListEmpty_div").css("display","none");
					$("div#interestItemList_div").css("display","block");
					$("div#interestItemListPageing_div").css("display","block");
					
					
				}else{
					$("div#interestItemList_div").css("display","none");
					$("div#interestItemListEmpty_div").css("display","block");
					$("div#interestItemListPageing_div").css("display","none");
				}
			}else{
				if(result.data == "1"){
					alert("일반회원 전용입니다.");
				}else{
					alert("잘못된 요청 입니다");
				}
			}
		}
		,error : function(jqXHR, textStatus, errorThrown) {
			if (jqXHR.status == 300) {
				alert("로그인이 필요합니다.");
				location.href="/auth/login.do";
			}
		}
	});
	
}

/**
 * 관심상품 삭제하기
 * @param item_seq
 * @returns
 */
function deleteIterestItem(item_seq,type){
	
	var pageAjaxData = $("input[name=pageAjaxData]").val();
	var pageSizeAjaxData = $("input[name=pageSizeAjaxData]").val();
	var param = {
		"page" : pageAjaxData
		,"pageSize" : pageSizeAjaxData
		,"type" : type
		,"item_seq" : item_seq
	}
	
	$.ajax({
		type : "POST"
		,url : "/buyer/deleteMyInterestItemAjax.do"
		,data : param
		,dataType : "json"
		,async : true
		,success : function(result, status, xhr) {
			
			if(result.result == AJAX_RESULT_SUCCESS){
				$("ul#interestItemList_ul").empty();
				//관심상품이 있을경우.
				if(result.myInterestItemList.length > 0){
					
					var html = '';
					
					for(var i in result.myInterestItemList){
						html += '<li>';
						html += '	<button onclick="javascript:deleteIterestItem('+result.myInterestItemList[i].ITEM_SEQ+','+result.type+'); return false;">닫기</button>';
						html += '	<a href="#">';
						html += '		<img src="'+result.myInterestItemList[i].ITEM_REPRESENT_IMAGE+'" alt="상품이미지">';
						html += '	</a>';
						html += '	<p>'+result.myInterestItemList[i].ITEM_NAME+'</p>';
						html += '	<span>'+$.number(result.myInterestItemList[i].ITEM_LAST_PRICE)+'</span>';
						html += '</li>';
					}
					$("ul#interestItemList_ul").append(html);
					$("strong#nowPage_strong").text(result.page);
					$("span#totalPage_span").text(result.totalPage);
					$("input[name=pageAjaxData]").val(result.page);
					$("input#maxPage").val(result.totalPage);
					$("div#interestItemListEmpty_div").css("display","none");
					$("div#interestItemList_div").css("display","block");
					$("div#interestItemListPageing_div").css("display","block");
					
					
				}else{
					$("div#interestItemList_div").css("display","none");
					$("div#interestItemListEmpty_div").css("display","block");
					$("div#interestItemListPageing_div").css("display","none");
				}
				
			}else{
				if(result.data == "1"){
					alert("일반회원 전용입니다.");
				}else if(result.data == "6"){
					alert("이미 삭제된 관심상품 입니다.");
				}else{
					alert("잘못된 요청 입니다");
				}
			}
		}
		,error : function(jqXHR, textStatus, errorThrown) {
			if (jqXHR.status == 300) {
				alert("로그인이 필요합니다.");
				location.href="/auth/login.do";
			}
		}
	});
	
}

/**
 * 관심상품 추가하기
 * @param itemSeq
 * @returns
 */
function insertInterestItem(itemSeq,type){
	
	var pageAjaxData = $("input[name=pageAjaxData]").val();
	var pageSizeAjaxData = $("input[name=pageSizeAjaxData]").val();
	var param = {
		"page" : pageAjaxData
		,"pageSize" : pageSizeAjaxData
		,"type" : type
		,"item_seq" : itemSeq
	}
	
	$.ajax({
		type : "POST"
		,url : "/buyer/insertMyInterestItemAjax.do"
		,data : param
		,dataType : "json"
		,async : true
		,success : function(result, status, xhr) {
			
			if(result.result == AJAX_RESULT_SUCCESS){
				$("ul#interestItemList_ul").empty();
				//관심상품이 있을경우.
				if(result.myInterestItemList.length > 0){
					
					var html = '';
					
					for(var i in result.myInterestItemList){
						html += '<li>';
						html += '	<button onclick="javascript:deleteIterestItem('+result.myInterestItemList[i].ITEM_SEQ+','+result.type+'); return false;">닫기</button>';
						html += '	<a href="#">';
						html += '		<img src="'+result.myInterestItemList[i].ITEM_REPRESENT_IMAGE+'" alt="상품이미지">';
						html += '	</a>';
						html += '	<p>'+result.myInterestItemList[i].ITEM_NAME+'</p>';
						html += '	<span>'+$.number(result.myInterestItemList[i].ITEM_LAST_PRICE)+'</span>';
						html += '</li>';
					}
					$("ul#interestItemList_ul").append(html);
					$("strong#nowPage_strong").text(result.page);
					$("span#totalPage_span").text(result.totalPage);
					$("input[name=pageAjaxData]").val(result.page);
					$("input#maxPage").val(result.totalPage);
					$("div#interestItemListEmpty_div").css("display","none");
					$("div#interestItemList_div").css("display","block");
					$("div#interestItemListPageing_div").css("display","block");
					
					
				}else{
					$("div#interestItemList_div").css("display","none");
					$("div#interestItemListEmpty_div").css("display","block");
					$("div#interestItemListPageing_div").css("display","none");
				}
			}else{
				if(result.data == "1"){
					alert("일반회원 전용입니다.");
				}else if(result.data == "6"){
					alert("이미 추가된 관심상품 입니다.");
				}else if(result.data == "7"){
					alert("관심상품 추가중 오류가 발생하였습니다. 관리자에게 문의하세요.");
				}else{
					alert("잘못된 요청 입니다");
				}
			}
		}
		,error : function(jqXHR, textStatus, errorThrown) {
			if (jqXHR.status == 300) {
				alert("로그인이 필요합니다.");
				location.href="/auth/login.do";
			}
		}
	});
}

