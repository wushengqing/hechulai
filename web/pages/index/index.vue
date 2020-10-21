<template>
	<view class="container">
		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<view class="mp-search-box">
			<input class="ser-input" type="text" value="输入关键字搜索" disabled />
		</view>
		<!-- #endif -->

		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 背景色区域 -->
			<view class="titleNview-background" :style="{backgroundColor:titleNViewBackground}"></view>
			<swiper class="carousel" circular @change="swiperChange">
				<swiper-item v-for="(item, index) in bannerList" :key="index" class="carousel-item" @click="navToDetailPage(item)">
					<image mode="aspectFill" :src="item.mienImageUrl" />
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">
				<text class="num">{{swiperCurrent+1}}</text>
				<text class="sign">/</text>
				<text class="num">{{swiperLength}}</text>
			</view>
		</view>
		<!-- 快速导航 -->
		<view class="cate-section">
			<navigator url="../lineage/lineage" class="cate-item">
				<image src="/static/index/p4.png"></image>
				<text>世系表</text>
			</navigator>
			<navigator url="../ancestralHall/list" class="cate-item">
				<image src="/static/index/p1.png"></image>
				<text>宗祠/祖坟</text>
			</navigator>
			<navigator url="../organization/organization" class="cate-item">
				<image src="/static/index/p2.png"></image>
				<text>族委会</text>
			</navigator>
			<navigator url="../contribution/list" class="cate-item">
				<image src="/static/index/p3.png"></image>
				<text>乐捐榜</text>
			</navigator>

		</view>
		<!-- 通知公告 -->
		<view class="new-box flex" v-if="noticeList.length>0" >
			<navigator url="/pages/notice/list" class="icon-notice-box">
				<image src="/static/index/notice.png"></image>
			</navigator>
			<view class="notice-box" >
				<navigator  :url="`/pages/notice/detail?id=${notice.id}`"  class="notice-item" v-for="notice in noticeList">
					<text class="title">{{ notice.mienTitle }}</text>
					<text class="date">{{ notice.updateTime }}</text>
				</navigator>
			</view>
			<view class="iconfont icon-arrow-right font40"></view>
		</view>
		<!--祖训-->
		<view class="teachings " v-if="clanInfo.clanFileUrl">
			<view class="title1 ml-20 line88">祖训</view>
			<view class="ml-20 mr-20">
				<image class="teachings-img" :src="clanInfo.clanFileUrl"></image>
			</view>
		</view>
		<view class="title1 ml-20 mt30">字辈</view>
		<view class="box-1">
			<view class="box-inside">
				<view>{{ clanInfo.dec}}</view>
			</view>
		</view>
		<!--新闻资讯-->
		<view class="title1 ml-20 mr-20 mt30">新闻资讯<navigator url="../news/list"  class="more">查看更多</navigator></view>
		<view class="news-list">
			<navigator class="news-item" v-for="item in newsList" :url="`../news/detail?id=${item.id}`">
				<view class="news-text">
					<view class="title">{{ item.mienTitle}}</view>
					<view class="desc"> </view>
					<view class="user">{{ item.mienResource}}<text>{{item.updateTime}}</text></view>
				</view>
				<view class="image-box">
					<image mode="aspectFill" class="image" :src="item.mienImageUrl?item.mienImageUrl:defaultNewsImg"></image>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	export default {

		data() {
			return {
				bannerList:[],
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				defaultNewsImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587491350036&di=2701ed07ded49eb9b0f3eca8ce97ec3a&imgtype=0&src=http%3A%2F%2Ffile02.sg560.com%2Fupimg02%2F2014%2F12%2F02%2F14100212868875.jpg',
				newsList: [
				],
				noticeList: [
				],
			};
		},
		computed: {
			...mapState(['clanInfo','userInfo']),
		},
		async onLoad(opctions) {
			console.log(opctions);
			if(this.clanInfo.id){
				this.loadData();
				return
			}
			//获取clanInfo
			const unionList = await this.$api.request.getClanList();
			const dnsList = await this.$api.request.getDnsList();
			let dnsName = window.location.origin + '/web';
			let clan = dnsList.filter(item => item.dnsName === dnsName);
			let clanId = '';
			if (clan && clan.length === 1) {
				clanId = clan[0].clanId
			};
			if (clanId) {
				this.setClanInfo(unionList.filter(item => item.id === clanId)[0]);
				if(opctions.redirect_uri){
					uni.navigateTo({
						url: opctions.redirect_uri
					});
				}
			} else{
				uni.navigateTo({
					url: `/pages/union/union`
				});
			}
			this.loadData();
		},
		onShow(){
			if(this.userInfo.userId){
				this.$api.request.getUserInfo({id:this.userInfo.userId}).then(res=>{
					this.login(res.data);
				})
			}
		},
		methods: {
			...mapMutations(['setClanInfo', 'login']),
			async loadData() {
				if(!this.clanInfo.id){
					return
				}
				//获取轮播图
				let par = {
					clanId:this.clanInfo.id,
				};
				//设置
				uni.setNavigationBarTitle({
				    title: this.clanInfo.name ||'何处来'
				});
				const bannerList = await this.$api.request.bannerList(par);
				//获取新闻列表
				const newsList = await this.$api.request.newsList({
					...par,
					pageSize:4,
					currentPage:0
				});
				const noticeList = await this.$api.request.noticeList({
					...par,
					pageSize:2,
					currentPage:1
				});
				this.bannerList = bannerList;
				this.swiperLength = this.bannerList.length;
				this.newsList = newsList.data;
				this.noticeList = noticeList.data;
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				//this.titleNViewBackground = this.bannerList[index].mienBgColor;
			},
			//详情页
			navToDetailPage(item) {
				if(item.isSkip){
					window.open(item.linkUrl);
					return false
				}
				let id = item.id;
				uni.navigateTo({
					url: `/pages/news/detail?id=${id}`
				})
			},
		},
		// #ifndef MP
		// 标题栏input搜索框点击
		onNavigationBarSearchInputClicked: async function(e) {
			this.$api.msg('点击了搜索框');
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		}
		// #endif
	}
