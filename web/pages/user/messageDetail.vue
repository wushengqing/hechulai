<template>
	<view class="container">
		<view class="title" v-if="detailVo.messageType===1">绑定宗亲</view>
		<view class="title" v-if="detailVo.messageType===2">添加家庭成员</view>
		<view class="title" v-if="detailVo.messageType===3">宗亲乐捐消息</view>
		<view class="title" v-if="detailVo.messageType===4">宗亲反馈消息</view>
		<view class="title" v-if="detailVo.messageType===5">发布宗圈文章</view>
		<view class="title" v-if="detailVo.messageType===6">新丁消息</view>
		<view class="title" v-if="detailVo.messageType===7">逝世消息</view>
		<view class="title" v-if="detailVo.messageType===8">关注宗族圈</view>
		<view class="sub-title">
			<text class="label">发起时间：</text>
			<text class="value">{{ detailVo.createTime}}</text>
		</view>
		<view class="content">
			<u-parse :content="detailVo.messageContent" :noData="noData"></u-parse>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/parse.vue'
	export default{
		data() {
			return {
				id:'',
				clanId:'',
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
				const detailVo = await this.$api.request.getMsgInfo({
					clanId:this.clanId,
					id:this.id,
					});
				this.detailVo = detailVo;
			},
		},
		computed: {
		
			
		},
		async onLoad(options){
			this.id = options.id;
			this.clanId = options.clanId;
			if(this.id){
				this.loadData();
			}
			
		},

	}
</script>

<style lang='scss' scoped>
	.title{
		line-height: 65upx;
		font-weight: bold;
	}
	.sub-title{
		margin-top: 15upx;
		font-size: $font-base;
		.label{
			color:$font-color-light;
		}
		.value{
			margin-right: 30upx;
		}
	}
	.content{
		margin-top: 20upx;
		font-size: $font-base;
		line-height: 200%;
	}
</style>
