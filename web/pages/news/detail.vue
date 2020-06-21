<template>
	<view class="container">
		文章详情页面<>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				id:'',
				detailVo:{}
			};
		},
		methods: {
			async loadData() {
				//获取轮播图
				const detailVo = await this.$api.request.newsDetail({id:this.id});
				this.detailVo = detailVo.data;
		
			},
		},
		computed: {
		
			
		},
		async onLoad(options){
			this.id = options.id;
			if(this.id){
				this.loadData();
			}
			
		},

	}
</script>

<style lang='scss'>
	
</style>
