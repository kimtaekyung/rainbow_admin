/**
 * 1depth 메뉴추가
 * @returns
 */
function addMenu(){
	var html = '';
	html += '<tr class="depth1">';
	html += '	<td>';
	html += '		<input type="hidden" name="menu_seq" value=""/>';
	html += '		<input type="hidden" name="menu_parent" value="0"/>';
	html += '		<input type="text" name="menu_name" value=""/>';
	html += '	</td>';
	html += '	<td></td>';
	html += '	<td class="subject"><input type="text" name="menu_link" value=""/></td>';
	html += '	<td><input type="text" name="menu_depth" value="1" style="width:25px;"/></td>';
	html += '	<td><input type="text" name="menu_order" value="'+getMenuOrder(1)+'" style="width:25px;"/></td>';
	html += '	<td>';
	html += '		<select name="menu_use_yn">';
	html += '			<option value="1">사용</option>';
	html += '			<option value="0">미사용</option>';
	html += '		</select>';
	html += '	</td>';
	html += '	<td>';
	html += '		<a href="javascript:void(0);" class="btn-middle" id="letter_write" onclick="addChildMenu(this);">하위메뉴추가</a>';
	html += '		<a href="javascript:void(0);" class="btn-middle" id="letter_write" onclick="delMenu(this);">삭제</a>';
	html += '	</td>';
	html += '</tr>';
	
	$("#menuTbody").append(html);
}

/**
 * 2depth 메뉴추가
 * @param obj
 * @param parnetMenuSeq
 * @returns
 */
function addChileMenu(obj, parnetMenuSeq){
	var html = '';
	html += '<tr class="depth'+parnetMenuSeq+'_depth2">';
	html += '	<td>└</td>';
	html += '	<td>';
	html += '		<input type="hidden" name="menu_seq" value=""/>';
	html += '		<input type="hidden" name="menu_parent" value="'+parnetMenuSeq+'"/>';
	html += '		<input type="text" name="menu_name" value=""/>';
	html += '	</td>';
	html += '	<td class="subject"><input type="text" name="menu_link" value=""/></td>';
	html += '	<td><input type="text" name="menu_depth" value="2" style="width:25px;"/></td>';
	html += '	<td><input type="text" name="menu_order" value="'+getMenuOrder(2, parnetMenuSeq)+'" style="width:25px;"/></td>';
	html += '	<td>';
	html += '		<select name="menu_use_yn">';
	html += '			<option value="1">사용</option>';
	html += '			<option value="0">미사용</option>';
	html += '		</select>';
	html += '	</td>';
	html += '	<td><a href="javascript:void(0);" class="btn-middle" id="letter_write" onclick="delMenu(this);">삭제</a></td>';
	html += '</tr>';
	
	if($("tr.depth"+parnetMenuSeq+"_depth2").length == 0){
		$(obj).parents("tr:first").after(html);
	}else{
		$("tr.depth"+parnetMenuSeq+"_depth2:last").after(html);
	}
}

/**
 * 메뉴추가시 순번자동생성
 * @param depth
 * @param parnetMenuSeq
 * @returns
 */
function getMenuOrder(depth, parnetMenuSeq){
	if(depth == 1){
		return Number($("tr.depth"+depth+":last").find("input[name=menu_order]").val()) + 1;
	}else{
		if($("tr.depth"+parnetMenuSeq+"_depth2").length == 0){
			return 1;
		}else{
			return Number($("tr.depth"+parnetMenuSeq+"_depth2:last").find("input[name=menu_order]").val()) + 1;
		}
	}
}

/**
 * 메뉴삭제
 * @param obj
 * @returns
 */
function delMenu(obj){
	$(obj).parents("tr:first").remove();
}

/**
 * 메뉴저장
 * @returns
 */
function saveAdminMenu(){
	
	defaultConfirm("저장하시겠습니까?", function(){
		$.ajax({
			type: "POST",
			url: "/config/saveAdminMenuAjax.do",
			data: {
				"menuList":JSON.stringify(createMenuData())
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
 * 메뉴 저장 데이터 생성
 * @returns
 */
function createMenuData(){
	var menuList = new Array();
	
	$("tbody#menuTbody > tr").each(function(){
		var obj = new Object();
		
		obj.menu_seq = $(this).find("input[name=menu_seq]").val();
		obj.menu_parent = $(this).find("input[name=menu_parent]").val();
		obj.menu_name = $(this).find("input[name=menu_name]").val();
		obj.menu_link = $(this).find("input[name=menu_link]").val();
		obj.menu_depth = $(this).find("input[name=menu_depth]").val();
		obj.menu_order = $(this).find("input[name=menu_order]").val();
		obj.menu_use_yn = $(this).find("select[name=menu_use_yn]").val();
		
		menuList.push(obj);
	});
	
	return menuList;
}