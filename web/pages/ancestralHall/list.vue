<template>
	<view class="container">
		<navigator v-for="item in ancestralHallList" :url="`../ancestralHall/detail?id=${item.id}`" class="img-view mt-30">
			<image class="img-bg" mode="aspectFill" :src="item.fileList.length>0 ? item.fileList[0].fileUrl :'../../static/jiapu.jpg'"></image>
			<view class="desc-view">
				<view class="img-title">{{ item.name }}</view>
				<view class="img-desc">{{ item.ancestralHallDec }}</view>
			</view>
		</navigator>
		<view v-if="totalNum!==0 && ancestralHallList.length>=totalNum && !loading" class="tc line88 c-grey">
			我是有底线的~
		</view>
		<view v-if="ancestralHallList.length===0 && totalNum===0" class="tc line88 c-grey">
			暂无数据~
		</view>
		<view v-if="loading" class="tc line88 c-grey">
			加载中...
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				ancestralHallList:[],
				loading: true,
				pageSize: 10,
				totalNum: 200,
				currentPage: 1
			}
		},
		computed: {
			...mapState(['clanInfo']),
		},
		methods:{
			loadData() {
				//获取新闻列表
				this.loading = true;
				this.$api.request.getAncestralHallList({
					clanId:this.clanInfo.id,
					pageSize: this.pageSize,
					currentPage: this.currentPage,
					ancestralHallState:0
				}).then(res=>{
					uni.stopPullDownRefresh();
					if(res.code===0){
						if (this.currentPage === 1) {
							this.ancestralHallList = [];
						}
						this.totalNum = res.totalNum;
						this.currentPage++;
						this.ancestralHallList.push(...res.data);
						this.loading = false;
					}
					
					
				})
		
				
			},
		},
		onLoad(){
		},
		onShow() {
			this.currentPage = 1;
			this.loadData();
		},
		//下拉刷新
		onPullDownRefresh() {
			if(this.loading){
				return;
			}
			this.currentPage = 1;
			this.loadData();
		},
		//加载更多
		onReachBottom() {
			if (this.newsList.length >= this.totalNum) {
				return;
			}
			this.loadData();
		},
	}
</script>

<style lang="scss">
	.img-view {
		display: flex;
		width: 100%;
		height: 210upx;
		overflow: hidden;
		position: relative;
		margin-bottom: 30upx;
		line-height: 70upx;
		padding-top: 30upx;
		border-top: $border-color-base solid 1px;
		&:nth-child(1){
			margin-bottom: 0upx;
			padding-top: 0upx;
			border-top: none;
		}
		.img-bg{
			width: 300upx;
			height: 200upx;
			border-radius:10upx;
		}
		.desc-view{
			flex:1;
			width: 100%;
			height: 200upx;
			overflow: hidden;
			padding: 0 20upx;
			.img-title{
				font-size: 36upx;
				font-weight: bold;
			}
			.img-desc{
				margin-top: 10upx;
				line-height: 50upx;
			}
		}
	}
</style>
