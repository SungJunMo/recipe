window.onload = function () {
	

	/*로그아웃 버튼*/
	$(document).on('click', '#logoutBtn', function(){
		logout(event);
		$(location).attr('href','/');
	});
	

	$(document).on('click', '#userLogin', function(){
		if($('#userEmail').val() == ''){
			swal('이메일을 입력해주세요.');		
			return;
		} else if($('#userPassword').val() == ''){
			swal('패스워드를 입력해주세요.');		
			return;
		}	
		login(event);
	});
};


function getUserInfo(){
	var obj = loginCheck().responseJSON;
	if(obj.status!='success'){
		return;
	}
	
	var userInfo = {
		userNo : obj.data.userNo,
		userName : obj.data.userName,
		email : obj.data.email,
		image : obj.data.image,
		intro : obj.data.intro,
		role : obj.data.role,
		joinDate : obj.data.joinDate,
		recipeUrl : obj.data.recipeUrl,
		recipeCount : obj.data.recipeCount,
		subsCount : obj.data.subsCount,
		grade:obj.data.grade
	};
	
	$('#signUpBtn').remove();
	$('#loginBtn').remove();
	$('#signUpTopBtn').remove();
//	$('#loginIcon').html('<img id="loginIconAction1" class="rcp-barimg dropdown-trigger img-circle" src="img/profileImg/'+userInfo.image+'" />');
//	$('#topbarUserImg').html('<img id="loginIconAction2" class="rcp-barimg dropdown-trigger img-circle" src="img/profileImg/'+userInfo.image+'" />');
	
	return userInfo;
}

function loginCheck() {
	return $.ajax({
		url : '/user/loginCheck.json', 
		method : 'get',
		dataType : 'json',
        async: false
	});
}; /* end of jquery */


//logout
function logout(event) {
	event.preventDefault();
	$.ajax({
		url : '/user/logout.json', 
		method : 'get',
		dataType : 'json',
		success : function(result) {
			if (result.status == 'failure') {
				swal('로그아웃 실패!!');
				return
			} 
			if(result.status == 'success'){
				userInfo=null;
			} else {
				swal('서버 요청 오류');
			}
		},
		error : function() {
			swal('서버 요청 오류');
		}
	}); /* end of ajax */
}; /* end of jquery */

function login(event) {
	event.preventDefault();
	
	$.ajax({
		url : '/user/login.json', 
		method : 'post',
		dataType : 'json',
		data : {
			email : $('#userEmail').val(),
			password : $('#userPassword').val()			
		}, 
		success : function(result) {
			if (result.status == 'failure') {

				swal('잘못입력하셨습니다.','아이디 또는 비밀번호를 다시 확인하여 주세요.',"error");

				return;
			}else if (result.status == 'authError') {
				swal('인증이 되지 않은 ID입니다.','email 인증을 확인하여 주세요.',"error");

				return;
			}else if (result.status == 'null') {
				swal('등록되지 않은 ID입니다.','email을 다시 확인하여 주세요.',"error");

				return;
			}else if(result.status == 'success'){
				location.reload();
				$('#login-pop-up-banner').bPopup().close();
			} else {
				swal('잘못입력하셨습니다.','아이디 또는 비밀번호를 다시 확인하여 주세요.',"error");
			}

		},
		error : function() {
			swal('서버 요청 오류');
		}
	}); /* end of ajax */
}; /* end of jquery */
