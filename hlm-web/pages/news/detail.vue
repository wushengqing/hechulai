<template>
	<view class="container">
		<view class="title">{{detailVo.mienTitle }}</view>
		<view class="sub-title">
			<text class="label">来源：</text>
			<text class="value">{{ detailVo.mienResource || '本站'}}</text>
			<text class="label">发布时间：</text>
			<text class="value">{{ detailVo.createTime}}</text>
		</view>
		<view class="content" v-html="detailVo.mienContent" >
			
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/parse.vue'
	export default{
		data() {
			return {
				id:'',
				detailVo:{},
				noData: '<p style="text-align:center;color:#666">加载中...</p>',
			};
		},
		components: {
			uParse	
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
		font-size: $font-lg;
		line-height: 65upx;
		font-weight: bold;
	}
	.sub-title{
		margin-top: 15upx;
		font-size: 32upx;
		.label{
			color:$font-color-light;
		}
		.value{
			margin-right: 30upx;
		}
	}
	.content{
		margin-top: 20upx;
		font-size: 30upx!important;
		line-height: 200%;
	}
</style>
