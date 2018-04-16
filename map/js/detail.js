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
/*从URL获取参数*/
var URL='http://rest-api.sgu6.com'
function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
// 调用方法
var id=JSON.parse(localStorage.products_list)[GetQueryString("num")].id
$.ajax({
	type:"get",
	url:URL+"/goods/simple/"+id,
	async:true,
	success:function(data){
		$('.pro_price').text("￥"+data.price)
		$('.pro_name').text("拾谷鸟"+data.name+"500g")
		$('.introduce h4').text("拾谷鸟"+data.name)
		$('.img').css("background-image","url("+data.photo[0].imgUrl+")");
		$('.introduce p').text(data.shortContent)
	}
});
