var URL = 'http://api-dev.sgu6.com'
var page=1
var page1=1
var page2=1
var page3=1
function allorder() {
	page=1
	$('.content ul').empty();
	$('.allorder').css('color', 'rgb(242,48,48)')
	$('.obligation').css('color', 'black')
	$('.deliver').css('color', 'black')
	$('.confirm').css('color', 'black')
	getLocalStorage()
	var timestamp = new Date().getTime()
	var nonce = Math.random().toString(36).substr(2, 6)
	var sort = ([accessToken, timestamp, nonce]).sort()
	var signature = sha1(sort[0] + sort[1] + sort[2])
	axios({
			method: "get",
			url: URL + '/order/list?page=' + page + '&pageSize=10&memberId=' + memberId,
			headers: {
				sessionId: sessionId,
				signature: signature,
				nonce: nonce,
				timestamp: timestamp,
				requestId: ''
			}
		})
		.then(function(data) {
			if(data.data.list.length == 0) {
				$('.content ul').append("<p id='more'>您还没有订单</p>")
			} else if(data.data.list.length < 10) {
				var order_list = data.data.list
				for(var i = 0; i < order_list.length; i++) {
					$('.content ul').append(
						"<li>"
						  +"<p class='orderno'>订单号："+order_list[i].orderNo+"</p>"+
						  "<p>"
						  	+"<span class='money'>金额："+order_list[i].totalMoney+"元</span>"+
						  	"<span class='time'>"+new Date(order_list[i].createTime).getFullYear()+'-'+(new Date(order_list[i].createTime).getMonth()+1)+'-'+new Date(order_list[i].createTime).getDate()+' '+new Date(order_list[i].createTime).getHours()+':'+new Date(order_list[i].createTime).getMinutes()+"</span>"+
						  	"<span class='status'>"+status(order_list[i].status)+"</span>"+
						  "</p>"+
						"</li>"
					)
				}
			} else {
				var order_list = data.data.list
				for(var i = 0; i < order_list.length; i++) {
					$('.content ul').append(
						"<li>"
						  +"<p class='orderno'>订单号："+order_list[i].orderNo+"</p>"+
						  "<p>"
						  	+"<span class='money'>金额："+order_list[i].totalMoney+"元</span>"+
						  	"<span class='time'>"+new Date(order_list[i].createTime).getFullYear()+'-'+(new Date(order_list[i].createTime).getMonth()+1)+'-'+new Date(order_list[i].createTime).getDate()+' '+new Date(order_list[i].createTime).getHours()+':'+new Date(order_list[i].createTime).getMinutes()+"</span>"+
						  	"<span class='status'>"+status(order_list[i].status)+"</span>"+
						  "</p>"+
						"</li>"
					)
				}
				$('.content ul').append("<p id='more'>加载更多</p>")
			}
		})
}
function status(num){
	if(num==1){
		return "未付款"
	}else if(num==4){
		return "收货待评价"
	}else if(num==2){
		return "付款待发货"
	}else if(num==3){
		return "待收货"
	}else if(num==5){
		return "订单完成"
	}else if(num==6){
		return "退款中"
	}else if(num==7){
		return "退款完成"
	}else if(num==-1){
		return "已取消"
	}else{
		return
	}
}
allorder()
$('.content ul').on('click', '#more', function() {
	$('#more').remove()
	page++
	getLocalStorage()
	var timestamp = new Date().getTime()
	var nonce = Math.random().toString(36).substr(2, 6)
	var sort = ([accessToken, timestamp, nonce]).sort()
	var signature = sha1(sort[0] + sort[1] + sort[2])
	axios({
			method: "get",
			url: URL + '/order/list?page=' + page + '&pageSize=10&memberId=' + memberId,
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
			if(data.data.list.length == 0) {
				alert("没有更多了...")
			} else if(data.data.list.length < 10) {
				var order_list = data.data.list
				for(var i = 0; i < order_list.length; i++) {
					$('.content ul').append(
						"<li>"
						  +"<p class='orderno'>订单号："+order_list[i].orderNo+"</p>"+
						  "<p>"
						  	+"<span class='money'>金额："+order_list[i].totalMoney+"元</span>"+
						  	"<span class='time'>"+new Date(order_list[i].createTime).getFullYear()+'-'+(new Date(order_list[i].createTime).getMonth()+1)+'-'+new Date(order_list[i].createTime).getDate()+' '+new Date(order_list[i].createTime).getHours()+':'+new Date(order_list[i].createTime).getMinutes()+"</span>"+
						  	"<span class='status'>"+status(order_list[i].status)+"</span>"+
						  "</p>"+
						"</li>"
					)
				}
			} else {
				var order_list = data.data.list
				for(var i = 0; i < order_list.length; i++) {
					$('.content ul').append(
						"<li>"
						  +"<p class='orderno'>订单号："+order_list[i].orderNo+"</p>"+
						  "<p>"
						  	+"<span class='money'>金额："+order_list[i].totalMoney+"元</span>"+
						  	"<span class='time'>"+new Date(order_list[i].createTime).getFullYear()+'-'+(new Date(order_list[i].createTime).getMonth()+1)+'-'+new Date(order_list[i].createTime).getDate()+' '+new Date(order_list[i].createTime).getHours()+':'+new Date(order_list[i].createTime).getMinutes()+"</span>"+
						  	"<span class='status'>"+status(order_list[i].status)+"</span>"+
						  "</p>"+
						"</li>"
					)
				}
				$('.content ul').append("<p id='more'>加载更多</p>")
			}
		})
})
$('.content ul').on('click', '#more1', function() {
	$('#more1').remove()
	page1++
	getLocalStorage()
	var timestamp = new Date().getTime()
	var nonce = Math.random().toString(36).substr(2, 6)
	var sort = ([accessToken, timestamp, nonce]).sort()
	var signature = sha1(sort[0] + sort[1] + sort[2])
	axios({
			method: "get",
			url: URL + '/order/list?page=' + page1 + '&status=1&pageSize=10&memberId=' + memberId,
			headers: {
				sessionId: sessionId,
				signature: signature,
				nonce: nonce,
				timestamp: timestamp,
				requestId: ''
			}
		})
		.then(function(data) {
			if(data.data.list.length == 0) {
				alert("没有更多了...")
			} else if(data.data.list.length < 10) {
				var order_list = data.data.list
				for(var i = 0; i < order_list.length; i++) {
					$('.content ul').append(
						"<li>"
						  +"<p class='orderno'>订单号："+order_list[i].orderNo+"</p>"+
						  "<p>"
						  	+"<span class='money'>金额："+order_list[i].totalMoney+"元</span>"+
						  	"<span class='time'>"+new Date(order_list[i].createTime).getFullYear()+'-'+(new Date(order_list[i].createTime).getMonth()+1)+'-'+new Date(order_list[i].createTime).getDate()+' '+new Date(order_list[i].createTime).getHours()+':'+new Date(order_list[i].createTime).getMinutes()+"</span>"+
						  "</p>"+
						"</li>"
					)
				}
			} else {
				var order_list = data.data.list
				for(var i = 0; i < order_list.length; i++) {
					$('.content ul').append(
						"<li>"
						  +"<p class='orderno'>订单号："+order_list[i].orderNo+"</p>"+
						  "<p>"
						  	+"<span class='money'>金额："+order_list[i].totalMoney+"元</span>"+
						  	"<span class='time'>"+new Date(order_list[i].createTime).getFullYear()+'-'+(new Date(order_list[i].createTime).getMonth()+1)+'-'+new Date(order_list[i].createTime).getDate()+' '+new Date(order_list[i].createTime).getHours()+':'+new Date(order_list[i].createTime).getMinutes()+"</span>"+
						  "</p>"+
						"</li>"
					)
				}
				$('.content ul').append("<p id='more1'>加载更多</p>")
			}
		})
})
$('.content ul').on('click', '#more2', function() {
	$('#more2').remove()
	page2++
	getLocalStorage()
	var timestamp = new Date().getTime()
	var nonce = Math.random().toString(36).substr(2, 6)
	var sort = ([accessToken, timestamp, nonce]).sort()
	var signature = sha1(sort[0] + sort[1] + sort[2])
	axios({
			method: "get",
			url: URL + '/order/list?page=' + page2 + '&status=2&pageSize=10&memberId=' + memberId,
			headers: {
				sessionId: sessionId,
				signature: signature,
				nonce: nonce,
				timestamp: timestamp,
				requestId: ''
			}
		})
		.then(function(data) {
			if(data.data.list.length == 0) {
				alert("没有更多了...")
			} else if(data.data.list.length < 10) {
				var order_list = data.data.list
				for(var i = 0; i < order_list.length; i++) {
					$('.content ul').append(
						"<li>"
						  +"<p class='orderno'>订单号："+order_list[i].orderNo+"</p>"+
						  "<p>"
						  	+"<span class='money'>金额："+order_list[i].totalMoney+"元</span>"+
						  	"<span class='time'>"+new Date(order_list[i].createTime).getFullYear()+'-'+(new Date(order_list[i].createTime).getMonth()+1)+'-'+new Date(order_list[i].createTime).getDate()+' '+new Date(order_list[i].createTime).getHours()+':'+new Date(order_list[i].createTime).getMinutes()+"</span>"+
						  "</p>"+
						"</li>"
					)
				}
			} else {
				var order_list = data.data.list
				for(var i = 0; i < order_list.length; i++) {
					$('.content ul').append(
						"<li>"
						  +"<p class='orderno'>订单号："+order_list[i].orderNo+"</p>"+
						  "<p>"
						  	+"<span class='money'>金额："+order_list[i].totalMoney+"元</span>"+
						  	"<span class='time'>"+new Date(order_list[i].createTime).getFullYear()+'-'+(new Date(order_list[i].createTime).getMonth()+1)+'-'+new Date(order_list[i].createTime).getDate()+' '+new Date(order_list[i].createTime).getHours()+':'+new Date(order_list[i].createTime).getMinutes()+"</span>"+
						  "</p>"+
						"</li>"
					)
				}
				$('.content ul').append("<p id='more2'>加载更多</p>")
			}
		})
})
$('.content ul').on('click', '#more3', function() {
	$('#more3').remove()
	page3++
	getLocalStorage()
	var timestamp = new Date().getTime()
	var nonce = Math.random().toString(36).substr(2, 6)
	var sort = ([accessToken, timestamp, nonce]).sort()
	var signature = sha1(sort[0] + sort[1] + sort[2])
	axios({
			method: "get",
			url: URL + '/order/list?page=' + page3 + '&status=3&pageSize=10&memberId=' + memberId,
			headers: {
				sessionId: sessionId,
				signature: signature,
				nonce: nonce,
				timestamp: timestamp,
				requestId: ''
			}
		})
		.then(function(data) {
			if(data.data.list.length == 0) {
				alert("没有更多了...")
			} else if(data.data.list.length < 10) {
				var order_list = data.data.list
				for(var i = 0; i < order_list.length; i++) {
					$('.content ul').append(
						"<li>"
						  +"<p class='orderno'>订单号："+order_list[i].orderNo+"</p>"+
						  "<p>"
						  	+"<span class='money'>金额："+order_list[i].totalMoney+"元</span>"+
						  	"<span class='time'>"+new Date(order_list[i].createTime).getFullYear()+'-'+(new Date(order_list[i].createTime).getMonth()+1)+'-'+new Date(order_list[i].createTime).getDate()+' '+new Date(order_list[i].createTime).getHours()+':'+new Date(order_list[i].createTime).getMinutes()+"</span>"+
						  "</p>"+
						"</li>"
					)
				}
			} else {
				var order_list = data.data.list
				for(var i = 0; i < order_list.length; i++) {
					$('.content ul').append(
						"<li>"
						  +"<p class='orderno'>订单号："+order_list[i].orderNo+"</p>"+
						  "<p>"
						  	+"<span class='money'>金额："+order_list[i].totalMoney+"元</span>"+
						  	"<span class='time'>"+new Date(order_list[i].createTime).getFullYear()+'-'+(new Date(order_list[i].createTime).getMonth()+1)+'-'+new Date(order_list[i].createTime).getDate()+' '+new Date(order_list[i].createTime).getHours()+':'+new Date(order_list[i].createTime).getMinutes()+"</span>"+
						  "</p>"+
						"</li>"
					)
				}
				$('.content ul').append("<p id='more3'>加载更多</p>")
			}
		})
})


