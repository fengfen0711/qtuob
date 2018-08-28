export default{
    noShare:function(){
        var vm = this;
		if(typeof WeixinJSBridge == "undefined") { //微信浏览器内置对象。参考微信官方文档
			if(document.addEventListener) {
				document.addEventListener('WeixinJSBridgeReady', function(){
					WeixinJSBridge.call('hideOptionMenu');
				}, false);
			} else if(document.attachEvent) {
				document.attachEvent('WeixinJSBridgeReady', function(){
					WeixinJSBridge.call('hideOptionMenu');
				});
				document.attachEvent('onWeixinJSBridgeReady', function(){
					WeixinJSBridge.call('hideOptionMenu');
				});
			}
		} else {
			WeixinJSBridge.call('hideOptionMenu');
		}
   	},
   	login:function(){
		
   	},
}