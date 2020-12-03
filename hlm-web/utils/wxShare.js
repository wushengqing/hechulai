const baseUrl = 'https://www.hclzz.com/hclzp-web/web/'
var wx = require('./jweixin-module')
		//获取微信公众号的配置
		uni.request({
			url:baseUrl+'getconfig',
			dataType: 'text',
			method: 'POST',
			data: {
				url: 'https://www.hclzz.com/web/#/'
			},
			success: res => {
					 wx.config({
						 debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						 appId: res.data.appId, // 必填，公众号的唯一标识
						 timestamp: res.data.timestamp, // 必填，生成签名的时间戳
						 nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
						 signature: res.data.signature.toLowerCase(), // 必填，签名，见附录1
						 jsApiList: []
					});	
					
					let shareVo = {
						title:'何处来族谱',
						desc:'全球第一部在线族谱',
						link:'https://www.hclzz.com/hlm-web/',
						imgUrl:'',
						success(){
							
						}
					}
					
					wx.ready(function () {
						wx.updateAppMessageShareData(shareVo);
						wx.updateTimelineShareData(shareVo)
					});
			},
			fail: err => {
				console.log('request fail', err);
			}
	});	