$(function() {
	
	$('#content').load('main.html');
	$('#Panel').load('logout-panel.html'); 
	
/*	 $(document).on('load','#content',function(){
		    document.getElementById('mobile-detail-style-css').disabled = false;
		    document.getElementById('mobile-style-css').disabled = false;
	 });*/
	 
	
	$(document).on('click','#login-panel',function(){
	    document.getElementById('mobile-style').disabled = true;
		$('#content').load('login.html');
	});
	
	$(document).on('click','#detail-content',function(){
		$('#content').load('login-main.html');
	});
	
	
/*	function loadMonthRank() {
		var source = $('#cook-template').text();
		var template = Handlebars.compile(source);

		$.ajax({
			url : 'user/monthtop3.json',
			dataType : 'json',
			method : 'get',
			success : function(result) {
				if (result.status != 'success') {
					swal('chefCard.js 오류');
					return;
				}
				
				for (var i = 0; i < result.data.length; i++) {
					if (result.data[i].subscribeUser==0) {
						result.data[i].status = null;
						console.log('unlogin::'+result.data[i].status);
					}else {result.data[i].status = Boolean(true);
					console.log('login::'+result.data[i].status);
					}
				}
				console.log("month rank : "+result.data);
				$('#rcp-chef-rank-month').append(template(result));
			},
			error : function() {
				swal('서버 요청 오류!...')
			}
		});		
	}//end of 쉐프카드
*/
});