function obligation() {
	page1=1
	$('.content ul').empty(); 
	$('.allorder').css('color', 'black')
	$('.obligation').css('color', 'rgb(242,48,48)')
	$('.deliver').css('color', 'black')
	$('.confirm').css('color', 'black')
	getLocalStorage()
	var timestamp = new Date().getTime()
	var nonce = Math.random().toString(36).substr(2, 6)
	var sort = ([accessToken, timestamp, nonce]).sort()
	var signature = sha1(sort[0] + sort[1] + sort[2])
	axios({
			method: "get",
			url: URL + '/order/list?page=' + page1 + '&status=1&pageSize=10&memberId=' + memberId,
			headers: {
				sessionId: sessionId,
				signature: signature,
				nonce: nonce,
				timestamp: timestamp,
				requestId: ''
			}
		})
		.then(function(data) {
			if(data.data.list.length == 0) {
				$('.content ul').append("<p id='more1'>您还没有订单</p>")
			} else if(data.data.list.length < 10) {
				var order_list = data.data.list
				for(var i = 0; i < order_list.length; i++) {
					$('.content ul').append(
						"<li class='orderno'>"
						  +"<p>订单号："+order_list[i].orderNo+"</p>"+
						  "<p>"
						  	+"<span class='money'>金额："+order_list[i].totalMoney+"元</span>"+
						  	"<span class='time'>"+new Date(order_list[i].createTime).getFullYear()+'-'+(new Date(order_list[i].createTime).getMonth()+1)+'-'+new Date(order_list[i].createTime).getDate()+' '+new Date(order_list[i].createTime).getHours()+':'+new Date(order_list[i].createTime).getMinutes()+"</span>"+
						  "</p>"+
						"</li>"
					)
				}
			} else {
				var order_list = data.data.list
				for(var i = 0; i < order_list.length; i++) {
					$('.content ul').append(
						"<li>"
						  +"<p class='orderno'>订单号："+order_list[i].orderNo+"</p>"+
						  "<p>"
						  	+"<span class='money'>金额："+order_list[i].totalMoney+"元</span>"+
						  	"<span class='time'>"+new Date(order_list[i].createTime).getFullYear()+'-'+(new Date(order_list[i].createTime).getMonth()+1)+'-'+new Date(order_list[i].createTime).getDate()+' '+new Date(order_list[i].createTime).getHours()+':'+new Date(order_list[i].createTime).getMinutes()+"</span>"+
						  "</p>"+
						"</li>"
					)
				}
				$('.content ul').append("<p id='more1'>加载更多</p>")
			}
		})
}

