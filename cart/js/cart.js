$(document).ready(function(){
  var configUrl='http://api-dev.sgu6.com'
	/*查询浏览器是微信还是支付宝*/
  if(navigator.userAgent.indexOf('MicroMessenger')>=0){
		$(".wx_pay").css('display','block')
		$(".alipay").css('display','none')
  }
  /*解析URL参数*/
  function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  }
  var machineNo= GetQueryString("machineNo");
  var goodsId= GetQueryString("goodsId");
  var goodsNum= GetQueryString("goodsNum");
  var orderNo= GetQueryString("orderNo");
  $.ajax({
  	type:"get",
  	url:configUrl+'/goods/simple/'+goodsId,
  	async:false,
  	success:function(data){
  	  var allmoney='￥'+(data.price)*goodsNum
  	  var midetail=data.title+goodsNum+'包'+goodsNum*500+'g'
  	  $('.money').html(allmoney)
  	  $('.mitype').html(midetail)
  	}
  });
  /*微信支付*/
  $('.wx_pay').click(function(){
  	if(typeof localStorage.jurisdiction!="undefined"){
 				if(localStorage.jurisdiction==''){
   				window.location.href=configUrl+'/pay?params='+orderNo+','+machineNo+','+goodsId+','+goodsNum+','+'2'+','+''
 				}else{
   				window.location.href=configUrl+'/pay?params='+orderNo+','+machineNo+','+goodsId+','+goodsNum+','+'2'+','+JSON.parse(localStorage.jurisdiction).userId
 				}
  	}else{
				window.location.href=configUrl+'/pay?params='+orderNo+','+machineNo+','+goodsId+','+goodsNum+','+'2'+','+''
  	}
  })
  /*支付宝支付*/
  $('.alipay').click(function(){
  	if(typeof localStorage.jurisdiction!="undefined"){
 				if(localStorage.jurisdiction==''){
   				window.location.href=configUrl+'/pay?params='+orderNo+','+machineNo+','+goodsId+','+goodsNum+','+'3'+','+''
 				}else{
   				window.location.href=configUrl+'/pay?params='+orderNo+','+machineNo+','+goodsId+','+goodsNum+','+'3'+','+JSON.parse(localStorage.jurisdiction).userId
 				}
  	}else{
				window.location.href=configUrl+'/pay?params='+orderNo+','+machineNo+','+goodsId+','+goodsNum+','+'3'+','+''
  	}
  })
  
  var checked=0;
  var integral=0;
  $('.weui-switch-cp__input').click(function(){
  	checked++;
  	event.stopPropagation()
  	
  })
  /*积分支付*/
//var memberId=JSON.parse(localStorage.jurisdiction).userId;
  $('.integral_pay').click(function(){
    if(checked%2!=0){
  	  if(integral==0){
  	  	alert("您的积分不足！")
  	  }else{
  	  	window.location.href=configUrl+'/pay?params='+orderNo+','+machineNo+','+goodsId+','+goodsNum+','+'1'+','+memberId
  	  }
  	}else{
  	  alert('请打开积分支付按钮')
  	}	
  })
});
