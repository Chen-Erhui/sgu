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
var mydata = [
	/*{
		'name': '张三',
		'phone': '13167783938',
		'province': '广东省',
		'city': '深圳市',
		'area': '南山区',
		'action': true
	},
	{
		'name': '李四',
		'phone': '13167783938',
		'province': '广东省',
		'city': '深圳市',
		'area': '南山区',
		'action': false
	},
	{
		'name': '王五',
		'phone': '13167783938',
		'province': '广东省',
		'city': '深圳市',
		'area': '南山区',
		'action': false
	},*/
]

function addresslist() {
	for(var i = 0; i < mydata.length; i++) {
		console.log(mydata[i])
		$('.address_list').append("<li>" + "<p>" + mydata[i].name + mydata[i].phone + "</p>" + "<p>" + mydata[i].province + mydata[i].city + mydata[i].area + "</p>" +"<span>点击修改"+"</span>"+ "</li>");
	}
}
addresslist()