function deliver() {
	$('.content ul').empty();
	$('.allorder').css('color', 'black')
	$('.obligation').css('color', 'black')
	$('.deliver').css('color', 'rgb(242,48,48)')
	$('.confirm').css('color', 'black')
	var page2=1
	getLocalStorage()
	var timestamp = new Date().getTime()
	var nonce = Math.random().toString(36).substr(2, 6)
	var sort = ([accessToken, timestamp, nonce]).sort()
	var signature = sha1(sort[0] + sort[1] + sort[2])
	axios({
			method: "get",
			url: URL + '/order/list?page=' + page2 + '&status=2&pageSize=10&memberId=' + memberId,
			headers: {
				sessionId: sessionId,
				signature: signature,
				nonce: nonce,
				timestamp: timestamp,
				requestId: ''
			}
		})
		.then(function(data) {
			if(data.data.list.length == 0) {
				$('.content ul').append("<p id='more'>您没有待发货订单</p>")
			} else if(data.data.list.length < 10) {
				var order_list = data.data.list
				for(var i = 0; i < order_list.length; i++) {
					$('.content ul').append(
						"<li>"
						  +"<p class='orderno'>订单号："+order_list[i].orderNo+"</p>"+
						  "<p>"
						  	+"<span class='money'>金额："+order_list[i].totalMoney+"元</span>"+
						  	"<span class='time'>"+new Date(order_list[i].createTime).getFullYear()+'-'+(new Date(order_list[i].createTime).getMonth()+1)+'-'+new Date(order_list[i].createTime).getDate()+' '+new Date(order_list[i].createTime).getHours()+':'+new Date(order_list[i].createTime).getMinutes()+"</span>"+
						  "</p>"+
						"</li>"
					)
				}
			} else {
				var order_list = data.data.list
				for(var i = 0; i < order_list.length; i++) {
					$('.content ul').append(
						"<li>"
						  +"<p class='orderno'>订单号："+order_list[i].orderNo+"</p>"+
						  "<p>"
						  	+"<span class='money'>金额："+order_list[i].totalMoney+"元</span>"+
						  	"<span class='time'>"+new Date(order_list[i].createTime).getFullYear()+'-'+(new Date(order_list[i].createTime).getMonth()+1)+'-'+new Date(order_list[i].createTime).getDate()+' '+new Date(order_list[i].createTime).getHours()+':'+new Date(order_list[i].createTime).getMinutes()+"</span>"+
						  "</p>"+
						"</li>"
					)
				}
				$('.content ul').append("<p id='more2'>加载更多</p>")
			}
		})
}

