/**
 * 메일 선택 변경시
 * @param obj
 * @returns
 */
function setMailForm(obj){
	if(isNull($(obj).val())){
		$("input[name=email2]").val("");
		$("input[name=email2]").focus();
	}else{
		$("input[name=email2]").val($(obj).val());
	}
}

/**
 * 메뉴저장정보 생성
 * @returns
 */
function createAuthData(){
	var authList = new Array();
	
	$("input[name=chk_menu_seq]:checked").each(function(){
		authList.push(this.value);
	});
	
	return authList;
}

/**
 * 관리자 저장정보 validation check
 * @returns
 */
function checkAdminMemberInfoValid(){
	var mode = "C";
	if(!isNull($("input[name=admin_seq]").val())){
		mode = "U";
	}
	
	if(mode == "C"){
		if(isNull($("input[name=admin_id]").val())){
			defaultAlert("관리자ID를 입력해 주세요.");
			return false;
		}
		
		if(!getRegExpResult(ID_REGULAR_EXPRESSTION, $("input[name=admin_id]").val())){
			defaultAlert("관리자ID가 유효하지 않습니다.");
			return false;
		}
		
		if(isNull($("input[name=admin_password]").val())){
			defaultAlert("관리자PW를 입력해 주세요.");
			return false;
		}
		
		if(!getRegExpResult(PW_REGULAR_EXPRESSTION, $("input[name=admin_password]").val())){
			defaultAlert("관리자PW가 유효하지 않습니다.");
			return false;
		}
	}
	
	if(isNull($("input[name=admin_name]").val())){
		defaultAlert("관리자명을 입력해 주세요.");
		return false;
	}
	
	if(!getRegExpResult(NAME_REGULAR_EXPRESSTION, $("input[name=admin_name]").val())){
		defaultAlert("관리자명이 유효하지 않습니다.");
		return false;
	}
	
	if(mode == "U"){
		if(!isNull($("input[name=admin_password]").val())){
			if(!getRegExpResult(PW_REGULAR_EXPRESSTION, $("input[name=admin_password]").val())){
				defaultAlert("관리자PW가 유효하지 않습니다.");
				return false;
			}
		}
	}
	
	if(isNull($("input[name=hp2]").val())){
		defaultAlert("관리자HP 가운데 번호를 입력해 주세요.");
		return false;
	}
	if(isNull($("input[name=hp3]").val())){
		defaultAlert("관리자HP 끝 번호 4자리를 입력해 주세요.");
		return false;
	}
	
	//핸드폰번호 합치기
	$("input[name=admin_hp]").val($("select[name=hp1]").val()+"-"+$("input[name=hp2]").val()+"-"+$("input[name=hp3]").val());
	
	if(isNull($("input[name=email1]").val())){
		defaultAlert("관리자이메일을 입력해 주세요.");
		return false;
	}
	if(isNull($("input[name=email2]").val())){
		defaultAlert("관리자이메일을 입력해 주세요.");
		return false;
	}
	
	//이메일 합치기
	$("input[name=admin_email]").val($("input[name=email1]").val()+"@"+$("input[name=email2]").val());
	
	if($("input[name=chk_menu_seq]:checked").length == 0){
		defaultAlert("메뉴권한을 1개이상 선택해 주세요.");
		return false;
	}
	
	return true;
}

/**
 * 관리자 등록
 * @returns
 */
function insertAdminMember(){
	alert("개발중입니다.");
	//need validate check!!
	if(!checkAdminMemberInfoValid()) return;
	
	
	defaultConfirm("등록하시겠습니까?", function(){
		$.ajax({
			type: "POST",
			url: "/config/updateAdminMemberAjax.do",
			data: {
				"admin_seq":$("input[name=admin_seq]").val(),
				"admin_id":$("input[name=admin_id]").val(),
				"admin_password":$("input[name=admin_password]").val(),
				"admin_name":$("input[name=admin_name]").val(),
				"admin_hp":$("input[name=admin_hp]").val(),
				"admin_email":$("input[name=admin_email]").val(),
				"admin_state":$("input[name=admin_state]").val(),
				"authList":JSON.stringify(createAuthData())
			},
			cache: false,
			async : true,
			dataType : "json",
			success: function(result, status, xhr){
				if(result.result == AJAX_RESULT_SUCCESS){
					defaultAlert(result.message,null,function(){
						location.reload();
					},null);
				}else{
					defaultAlert(result.message);
				}
			},
			error: function(jqXHR, textStatus, errorThrown){
				if(jqXHR.status == 300){
					defaultAlert("로그인이 필요합니다.!!");
				}else{
					defaultAlert("고객센터에 문의주세요.");
				}
			}
		});
	});
}

/**
 * 관리자 수정
 * @returns
 */
function updateAdminMember(){
	//need validate check!!
	if(!checkAdminMemberInfoValid()) return;
	
	defaultConfirm("수정하시겠습니까?", function(){
		$.ajax({
			type: "POST",
			url: "/config/updateAdminMemberAjax.do",
			data: {
				"admin_seq":$("input[name=admin_seq]").val(),
				"admin_password":$("input[name=admin_password]").val(),
				"admin_name":$("input[name=admin_name]").val(),
				"admin_hp":$("input[name=admin_hp]").val(),
				"admin_email":$("input[name=admin_email]").val(),
				"admin_state":$("select[name=admin_state]").val(),
				"authList":JSON.stringify(createAuthData())
			},
			cache: false,
			async : true,
			dataType : "json",
			success: function(result, status, xhr){
				if(result.result == AJAX_RESULT_SUCCESS){
					defaultAlert(result.message,null,function(){
						location.reload();
					},null);
				}else{
					defaultAlert(result.message);
				}
			},
			error: function(jqXHR, textStatus, errorThrown){
				if(jqXHR.status == 300){
					defaultAlert("로그인이 필요합니다.!!");
				}else{
					defaultAlert("고객센터에 문의주세요.");
				}
			}
		});
	});
}