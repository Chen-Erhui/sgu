/*限制使用微信浏览器*/
var useragent = navigator.userAgent;
if(useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
	// 这里警告框会阻塞当前页面继续加载  
	alert('请使用微信浏览器打开本页面！');
	// 以下代码是用javascript强行关闭当前页面  
	var opened = window.open('about:blank', '_self');
	opened.opener = null;
	opened.close();
}
var URL = 'http://api-dev.sgu6.com'
/*进到map页面，检查URL里面是否带有session数据*/
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return unescape(r[2]);
	}
	return null;
}
if(getQueryString('session')) {
	localStorage.jurisdiction = getQueryString('session')
}

function initMap() {
	createMap(); //创建地图
	setMapEvent(); //设置地图事件
	addMapControl(); //向地图添加控件
	//    addMapOverlay();//向地图添加覆盖物
	getpoints();
}

function getpoints() {
	axios.get(URL + '/machine/list?page=1&pageSize=10000')
		.then(function(data) {
			addMarker(data.data.list);
		})
}

function addMarker(points) {
	//循环建立标注点
	for(var i = 0, pointsLen = points.length; i < pointsLen; i++) {
		var point = new BMap.Point(points[i].lng, points[i].lat); //将标注点转化成地图上的点
		var marker = new BMap.Marker(point); //将点转化成标注点
		map.addOverlay(marker); //将标注点添加到地图上
	}
}
function createMap() {
	map = new BMap.Map("map");
	map.centerAndZoom(new BMap.Point(113.943142, 22.52943), 18);
//	var point = new BMap.Point(a, b);
//	map.centerAndZoom(point, 15);
	/*进入地图自动获取位置，有Bug,每次提示获取地位权限*/
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r) {
		if(this.getStatus() == BMAP_STATUS_SUCCESS) {
			map.centerAndZoom(new BMap.Point(r.point.lng, r.point.lat), 18);
		} else {}
	});

}

function setMapEvent() {
	map.enableScrollWheelZoom();
	map.enableKeyboard();
	map.enableDragging();
	map.enableDoubleClickZoom()
}

function addClickHandler(target, window) {
	target.addEventListener("click", function() {
		target.openInfoWindow(window);
	});
}

function addMapOverlay() {
	var markers = [{
			content: "",
			title: "拾谷鸟科技有限公司",
			imageOffset: {
				width: 0,
				height: -21
			},
			position: {
				lat: 22.52943,
				lng: 113.943142
			}
		},
		{
			content: "",
			title: "拾谷鸟科技2号机器",
			imageOffset: {
				width: 0,
				height: -21
			},
			position: {
				lat: 22.52961,
				lng: 113.943942
			}
		}
	];
	for(var index = 0; index < markers.length; index++) {
		var point = new BMap.Point(markers[index].position.lng, markers[index].position.lat);
		var marker = new BMap.Marker(point, {
			icon: new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png", new BMap.Size(20, 25), {
				imageOffset: new BMap.Size(markers[index].imageOffset.width, markers[index].imageOffset.height)
			})
		});
		var label = new BMap.Label(markers[index].title, {
			offset: new BMap.Size(25, 5)
		});
		var opts = {
			width: 200,
			title: markers[index].title,
			enableMessage: false
		};
		var infoWindow = new BMap.InfoWindow(markers[index].content, opts);
		//      marker.setLabel(label);
		addClickHandler(marker, infoWindow);
		map.addOverlay(marker);
	};
}
//向地图添加控件
function addMapControl() {
	var scaleControl = new BMap.ScaleControl({
		anchor: BMAP_ANCHOR_BOTTOM_LEFT
	});
	scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
	//    map.addControl(scaleControl);
	var navControl = new BMap.NavigationControl({
		anchor: BMAP_ANCHOR_TOP_LEFT,
		type: BMAP_NAVIGATION_CONTROL_LARGE
	});
	map.addControl(navControl);
	//	    var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});
	//	    map.addControl(overviewControl);
	map.addControl(new BMap.GeolocationControl());
}
var map;
initMap();

