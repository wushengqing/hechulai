<template>
	<view class="container">
		文章详情页面
	</view>
</template>

<script>
	export default{
		data() {
			return {
				
			};
		},
		async onLoad(options){
			let id = options.id;
			if(id){
				this.$api.msg(`点击了${id}`);
			}
			
		},
		methods:{
		
		},

	}
</script>

<style lang='scss'>
	
</style>
