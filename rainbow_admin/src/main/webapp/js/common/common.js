$(document).ready(function(){
	//커밋 테스트
	//클릭이벤트 잡아서 레이어 감추기
	$(document).on("click",function(e){
		//.hideLayerGroup라는 class를 가진이외의 영역에서 클릭이벤트가 일어났을때
		var container = $(".hideLayerGroup");
		if (!container.is(e.target) && container.has(e.target).length === 0){
			//container가 아닌곳에서 클릭이벤트가 일어낫을 경우만 현재 if문에 들어온다
			$(".hideLayerGroup").css("display","none");
		}
	});
	
	JBOX_MODAL = new jBox("Modal");
	JBOX_IMAGE = new jBox('Image',{
		maxWidth:700
		,maxHeight:500
		,imageCounter : true
		//,closeOnMouseleave : true
	});//<a href="/image1_large.jpg" title="My title 1" data-jbox-image="gallery1"><img src="/image1_small.jpg" alt=""></a> << 사용방법
	
	$(".datepicker").datepicker();
	$("input.numberData").numeric();
	
	/**
	 * 파일업로드
	 */
	$(".uploadfile").on("change", function() {
		var objViewId = $(this).attr("view");
		var objPathId = $(this).attr("path");
		var viewTarget = $("#" + objViewId);
		var pathTarget = $("#" + objPathId);
		var val = $(this).val();
		var thisDom = $(this)[0];
		$(pathTarget).text(val);
		
		if (thisDom.files && thisDom.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				console.log(e.target);
				$(viewTarget).attr('src', e.target.result);
				$(viewTarget).css("width","80%");
			}
		}
		reader.readAsDataURL(thisDom.files[0]);
		return false;
	});
});




/**
 * Datepicket 기본설정 
 */
$.datepicker.setDefaults({
    prevText: '이전달',		// prev 아이콘의 툴팁.
    nextText: '다음달',		// next 아이콘의 툴팁.
    currentText: "오늘",	// 오늘 날짜로 이동하는 버튼 패널
    closeText: '닫기',		// 닫기 버튼 패널
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    weekHeader: "주",
    firstDay : 0,
    showMonthAfterYear: true,
    yearSuffix: '년',
    dateFormat:'yy-mm-dd',		// 텍스트 필드에 입력되는 날짜 형식.
    showButtonPanel: true,		// 캘린더 하단에 버튼 패널을 표시한다.
    changeYear: true, 			// 년을 바꿀 수 있는 셀렉트 박스를 표시한다.
});

/**
 * 이벤트 버블링 제거
 * @param event
 * @returns
 */
function stopClickEventBubbling(event){
   if (event && event.preventDefault) {
      event.preventDefault();
      event.stopPropagation();
    }
    else {
       event = event || window.event;
       event.cancelBubble = true;
       event.returnValue = false;
    }
}

/**
 * 주소검색 팝업
 * @param cate
 * @returns
 */
function goAddrPopup(cate){
	// 주소검색을 수행할 팝업 페이지를 호출합니다.
	// 호출된 페이지(jusopopup.jsp)에서 실제 주소검색URL(http://www.juso.go.kr/addrlink/addrLinkUrl.do)를 호출하게 됩니다.
	var w 		= 570;//윈도우 팝업 넓이
	var h 		= 420;//윈오두 팝업 높이
	var left 	= screen.width/2 - w/2;
  	var top 	= screen.height/2 - h/2;
	var pop 	= window.open("/common/addrSearchPopup.do?cate=" + cate,"pop","width="+w+",height="+h+",left="+left+",top="+top+", scrollbars=yes, resizable=yes, "); 
	// 모바일 웹인 경우, 호출된 페이지(jusopopup.jsp)에서 실제 주소검색URL(http://www.juso.go.kr/addrlink/addrMobileLinkUrl.do)를 호출하게 됩니다.
  	//var pop = window.open("/popup/jusoPopup.jsp","pop","scrollbars=yes, resizable=yes"); 
}

/**
 * 정규식 검사
 * @param reg
 * @param value
 * @returns
 */
function getRegExpResult(reg,value){
	var result = reg.exec(value);  
    if(!result){
    	return false;
    }else{
    	return true;
    }
}

/**
 * 날짜 시작 종료 검사
 * @param sDate
 * @param eDate
 * @returns
 */
function chkDateFromTo(sDate, eDate){
	sDate = sDate.replace(/-/gi, '');
	eDate = eDate.replace(/-/gi, '');
	
	if(Number(sDate) > Number(eDate)){
		return false;
	}else{
		return true;
	}
}

/**
 * 
 * @param obj
 * @returns
 */
function isNull(obj){
	if(obj == '' || obj == null || obj == undefined || obj == NaN){ 
		return true;
	}else{
		return false;
	}
}

/**
 * 로컬스토리지 저장
 * @param name
 * @param obj
 * @returns
 */
function setLocalStorage(name,obj){
	localStorage.setItem(name, obj);
}

/**
 * 로컬 스토리지 삭제
 * @param name
 * @returns
 */
function removeLocalStorage(name){
	localStorage.removeItem(name);
}

/**
 * 로컬스토리지에서 특정 객체 가져오기
 * @param name
 * @returns
 */
function getItemLocalStorage(name){
	return localStorage.getItem(name);
}


/**
 * 체크 박스 전체 체크
 * all check 전체 체크
 * ex)<input type="checkbox" children_name="childrend name" onchange="checkBoxAllCheck(this)">
 * children_name = 하위 체크 박스의 name 어트리뷰트 값
 * @param obj
 * @returns
 */