function confirm() {
	$('.content ul').empty();
	page3=1
	$('.allorder').css('color', 'black')
	$('.obligation').css('color', 'black')
	$('.deliver').css('color', 'black')
	$('.confirm').css('color', 'rgb(242,48,48)')
	var page3=1
	getLocalStorage()
	var timestamp = new Date().getTime()
	var nonce = Math.random().toString(36).substr(2, 6)
	var sort = ([accessToken, timestamp, nonce]).sort()
	var signature = sha1(sort[0] + sort[1] + sort[2])
	axios({
			method: "get",
			url: URL + '/order/list?page=' + page3 + '&status=3&pageSize=10&memberId=' + memberId,
			headers: {
				sessionId: sessionId,
				signature: signature,
				nonce: nonce,
				timestamp: timestamp,
				requestId: ''
			}
		})
		.then(function(data) {
			if(data.data.list.length == 0) {
				$('.content ul').append("<p id='more'>您没有待确认订单</p>")
			} else if(data.data.list.length < 10) {
				var order_list = data.data.list
				for(var i = 0; i < order_list.length; i++) {
					$('.content ul').append(
						"<li>"
						  +"<p class='orderno'>订单号："+order_list[i].orderNo+"</p>"+
						  "<p>"
						  	+"<span class='money'>金额："+order_list[i].totalMoney+"元</span>"+
						  	"<span class='time'>"+new Date(order_list[i].createTime).getFullYear()+'-'+(new Date(order_list[i].createTime).getMonth()+1)+'-'+new Date(order_list[i].createTime).getDate()+' '+new Date(order_list[i].createTime).getHours()+':'+new Date(order_list[i].createTime).getMinutes()+"</span>"+
						  "</p>"+
						"</li>"
					)
				}
			} else {
				var order_list = data.data.list
				for(var i = 0; i < order_list.length; i++) {
					$('.content ul').append(
						"<li>"
						  +"<p class='orderno'>订单号："+order_list[i].orderNo+"</p>"+
						  "<p>"
						  	+"<span class='money'>金额："+order_list[i].totalMoney+"元</span>"+
						  	"<span class='time'>"+new Date(order_list[i].createTime).getFullYear()+'-'+(new Date(order_list[i].createTime).getMonth()+1)+'-'+new Date(order_list[i].createTime).getDate()+' '+new Date(order_list[i].createTime).getHours()+':'+new Date(order_list[i].createTime).getMinutes()+"</span>"+
						  "</p>"+
						"</li>"
					)
				}
				$('.content ul').append("<p id='more3'>加载更多</p>")
			}
		})
}
/*获取getLocalStorage*/
function getLocalStorage() {
	accessToken = JSON.parse(localStorage.jurisdiction).accessToken
	sessionId = JSON.parse(localStorage.jurisdiction).id
	memberId = JSON.parse(localStorage.jurisdiction).userId
}
