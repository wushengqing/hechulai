const baseUrl = 'https://www.hclzz.com/hclzp-web/web/'
var wx = require('./jweixin-module')
		//获取微信公众号的配置
		uni.request({
			url:baseUrl+'getconfig.json',
			dataType: 'text',
			method: 'POST',
			data: {
				url:location.origin + '/hlm-web/'
			},
			success: res => {
					 data = JSON.parse(res.data);
					 wx.config({
						 debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						 appId: data.appId, // 必填，公众号的唯一标识
						 timestamp: data.timestamp, // 必填，生成签名的时间戳
						 nonceStr: data.nonceStr, // 必填，生成签名的随机串
						 signature: data.signature.toLowerCase(), // 必填，签名，见附录1
						 jsApiList: ['onMenuShareAppMessage',]
					});	
					
					let shareVo = {
						title:'何处来族谱',
						link:location.origin + '/hlm-web/',
						imgUrl:'http://photo-project-jcy.oss-cn-shenzhen.aliyuncs.com/hcl/1f939839-5f58-41b2-8f3b-f8c77c6f9cd5.jpg',
						success(){
							
						}
					}
					
					wx.ready(function () {
						wx.onMenuShareAppMessage({
							...shareVo,
							desc:'传承宗族文化，发扬民族精神',
						});
						//wx.updateTimelineShareData(shareVo)
					});
			},
			fail: err => {
				console.log('request fail', err);
			}
	});	