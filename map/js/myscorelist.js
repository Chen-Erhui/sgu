var URL = 'http://api-dev.sgu6.com'
var page = 1
/*点击全部*/
function allscore() {
	page = 1
	$('.content ul').empty();
	$('.allscore').css({
		'color': 'rgb(223,25,36)',
		'border-bottom': '2px solid rgb(223,25,36)'
	})
	$('.putinscore').css({
		'color': 'black',
		'border': 'none'
	})
	$('.putoutscore').css({
		'color': 'black',
		'border': 'none'
	})
	getLocalStorage()
	var timestamp = new Date().getTime()
	var nonce = Math.random().toString(36).substr(2, 6)
	var sort = ([accessToken, timestamp, nonce]).sort()
	var signature = sha1(sort[0] + sort[1] + sort[2])
	axios({
			method: "get",
			url: URL + '/scoreRecord/list?page=' + page + '&pageSize=10&memberId=' + memberId,
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
				$('.content ul').append("<p class='nomore'>您还没有积分记录</p>")
			} else if(data.data.list.length < 10) {
				var list = data.data.list
				for(var i = 0; i < data.data.list.length; i++) {
					$('.content ul').append(
						"<li>" +
						"<span class='time'>" + new Date(list[i].createTime).getFullYear() + '-' + (new Date(list[i].createTime).getMonth()+1) + '-' + new Date(list[i].createTime).getDate() +' '+ new Date(list[i].createTime).getHours()+':'+new Date(list[i].createTime).getMinutes()+"</span>" +
						"<span class='memo'>" + list[i].memo + "</span>" +
						"<span class='myscore'>+" + list[i].score + "</span>" +
						"</li>"
					)
				}
			} else {
				var list = data.data.list
				for(var i = 0; i < data.data.list.length; i++) {
					$('.content ul').append(
						"<li>" +
						"<span class='time'>" + new Date(list[i].createTime).getFullYear() + '-' + (new Date(list[i].createTime).getMonth()+1) + '-' + new Date(list[i].createTime).getDate() +' '+ new Date(list[i].createTime).getHours()+':'+new Date(list[i].createTime).getMinutes()+"</span>" +
						"<span class='memo'>" + list[i].memo + "</span>" +
						"<span class='myscore'>+" + list[i].score + "</span>" +
						"</li>"
					)
				}
				$(".content ul").append("<p id='more'>加载更多</p>")
			}
		})
}
allscore()
/*点击全部更多*/
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
			url: URL + '/scoreRecord/list?page=' + page + '&pageSize=10&memberId=' + memberId,
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
				var list = data.data.list
				for(var i = 0; i < list.length; i++) {
					$('.content ul').append(
						"<li>" +
						"<span class='time'>" + new Date(list[i].createTime).getFullYear() + '-' + (new Date(list[i].createTime).getMonth()+1) + '-' + new Date(list[i].createTime).getDate() + "</span>" +
						"<span class='memo'>" + list[i].memo + "</span>" +
						"<span class='myscore'>+" + list[i].score + "</span>" +
						"</li>"
					)
				}
			} else {
				var list = data.data.list
				for(var i = 0; i < list.length; i++) {
					$('.spread_list').append(
						"<li>" +
						"<li>" +
						"<span class='time'>" + new Date(list[i].createTime).getFullYear() + '-' + (new Date(list[i].createTime).getMonth()+1) + '-' + new Date(list[i].createTime).getDate() + "</span>" +
						"<span class='memo'>" + list[i].memo + "</span>" +
						"<span class='myscore'>+" + list[i].score + "</span>" +
						"</li>"
					)
				}
				$('.content ul').append("<p id='more'>加载更多</p>")
			}
		})
})

/*点击收入*/
function putinscore() {
	$('.content ul').empty();
	$('.putinscore').css({
		'color': 'rgb(223,25,36)',
		'border-bottom': '2px solid rgb(223,25,36)'
	})
	$('.allscore').css({
		'color': 'black',
		'border': 'none'
	})
	$('.putoutscore').css({
		'color': 'black',
		'border': 'none'
	})
}
/*点击支出*/
function putoutscore() {
	$('.content ul').empty();
	$('.putoutscore').css({
		'color': 'rgb(223,25,36)',
		'border-bottom': '2px solid rgb(223,25,36)'
	})
	$('.allscore').css({
		'color': 'black',
		'border': 'none'
	})
	$('.putinscore').css({
		'color': 'black',
		'border': 'none'
	})
}
/*获取getLocalStorage*/
function getLocalStorage() {
	accessToken = JSON.parse(localStorage.jurisdiction).accessToken
	sessionId = JSON.parse(localStorage.jurisdiction).id
	memberId = JSON.parse(localStorage.jurisdiction).userId
}
/*总积分*/
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
			$('.headertop span').text(data.data.score+' 积分')
		})
}
getinfo()