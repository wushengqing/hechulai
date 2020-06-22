<template>
	<view class="container">
		<view class="title">{{detailVo.mienTitle }}</view>
		<view class="sub-title">
			<text class="label">来源：</text>
			<text class="value">{{ detailVo.mienResource || '本站'}}</text>
			<text class="label">发布时间：</text>
			<text class="value">{{ detailVo.createTime}}</text>
		</view>
		<view class="content" v-html="detailVo.mienContent"></view>
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
				this.detailVo = detailVo;
		
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

<style lang='scss' scoped>
	.title{
		font-size: 30upx;
		line-height: 45upx;
		font-weight: bold;
	}
	.sub-title{
		margin-top: 15upx;
		.label{
			color:$font-color-light;
		}
		.value{
			margin-right: 30upx;
		}
	}
	.content{
		margin-top: 20upx;
		font-size: 28upx!important;
		line-height: 200%;
	}
</style>