/*获取微信需要的参数*/

$(document).ready(function() {
	axios.post('http://api-dev.sgu6.com/wx/signature', {
			"appId": "wxd5e5c08b15f5c588",
			"verifyCode": "shiguniao3",
			"url": location.href.split('#')[0]
		})
		.then(function(data) {
			appId = data.data.appId;
			timestamp = data.data.timestamp;
			nonceStr = data.data.nonceStr;
			signature = data.data.signature;
			wx.config({
				debug: false,
				appId: appId,
				timestamp: timestamp,
				nonceStr: nonceStr,
				signature: signature,
				jsApiList: ['checkJsApi', 'scanQRCode']
			})
			wx.error(function(res) {
				alert("出错了：" + res.errMsg); //这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
			})
		})
})
/*点击扫码*/
function scanQRCode() {
	wx.scanQRCode({
		needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
		scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
		success: function(res) {
			var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
			window.location.href = result; //因为我这边是扫描后有个链接，然后跳转到该页面
		}
	});
}
/*点击附近按钮*/
function li_loc() {
	$(".location").addClass("active")
	$(".distribution,.mall,.me").removeClass("active")
	$('.li_mall,.li_me,.li_dist').css({
		"color": "rgb(159,159,159)"
	})
	$('.li_loc').css({
		"color": "#d81e06"
	})
	$('.nearby').css({
		"display": "block"
	})
	$(".mall_all,.dist_all,.me_all").removeClass("active")
	$(".nearby").addClass("active")
}
/*点击商城按钮*/
function li_mall() {
	$(".mall").addClass("active")
	$(".distribution,.location,.me").removeClass("active")
	$('.li_dist,.li_me,.li_loc').css({
		"color": "rgb(159,159,159)"
	})
	$('.li_mall').css({
		"color": "#d81e06"
	})
	$('.nearby').css({
		"display": "none"
	})
	$(".nearby,.dist_all,.me_all").removeClass("active")
	$(".mall_all").addClass("active")
	var iframe = document.createElement('iframe');
	iframe.src = "sgumall.html";
	$('.mall_all').append(iframe);
	$('.mall_all iframe').css({
		'width': '100%',
		'height': '100%'
	})
}
/*点击分销按钮*/
function li_dist() {
	/*if(localStorage.jurisdiction==''||JSON.parse(localStorage.jurisdiction).phone==undefined){
		window.location.href = 'phone.html'
	}else{*/
	$(".distribution").addClass("active")
	$(".mall,.location,.me").removeClass("active")
	$('.li_mall,.li_me,.li_loc').css({
		"color": "rgb(159,159,159)"
	})
	$('.li_dist').css({
		"color": "#d81e06"
	})
	$('.nearby').css({
		"display": "none"
	})
	$(".nearby,.mall_all,.me_all").removeClass("active")
	$(".dist_all").addClass("active")
	var iframe = document.createElement('iframe');
	iframe.src = "dist.html";
	$('.dist_all').append(iframe);
	$('.dist_all iframe').css({
		'width': '100%',
		'height': '100%'
	})
	/*}*/
}
/*点击我的*/
function li_me() {
	/*if(localStorage.jurisdiction==''||JSON.parse(localStorage.jurisdiction).phone==undefined){
		window.location.href = 'phone.html'
	}else{*/
	$(".me").addClass("active")
	$(".mall,.location,.distribution").removeClass("active")
	$('.li_mall,.li_dist,.li_loc').css({
		"color": "rgb(159,159,159)"
	})
	$('.li_me').css({
		"color": "#d81e06"
	})
	$('.nearby').css({
		"display": "none"
	})
	$(".nearby,.dist_all,.mall_all").removeClass("active")
	$(".me_all").addClass("active")
	var iframe = document.createElement('iframe');
	iframe.src = "my.html";
	$('.me_all').append(iframe);
	$('.me_all iframe').css({
		'width': '100%',
		'height': '100%'
	})
	/*}*/
}
/*reload*/
function reloader() {
	window.location.reload()
}
