var phonenum;
var countdown = 60;
var URL = 'http://api-dev.sgu6.com'

function sendemail() {
	var obj = $("#btn");
	if($('#password1').val()==$('#password2').val()){
		
		getCookie('jurisdiction')
		settime(obj); //倒计时
		$.ajax({
			type: "get",
			url: URL + '/sms/' + localStorage.myphonenum,
			async: true,
			success: function(data) {
				console.log(data)
			
			}
		});
	}else{
		$('.wrong').css('opacity','1')
	}

}

/*发送验证码倒计时*/
function settime(obj) { 
	if(countdown == 0) {
		obj.attr('disabled', false);
		//obj.removeattr("disabled"); 
		obj.val("验证码");
		countdown = 60;
		return;
	} else {
		obj.attr('disabled', true);
		obj.val(countdown + 's');
		countdown--;
	}
	setTimeout(function() {
		settime(obj)
	}, 1000)
}

/*取cookie jurisdiction*/
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg)) {
		console.log(eval(unescape(arr[0])))
	} else {
		//		window.location.href='../login'
	}
}
