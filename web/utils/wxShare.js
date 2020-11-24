var wx = require('./jweixin-module')
		//获取微信公众号的配置
		// uni.request({
		
		// 	url: 'xxxxxxxxxxx',
		// 	dataType: 'text',
		// 	data: {
		// 		url: window.location.href.split('#')[0]
		// 	},
		// 	success: res => {
					let s = {
						data:{
							appId:'111',
							timestamp:'timestamp',
							nonceStr:'nonceStr',
							signature:'signature'
						}
					}
					 wx.config({
						 debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						 appId: s.data.appId, // 必填，公众号的唯一标识
						 timestamp: s.data.timestamp, // 必填，生成签名的时间戳
						 nonceStr: s.data.nonceStr, // 必填，生成签名的随机串
						 signature: s.data.signature.toLowerCase(), // 必填，签名，见附录1
						 jsApiList: []
					});	
					
					let shareVo = {
						title:'何处来族谱',
						desc:'全球第一部在线族谱',
						link:'https://www.hclzz.com/web/',
						imgUrl:'',
						success(){
							
						}
					}
					
					wx.ready(function () {
						wx.updateAppMessageShareData(shareVo);
						wx.updateTimelineShareData(shareVo)
					});
	// 		},
	// 		fail: err => {
	// 			console.log('request fail', err);
	// 		}
	// });	