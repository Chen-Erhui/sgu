var countdown = 60;
var isPhone = 1;
var URL = 'http://api-dev.sgu6.com'
/*获取memberid*/
/*var useragent = navigator.userAgent;
if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
    // 这里警告框会阻塞当前页面继续加载  
   alert('请使用微信浏览器打开本页面！');
    // 以下代码是用javascript强行关闭当前页面  
    var opened = window.open('about:blank', '_self');
    opened.opener = null;
    opened.close();
}*/

/*绑定手机号码设置密码*/
function binding() {
	getLocalStorage()
	var timestamp = new Date().getTime()
	var nonce = Math.random().toString(36).substr(2, 6)
	var sort = ([accessToken, timestamp, nonce]).sort()
	var signature = sha1(sort[0] + sort[1] + sort[2])
	var tel = $("#tel").val()
	var code = $("#codeinput").val()
	var memberId = JSON.parse(localStorage.jurisdiction).userId
	data1 = {
		"id": memberId,
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
			axios({
				method: "put",
				url: URL + '/member/phone/update',
				data:data1,
				headers: {
					sessionId: sessionId,
					signature: signature,
					nonce: nonce,
					timestamp: timestamp,
					requestId: ''
				}
			})
			.then(function(data) {
					if(data.data == 1) {
						var json = JSON.parse(localStorage.jurisdiction)
						json['phone'] = tel
						localStorage.jurisdiction = JSON.stringify(json)
						window.location.href = '../map'
					} else if(data.data.errCode==408) {
						alert('验证码错误')
					}else if(data.data.errCode==409){
						alert('手机号码重复')
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
/*获取getLocalStorage*/
function getLocalStorage() {
	accessToken = JSON.parse(localStorage.jurisdiction).accessToken
	sessionId = JSON.parse(localStorage.jurisdiction).id
	memberId = JSON.parse(localStorage.jurisdiction).userId
}