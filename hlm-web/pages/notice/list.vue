<template>
	<view class="content">
		<view class="notice-list">
			<navigator class="notice-item" v-for="item in noticeList" :url="`../notice/detail?id=${item.id}`">
				<view class="notice-text">
					<view class="title">{{ item.mienTitle}}</view>
					<view class="desc"> </view>
					<view class="user">{{ item.mienResource}}<text>{{item.updateTime}}</text></view>
				</view>
			</navigator>
			<view v-if="totalNum!==0 && !loading && noticeList.length>=totalNum" class="tc line88 c-grey">
				我是有底线的~
			</view>
			<view v-if="noticeList.length===0 && totalNum===0" class="tc line88 c-grey">
				暂无数据~
			</view>
			<view v-if="loading" class="tc line88 c-grey">
				加载中...
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		components: {
		},
		computed: {
			...mapState(['clanInfo']),
		},
		data() {
			return {
				loading:true,
				noticeList:[],
				pageSize:10,
				totalNum:200,
				currentPage:1
			};
		},
		
		onLoad(options) {
		
		},
		onShow() {
			this.currentPage = 1;
			this.loadData();
		},
		//下拉刷新
		onPullDownRefresh() {
			this.currentPage = 1;
			this.loadData();
		},
		//加载更多
		onReachBottom() {
			if (this.noticeList.length >= this.totalNum) {
				return;
			}
			this.loadData();
		},
		methods: {
			async loadData() {
				//获取新闻列表
				this.loading = true;
				const noticeList = await this.$api.request.noticeList({
					clanId: this.clanInfo.id,
					pageSize: this.pageSize,
					currentPage: this.currentPage
				});
				this.totalNum = noticeList.totalNum
				if (this.currentPage === 1) {
					this.noticeList = [];
				}
				this.currentPage++;
				this.noticeList.push(...noticeList.data);
				uni.stopPullDownRefresh();
				this.loading = false;
			},
			//详情
			navToDetailPage(item) {
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
					font-size: $font-base;
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
