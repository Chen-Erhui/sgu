var countdown = 60;
var isPhone = 1;
var openId = ''
var URL = 'http://api-dev.sgu6.com'
/*获取memberid*/
var useragent = navigator.userAgent;
if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
    // 这里警告框会阻塞当前页面继续加载  
   alert('请使用微信浏览器打开本页面！');
    // 以下代码是用javascript强行关闭当前页面  
    var opened = window.open('about:blank', '_self');
    opened.opener = null;
    opened.close();
}
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return unescape(r[2]);
	}
	return null;
}
/*获取openId*/
function getopenId() {
	memberId = getQueryString('memberId')
	axios.get(URL + "/member/simple/" + memberId)
		.then(function(data) {
			openId = data.data.openId
			//		console.log('openId:'+openId)
		})
}
getopenId()
/*绑定手机号码设置密码*/
function binding() {
	var tel = $("#tel").val()
	/*var pw1=$("#password1").val()
    var pw2=$("#password2").val()*/
	var code = $("#codeinput").val()
	/*var spreadcode=''
	if(localStorage.spreadcode!=null){
		spreadcode=localStorage.spreadcode
	}*/
	data1 = {
		"id": memberId,
		"openId": openId,
		"phone": tel,
		"code": code
	}
	if(tel == '' || code == '') {
		alert('请输入手机号码和验证码')
	} else {
		if(/^1[3456789]\d{9}$/.test(tel)) {
			$(".tel").css({
				'border': '0.04rem solid rgb(208,208,208)'
			})
			axios.post(URL + '/member/thirdLoginSave', data1)
				.then(function(data) {
					console.log(data.data)
					if(data.data.errCode != null) {
						alert('验证码有误')
					} else {
						localStorage.jurisdiction = JSON.stringify(data.data)
						window.location.href = '../map'
					}
				})
		} else {
			$(".tel").css({
				'border': '0.04rem solid red'
			})
		}
	}
}

//发送验证码
function sendemail() {
	var obj = $("#codebtn");
	checkPhone();
	if(isPhone) {
		settime(obj); //倒计时
		$.ajax({
			type: "get",
			url: URL + '/sms/' + $('#tel').val(),
			async: true,
			success: function(data) {
				console.log(data)
			}
		});
	} else {
		$('#tel').focus();
	}
}
//验证手机号码
function checkPhone() {
	var phone = $('#tel').val();
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