var localhost = 'http://192.168.0.23:8080';

window.onload = function () {
	
	var userInfo = getUserInfo();
	
	$(document).on('click', '#userLogin', function(){
		if($('#userEmail').val() == ''){
			swal('이메일을 입력해주세요.');		
			return;
		} else if($('#userPassword').val() == ''){
			swal('패스워드를 입력해주세요.');		
			return;
		}	
		/*swal($('#userEmail').val());
		swal($('#userPassword').val());*/
		login(event);
	});
	
	//로그아웃 버튼
	$(document).on('click', '#logoutBtn', function(){
		logout(event);
		localStorage.clear();
		$(location).attr('href','/');
	});
	
	if(userInfo.userNo==null) {
		$('#Panel').load('logout-panel.html'); 
		
	}else if (userInfo.userNo!=null) {
		$('#Panel').load('login-panel.html');
		$('#content').load('login-main.html');
	};
};


/*function getUserInfo(){
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
}*/


//logout
function logout(event) {
	event.preventDefault();
	$.ajax({
		url : localhost+'/user/logout.json', 
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
				swal('서버 요청 오류1');
			}
		},
		error : function() {
			swal('서버 요청 오류2');
		}
	});  //end of ajax 
}; // end of jquery 

function login(event) {
	event.preventDefault();
	
	$.ajax({
		url : localhost+'/user/login.json', 
		method : 'post',
		dataType : 'json',
		data : {
			email : $('#userEmail').val(),
			password : $('#userPassword').val()			
		}, 
		success : function(result) {
			 
			 localStorage.setItem('userNo', result.data.userNo);
			 localStorage.setItem('userName', result.data.userName);
			 localStorage.setItem('email', result.data.email);
			 localStorage.setItem('image', result.data.image);
			 localStorage.setItem('intro', result.data.intro);
			 localStorage.setItem('role', result.data.role);
			 localStorage.setItem('joinDate', result.data.joinDate);
			 localStorage.setItem('recipeUrl', result.data.recipeUrl);
			 localStorage.setItem('recipeCount', result.data.recipeCount);
			 localStorage.setItem('subsCount', result.data.subsCount);
			 localStorage.setItem('grade', result.data.grade);
			 
			
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
				$('#Panel').load('login-panel.html');
			} else {
				swal('잘못입력하셨습니다.','아이디 또는 비밀번호를 다시 확인하여 주세요.',"error");
			}
			document.getElementById('mobile-style').disabled = false;
			$('#content').load('login-main.html');
			/*$(location).attr('href','http://192.168.0.23:3000');*/
			/*$.mobile.changePage("http://192.168.0.23:3000/index.html", { transition: "slideup", changeHash: false });*/
			location.reload();
		},
		error : function() {
			swal(result.status);
			swal('서버 요청 오류');
		}
	}); /* end of ajax */
}; /* end of jquery */


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
		subsCount : obj.data.subsCount
	};
	
	return userInfo;
}

function loginCheck() {
	return $.ajax({
		url : localhost+'/user/loginCheck.json', 
		method : 'get',
		dataType : 'json',
        async: false
	});
}; /* end of jquery */