function checkBoxAllCheck(obj){
	var box_name = $(obj).attr("children_name");
	
	if($(obj).is(":checked")){
		$("[name="+box_name+"]").prop("checked",true);
	}else{
		$("[name="+box_name+"]").prop("checked",false);
	}
}

/**
 * 하위 체크 박스 
 * 전체 클릭 후 하나의 객체 체크 해제시 전체 체크 박스 체크 해제와 
 * 객체를 하나씩 체크하여 전체 체크시 전체 체크 박스 자동 체크
 * ex)<input type="checkbox" name="체크박스 이름 = 상위 children_name 값" onchange="javascript:checkBoxOneCheck(this,전체 체크박스 id);"/>
 * @param obj
 * @param allCheckId
 * @returns
 */
function checkBoxOneCheck(obj,allCheckId){
	var box_name = $(obj).attr("name");
	var check_box_objs = $("[name="+box_name+"]");
	var checkBoxLength = $(check_box_objs).length;
	
	if(!$(obj).is(":checked")){
		$("#"+allCheckId).prop("checked",false);
	}else{
		if(checkBoxLength == $("[name="+box_name+"]:checked").length){
			$("#"+allCheckId).prop("checked",true);
		}
	}
}

/**
 * 입력받은 금액을 한글로 변환한다.
 * @param num
 * @returns
 */
function viewKorean(num) {
	num = num.replace(/,/gi, '');
	var hanA = new Array("","일","이","삼","사","오","육","칠","팔","구","십");
	var danA = new Array("","십","백","천","","십","백","천","","십","백","천","","십","백","천");
	var result = ""; 
	for(i=0; i<num.length; i++){
		str = ""; 
		han = hanA[num.charAt(num.length-(i+1))];
		if(han != "") str += han+danA[i];
		if(i == 4) str += "만";
		if(i == 8) str += "억";
		if(i == 12) str += "조";
		result = str + result; 
	} 
	
	if(num != 0) result = result + "원"; 
	return result; 
}

/**
 * 검색조건 빠른계산 날짜계산
 * @param type
 * @returns
 */
function getQuickDate(type){
	var sDate = new Date();
	
	if(type == "week"){
		sDate.setDate(sDate.getDate() - 7);
	}else if(type == "month"){
		sDate.setMonth(sDate.getMonth() - 1);
		sDate.setDate(sDate.getDate() + 1);
	}else if(type == "threeMonth"){
		sDate.setMonth(sDate.getMonth() - 3);
		sDate.setDate(sDate.getDate() + 1);
	}else if(type == "sixMonth"){
		sDate.setMonth(sDate.getMonth() - 6);
		sDate.setDate(sDate.getDate() + 1);
	}else if(type == "year"){
		sDate.setYear(sDate.getFullYear() - 1);
		sDate.setDate(sDate.getDate() + 1);
	}
	
	var sYear = sDate.getFullYear();
	var sMonth = sDate.getMonth()+1;
	var sDay = sDate.getDate();
	
	return sYear+"-"+(sMonth<10?"0"+sMonth:sMonth)+"-"+(sDay<10?"0"+sDay:sDay);
}

/**
 * 기본 알럿 창
 * @param content 알림 내용
 * @param title 알림 제목
 * @param width 알림 레이어 넓이
 * @returns
 */
function defaultAlert(content,title,callback,width){
	JBOX_MODAL.setTitle(isNull(title) ? '알림' : title);
	JBOX_MODAL.setContent(isNull(content) ? '' : content);
	JBOX_MODAL.open({
		width : isNull(width) ? 400 : width
		,onClose : function(){
			if(typeof callback === "function")callback();
		} 
	});
}

/**
 * 기본 공지 
 * @param content 내용
 * @param color 색상
 * @param align 정렬
 * @param autoClose 사라지는 시간
 * @param minWidth 레이어 최소 넓이
 * @param attributes 속성 추가생성 방향및 레이어 위치
 * @param offset 기준 px 조정값
 * @returns
 */
function defaultNotice(content,color,align,autoClose,minWidth,attributes,offset){
	new jBox('Notice', {
	    content: isNull(content) ? '내용' : content
	    ,color: isNull(color) ? 'red' : color
	    ,align : isNull(align) ? 'right': align
	    ,autoClose : isNull(autoClose) ? 3000 : timer
	    ,minWidth : isNull(minWidth) ? 300 : minWidth
		,attributes:isNull(attributes) ? {x: 'right', y: 'bottom'} : attributes//
		,offset : isNull(offset) ? {x : 15 , y : 15} : offset
	});
}
/**
 * 기본 컨펌 함수
 * @param content 질의내용
 * @param confirmFunc 확인시 콜백
 * @param cancelFunc 취소시 콜백
 * @param data 콜백 데이터
 * @returns
 */
function defaultConfirm(content,confirmFunc,cancelFunc,data){
	new jBox('Confirm', {
		content: isNull(content) ? 'Do you want to continue?' : content
	    ,confirmButton: '확인'
	    ,cancelButton: '취소'
	    ,confirm: function(){
	    	if(typeof confirmFunc === "function"){
	    		if(!isNull(data)){
	    			confirmFunc(data);
	    		}else{
	    			confirmFunc();
	    		}
	    	}
	    }
	    ,cancel: function(){
	    	if(typeof cancelFunc === "function"){
	    		if(!isNull(data)){
	    			cancelFunc(data);
	    		}else{
	    			cancelFunc();
	    		}
	    	}
	    }

	}).open();
}

function uploadImageNone(obj,width,src){
	$(obj).css("width",width);
	$(obj).attr("src",src);
}