</script>

<style lang="scss">
	.container{
		padding: 0;
	}
	/* #ifdef MP */
	.mp-search-box {
		position: absolute;
		left: 0;
		top: 30upx;
		z-index: 9999;
		width: 100%;
		padding: 0 80upx;

		.ser-input {
			flex: 1;
			height: 56upx;
			line-height: 56upx;
			text-align: center;
			font-size: 28upx;
			color: $font-color-base;
			border-radius: 20px;
			background: rgba(255, 255, 255, .6);
		}
	}

	page {
		.cate-section {
			position: relative;
			z-index: 5;
			border-radius: 16upx 16upx 0 0;
			margin-top: -20upx;
		}

		.carousel-section {
			padding: 0;

			.titleNview-placing {
				padding-top: 0;
				height: 0;
			}

			.carousel {
				.carousel-item {
					padding: 0;
				}
			}

			.swiper-dots {
				left: 45upx;
				bottom: 40upx;
			}
		}
	}

	/* #endif */


	.m-t {
		margin-top: 16upx;
	}


	/* 分类 */
	.cate-section {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		padding: 30upx 22upx;
		background: #fff;

		.cate-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
		}

		/* 原图标颜色太深,不想改图了,所以加了透明度 */
		image {
			width: 88upx;
			height: 88upx;
			margin-bottom: 14upx;
			border-radius: 50%;
			opacity: .7;
		}
	}

	/*通知公告*/
	.new-box {
		margin-top: 10upx;
		background: #f5f5f5;
		margin: 10upx;
		border-radius: 5upx;
		display: flex;
		.icon-notice-box {
			width: 15%;
			line-height: 100upx;
			text-align: center;
			image {
				margin-top: 30upx;
				display: inline-block;
				width: 65upx;
				height: 53upx;
			}
		}

		.notice-box {
			margin-top: 15upx;
			flex: 1;
			height: 100upx;
			overflow: hidden;
			.nodata{
				line-height: 100upx;
			}
			.notice-item {
				height: 50upx;
				line-height: 50upx;
				overflow: hidden;
				display: flex;
				.title {
					flex: 1;
					display: inline-block;
					height: 50upx;
					vertical-align: middle;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.date {
					color: #666;
					margin-left: 20upx;
					width:160upx;
					height: 50upx;
					display: inline-block;
					vertical-align: middle;
				}
			}
		}

		.icon-arrow-right {
			margin-top: 30upx;
		}

	}

	/*祖训*/
	.teachings{
		
		.teachings-img{
			width: 100%;
			height: 300upx;
		}
	}
	
	.box-1 {
		width: 95%;
		margin: 20upx auto;
		overflow: hidden;
		
		background: #fff;
		padding:20upx ;
		border: #BE4431 solid 2upx;
		border-radius: 6upx;
		.box-inside {
			line-height: 45upx;
			overflow: hidden;
			font-size: 30upx;
			width: 100%;
		}
	}

	.news-list {
		padding: 20upx;

		.news-item {
			line-height: 50upx;
			overflow: hidden;
			margin-bottom: 10upx;
			padding: 20upx 0;
			border-bottom: #ccc solid 1upx;

			.news-text {
				width: 520upx;
				height: 100upx;
				float: left;
				.title {
					
					height: 50upx;
					overflow: hidden;
					font-size: 28upx;
					color: #000;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.desc {
					height:30upx;
					overflow: hidden;
					font-size: 25upx;
					line-height: 30upx;
					color: #999;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.user{
					font-size: 25upx;
					line-height: 30upx;
					color: #BE4431;
					text{
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
