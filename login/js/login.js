/*限制使用微信浏览器*/
var useragent = navigator.userAgent;
if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
    // 这里警告框会阻塞当前页面继续加载  
   alert('请使用微信浏览器打开本页面！');
    // 以下代码是用javascript强行关闭当前页面  
    var opened = window.open('about:blank', '_self');
    opened.opener = null;
    opened.close();
}
var countdown = 60;
var isPhone = 1;
var URL = 'http://api-dev.sgu6.com'

//发送验证码
function sendemail() {
	var obj = $("#btn");
	checkPhone();
	if(isPhone) {
		settime(obj); //倒计时
		console.log($('#phone').val())
		$.ajax({
			type: "get",
			url: URL + '/sms/' + $('#phone').val(),
			async: true,
			success: function(data) {
				console.log(data)
			}
		});
	} else {
		$('#phone').focus();
	}
}
//验证手机号码
function checkPhone() {
	var phone = $('#phone').val();
	var pattern = /^1[3456789]\d{9}$/;
	isPhone = 1;
	if(phone == '') {
		alert('请输入手机号码');
		isPhone = 0;
		return;
	}
	if(!pattern.test(phone)) {
		alert('请输入正确的手机号码');
		isPhone = 0;
		return;
	}
}

function settime(obj) { //发送验证码倒计时
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
/*登陆*/
function beginregister() {
	var data1 = {
		'phoneNumber': $('#phone').val(),
		'code': $('#code').val()
	}
	if($('#phone').val()==''||$('#code').val()=='') {
		alert("请输入手机号码和验证码")
	} else {
		if((/^1[3456789]\d{9}$/.test($('#phone').val())) && (/\d{6}/.test($('#code').val()))) {
			var url = URL + '/member/phoneLogin'
			$('.spinner').css('display', 'block')
			axios.post(url, data1)
				.then(function(data) {
					console.log(data.data)
					$('.spinner').css('display', 'none')
					if(data.data.errCode != null) {
						alert('验证码有误！')
					} else {
						localStorage.jurisdiction = JSON.stringify(data.data)
						parent.location.reload()
					}
				})
		} else {
			return
		}
	}
}
/*微信登陆*/
function wxlogin() {
	var url = 'http://api-dev.sgu6.com/wxlogin?appId=wx5d7e9aaf13ea8c9b'
	window.location.href = url
}
/*QQ登陆*/
function qqlogin() {
	alert('暂不支持QQ登陆')
}
/*支付宝登陆*/
function allogin() {
	alert('暂不支持支付宝登陆')
}