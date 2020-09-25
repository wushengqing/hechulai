<template>
	<view class="content">
		<view class="notice-list">
			<navigator class="notice-item" v-for="item in newsList" :url="`../news/detail?id=${item.id}`">
				<view class="notice-text">
					<view class="title">{{ item.mienTitle}}</view>
					<view class="desc"> </view>
					<view class="user">{{ item.mienResource}}<text>{{item.updateTime}}</text></view>
				</view>
			</navigator>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore	
		},
		computed: {
			...mapState(['clanInfo']),
		},
		data() {
			return {
				loadingType:false,
				newsList:[],
				pageSize:10,
				currentPage:0,
			};
		},
		
		onLoad(options){
			
		},
		onShow(){
			this.loadData('refresh');
		},
		//下拉刷新
		onPullDownRefresh(){
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom(){
			this.loadData();
		},
		methods: {
			async loadData(type='add', loading){
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
					
				//获取新闻列表
				const newsList = await this.$api.request.newsList({
					clanId:this.clanInfo.id,
					pageSize:this.pageSize,
					currentPage:this.currentPage
				});
				this.currentPage++;
				if(type === 'refresh'){
					this.newsList = [];
					this.currentPage=0;
				}
				this.newsList.push(...newsList);
				this.loadingType  = this.newsList.length > 20 ? 'nomore' : 'more';
				if(type === 'refresh'){
					if(loading == 1){
						uni.hideLoading()
					}else{
						uni.stopPullDownRefresh();
					}
				}
			},
			// async loadData(type='add', loading) {
			// 	//没有更多直接返回
			// 	if(type === 'add'){
			// 		if(this.loadingType === 'nomore'){
			// 			return;
			// 		}
			// 		this.loadingType = 'loading';
			// 	}else{
			// 		this.loadingType = 'more'
			// 	}
				
			// 	let goodsList = await this.$api.json('goodsList');
			// 	if(type === 'refresh'){
			// 		this.goodsList = [];
			// 	}
			// 	//筛选，测试数据直接前端筛选了
			// 	if(this.filterIndex === 1){
			// 		goodsList.sort((a,b)=>b.sales - a.sales)
			// 	}
			// 	if(this.filterIndex === 2){
			// 		goodsList.sort((a,b)=>{
			// 			if(this.priceOrder == 1){
			// 				return a.price - b.price;
			// 			}
			// 			return b.price - a.price;
			// 		})
			// 	}
				
			// 	this.goodsList = this.goodsList.concat(goodsList);
				
			// 	//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
			// 	this.loadingType  = this.goodsList.length > 20 ? 'nomore' : 'more';
			// 	if(type === 'refresh'){
			// 		if(loading == 1){
			// 			uni.hideLoading()
			// 		}else{
			// 			uni.stopPullDownRefresh();
			// 		}
			// 	}
			// },
			//详情
			navToDetailPage(item){
				//测试数据没有写id，用title代替
				let id = item.title;
				uni.navigateTo({
					url: `/pages/notice/detail?id=${id}`
				})
			},
		
		},
	}
</script>

<style lang="scss">
	.notice-list {
		padding: 20rpx;
		.notice-item {
			line-height: 50rpx;
			overflow: hidden;
			margin-bottom: 10rpx;
			padding: 20rpx 0;
			border-bottom: #ccc solid 1rpx;
	
			.notice-text {
				.title {
					font-weight: bold;
					font-size: 30rpx;
					color: #000;
				}
	
				.desc {
					height:30rpx;
					overflow: hidden;
					font-size: 25rpx;
					line-height: 30rpx;
					color: #999;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.user{
					font-size: 25rpx;
					line-height: 30rpx;
					color: #BE4431;
					text{
						
						color: #666;
					}
				}
			}
	
			.image-box {
				width: 160upx;
				height: 100upx;
				float: right;
	
				.image {
					width: 100%;
					height: 100%;
					display: inline-block;
				}
			}
		}
	}
</style>
