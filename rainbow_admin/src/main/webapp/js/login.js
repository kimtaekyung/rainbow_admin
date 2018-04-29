$(document).ready(function(){
	$("input[name=admin_password]").focus();
});

function loginProc(){
	
	$.ajax({
		type : "POST"
		,url : "/auth/getRsaPublicKey.do"
		,data : null
		,dataType : "json"
		,async : true
		,success : function(result, status, xhr) {
			if(result.result == AJAX_RESULT_SUCCESS){
				console.log(result);
				
				var rsa = new RSAKey();
				rsa.setPublic(result.RSAModulus,result.RSAExponent);
				
				$("input[name=admin_password]").val(rsa.encrypt($("input[name=admin_password_tmp]").val()));
				
				$.ajax({
					type : "POST"
					,url : "/auth/adminLoginAjax.do"
					,data : $("form[name=frmLogin]").serialize()
					,dataType : "json"
					,async : true
					,success : function(result, status, xhr) {
						
						console.log(result);
						if(result.result == AJAX_RESULT_SUCCESS){
							location.href = "/main.do";
						}else{
							alert("result.message");
						}
						
					}
					,error : function(jqXHR, textStatus, errorThrown) {
						alert("로그인 실패");
						console.log(jqXHR);
						console.log(textStatus);
						console.log(errorThrown);
					}
				});
			}
		}
		,error : function(jqXHR, textStatus, errorThrown) {
			alert("로그인 암호화 실패");
			console.log(jqXHR);
			console.log(textStatus);
			console.log(errorThrown);
		}
	});
}