var URL = 'http://api-dev.sgu6.com'
var accessToken, sessionId, memberId
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

function getinfo() {
	getLocalStorage()
	var timestamp = new Date().getTime()
	var nonce = Math.random().toString(36).substr(2, 6)
	var sort = ([accessToken, timestamp, nonce]).sort()
	var signature = sha1(sort[0] + sort[1] + sort[2])
	axios({
			method: "get",
			url: URL + '/member/simple/' + memberId,
			headers: {
				sessionId: sessionId,
				signature: signature,
				nonce: nonce,
				timestamp: timestamp,
				requestId: ''
			}
		})
		.then(function(data) {
			console.log(data.data)
			$('.balance').text(data.data.accountSum)
			$('.integral').text(data.data.score)
//			$('.fxjifen').text("积分："+data.data.score)
			if(data.data.vip==1){
				$('.myname').append("<img src='img/VIP.png' /><i style='vertical-align: top;'>"+data.data.username+"</i>")
			}else{
				$('.myname').append("<img src='img/notVIP.png' /><i style='vertical-align: top;'>"+data.data.username+"</i>")
			}
			if(data.data.openId){
				$(".wxpic").css('background-image','url('+data.data.headImage+')')
				/*openId=data.data.openId
				wxinfo()*/
			}
		})
}
getinfo()
function wxinfo(){
	getLocalStorage()
	var timestamp = new Date().getTime()
	var nonce = Math.random().toString(36).substr(2, 6)
	var sort = ([accessToken, timestamp, nonce]).sort()
	var signature = sha1(sort[0] + sort[1] + sort[2])
	/*获取微信头像*/
	axios({
			method: "get",
			url: URL + '/wx/getUserInfo/' + openId,
			headers: {
				sessionId: sessionId,
				nonce: nonce,
				timestamp: timestamp,
				requestId: '',
				signature: signature,
			}
		})
		.then(function(data) {
			var pic=data.data.headImage
			var name=data.data.username
			$(".wxpic").css('background-image','url('+pic+')')
			$(".myname").text(name)
		})
}
/*获取getLocalStorage*/
function getLocalStorage() {
	accessToken = JSON.parse(localStorage.jurisdiction).accessToken
	sessionId = JSON.parse(localStorage.jurisdiction).id
	memberId = JSON.parse(localStorage.jurisdiction).userId
}
/*退出登陆*/
function logout() {
	getLocalStorage()
	var timestamp = new Date().getTime()
	var nonce = Math.random().toString(36).substr(2, 6)
	var sort = ([accessToken, timestamp, nonce]).sort()
	var signature = sha1(sort[0] + sort[1] + sort[2])
	axios({
		method: "get",
		url: URL + '/member/logout',
		headers: {
			sessionId: sessionId,
			signature: signature,
			nonce: nonce,
			timestamp: timestamp,
			requestId: ''
		}
	})
	.then(function(){
		/*清除LocalStorage*/
		localStorage.jurisdiction = ''
		window.location.href='../login'
	})
}
/*根据分销人ID获取分销列表*/
/*function getdistribution(){
	getLocalStorage()
	var timestamp = new Date().getTime()
	var nonce = Math.random().toString(36).substr(2, 6)
	var sort = ([accessToken, timestamp, nonce]).sort()
	var signature = sha1(sort[0] + sort[1] + sort[2])
	axios({
		method: "get",
		url: URL + '/scoreRecord/list?page=1&pageSize=10&memberId='+memberId,
		headers: {
			sessionId: sessionId,
			signature: signature,
			nonce: nonce,
			timestamp: timestamp,
			requestId: ''
		}
	}).then(function(data){
		console.log(data.data)
		console.log('aaaa')
	})
}
getdistribution()*/
/*获取提成*/
function getcommission(){
	getLocalStorage()
	var timestamp = new Date().getTime()
	var nonce = Math.random().toString(36).substr(2, 6)
	var sort = ([accessToken, timestamp, nonce]).sort()
	var signature = sha1(sort[0] + sort[1] + sort[2])
	axios({
		method: "get",
		url: URL + '/scoreRecord/'+memberId+'/4a36c9c7f37d4c85b318a17108c2b97f',
		headers: {
			sessionId: sessionId,
			signature: signature,
			nonce: nonce,
			timestamp: timestamp,
			requestId: ''
		}
	}).then(function(data){
		$('.commission').text(data.data.totalScore)
		$('.todycommission').text(data.data.dayScore)
	})
}
getcommission()
/*推广人数*/
function getspread(){
	getLocalStorage()
	axios.get(URL+'/data/branch/'+memberId)
	.then(function(data){
		$('.fxnum').text(data.data.todaySum)
		$('.fxtotal').text(data.data.totalSum)
	})
}
getspread()
/*跳转二维码推广页面*/
function spread(){
	window.location.href = 'spread.html'
}
/*跳转地址管理页面*/
function address(){
	window.location.href = 'address.html'
}
/*我的推广*/
function checklist(){
	window.location.href = 'spreadlist.html'
}
/*我的订单*/
function my_order(){
	window.location.href='my_order.html'
}
function scorelist(){
	window.location.href='scorelist.html'
}
function myscorelist(){
	window.location.href='myscorelist.html'
}
