<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onLoad(options) {
			let [wx_code,wx_state] = [options.code,options.state];
			uni.setStorageSync('wxInfo',{wx_code,wx_state});
			//微信授权登录
			this.$api.request.getOAuth({
				code:wx_code,
				state:wx_state
			}).then(res=>{
				console.log(res);
				alert(wx_code);
				alert(wx_state);
			})
			uni.reLaunch({
				url: '/pages/index/index'
			});
		},
	}
</script>

<style>

</style>
