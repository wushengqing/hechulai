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
		async onLoad(){
			try {
			    uni.removeStorageSync('clanInfoDnsName');
				this.$api.msg(`清除成功！`);
				setTimeout(()=>{
					location.href ="/hlm-web";
				},1000)
			} catch (e) {
			    // error
			}
			
		},
	}
</script>

<style>

</style>
