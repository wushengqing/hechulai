<template>
	<view class="content">
		<view class="news-list">
			<navigator class="news-item" v-for="item in newsList" :url="`../news/detail?id=${item.id}`">
				<view class="news-text">
					<view class="title">{{ item.mienTitle}}</view>
					<view class="desc"> </view>
					<view class="user">{{ item.mienResource}}<text>{{item.createTime}}</text></view>
				</view>
				<view class="image-box">
					<image mode="aspectFill" class="image" :src="item.mienImageUrl?item.mienImageUrl:'../../static/errorImage.jpg'"></image>
				</view>
			</navigator>
			<view v-if="totalNum!==0 && !loading && newsList.length>=totalNum" class="tc line88 c-grey">
				我是有底线的~
			</view>
			<view v-if="newsList.length===0 && totalNum===0" class="tc line88 c-grey">
				暂无数据~
			</view>
			<view v-if="loading" class="tc line88 c-grey">
				加载中...
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		components: {

		},
		computed: {
			...mapState(['clanInfo']),
		},
		data() {
			return {
				loading: true,
				newsList: [],
				pageSize: 10,
				totalNum: 200,
				currentPage: 1
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
			if (this.newsList.length >= this.totalNum) {
				return;
			}
			this.loadData();
		},
		methods: {
			async loadData() {
				//获取新闻列表
				this.loading = true;
				const newsListData = await this.$api.request.newsList({
					clanId: this.clanInfo.id,
					pageSize: this.pageSize,
					currentPage: this.currentPage
				});
				this.totalNum = newsListData.totalNum
				if (this.currentPage === 1) {
					this.newsList = [];
				}
				this.currentPage++;
				this.newsList.push(...newsListData.data);
				uni.stopPullDownRefresh();
				this.loading = false;
			},
			//详情
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				let id = item.title;
				uni.navigateTo({
					url: `/pages/news/detail?id=${id}`
				})
			},

		},
	}
</script>

<style lang="scss">
	.news-list {
		padding: 20rpx;

		.news-item {
			line-height: 50rpx;
			overflow: hidden;
			margin-bottom: 10rpx;
			padding: 20rpx 0;
			border-bottom: #ccc solid 1rpx;

			.news-text {
				width: 520upx;
				height: 100upx;
				float: left;

				.title {
					font-weight: bold;
					height: 50rpx;
					overflow: hidden;
					font-size: $font-base;
					color: #000;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.desc {
					height: 30rpx;
					overflow: hidden;
					font-size: 25rpx;
					line-height: 30rpx;
					color: #999;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.user {
					font-size: 25rpx;
					line-height: 30rpx;
					color: #BE4431;

					text {
						float: right;
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
