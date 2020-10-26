<template>
	<view>
		<view class="home-pic">
			<view class="home-pic-base">
			</view>
		</view>
		<wyb-noticeBar style="margin-bottom: 10upx;" type="vert" :time="5000" :text="noticeList" url="/pages/notice/list" />
		<view class="container">
			<scroll-view scroll-x>
				<view class="tabs" :style="{width:circleList.length*180+'upx' }">
					<view class="tab" :class="{active:item.id===activeTab}" @tap="changeTab(item.id)" v-for="item in circleList">{{ item.circleName }}</view>
				</view>
			</scroll-view>
			<view class="moments__post" v-for="(post,index) in articleList" :key="index" :id="'post-'+index">
				<view class="post-left">
					<image class="post_header" :src="post.clanManHeadUrl||'../../static/missing-face.png'"></image>
				</view>
				<view class="post_right">
					<view class="post-username">
						{{post.clanManName}}
					</view>
					<view class="circleName">
						#{{ circleName[post.circleId] }}
						<text class="follow ml-20">+关注</text>
					</view>
					<view id="paragraph" class="paragraph">{{post.circleContent}}</view>
					<!-- 相册 -->
					<view class="thumbnails">
						<view :class="post.fileList.length === 1?'my-gallery':'thumbnail'" v-for="(image, index_images) in post.fileList" :key="index_images">
							<image class="gallery_img" lazy-load mode="widthFix" :src="image.fileUrl" :data-src="image.fileUrl" @tap="previewImage(post.fileList,index_images)"></image>
						</view>
					</view>
					<!-- 资料条 -->
					<view class="toolbar">
						<view class="timestamp">{{post.createTime}}</view>
						<view class="like" @tap="like(index)">
							<image :src="post.islike===0?'../../static/quan/islike.png':'../../static/quan/like.png'"></image>
						</view>
						<view class="comment" @tap="comment(index)">
							<image src="../../static/quan/comment.png"></image>
						</view>
					</view>
					<!-- 赞／评论区 -->
					<view class="post-footer">
						<view class="footer_content">
							<image class="liked" src="../../static/quan/liked.png"></image>
							<text class="nickname" v-for="(user,index_like) in post.goodList" :key="index_like">{{user.clanManName}}</text>
						</view>
						<view class="footer_content" v-for="(comment,comment_index) in post.commentList" :key="comment_index" @tap="reply(index,comment_index)">
							<text class="comment-nickname">{{comment.clanManName}}: <text class="comment-content">{{comment.commentContent}}</text></text>
						</view>
					</view>
				</view>
			</view>
			<view v-if="totalNum!==0 && !loading && articleList.length>=totalNum" class="tc line88 c-grey">
				我是有底线的~
			</view>
			<view v-if="!loading && articleList.length===0 && totalNum===0" class="tc line88 c-grey">
				暂无数据~
			</view>
			<view v-if="loading" class="tc line88 c-grey">
				加载中...
			</view>
		</view>
	</view>
</template>

<script>
	import wybNoticeBar from '@/components/wyb-noticeBar/wyb-noticeBar.vue'
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				noticeList: [],
				circleName:[],
				activeTab: 0,
				circleList: [],
				loading: true,
				pageSize: 10,
				totalNum: 200,
				currentPage: 1,
				articleList: [],
			}
		},
		components: {
			wybNoticeBar
		},
		computed: {
			...mapState(['clanInfo']),
		},
		onLoad() {
			this.getData()
		},
		//下拉刷新
		onPullDownRefresh() {
			this.currentPage = 1;
			this.articleList = [];
			this.getData();
		},
		//加载更多
		onReachBottom() {
			if (this.newsList.length >= this.totalNum) {
				return;
			}
			this.loadData();
		},
		methods: {
			changeTab(id) {
				this.activeTab = id;
				this.articleList = [];
				this.totalNum= 200;
				this.currentPage = 1;
				this.loadData();
			},
			async getData() {
				//获取公告列表
				let noticeList = await this.$api.request.noticeList({
					clanId: this.clanInfo.id,
					pageSize: 2,
					currentPage: 1
				});
				this.noticeList = noticeList.data.map(item => {
					return item.mienTitle;
				});
				//获取圈子列表
				this.$api.request.getCircleList({
					clanId: this.clanInfo.id
				}).then(res => {
					res.data.unshift({
						id: 0,
						circleName: '全部'
					});
					this.circleName = {};
					res.data.forEach(item=>{
						this.circleName[item.id] = item.circleName;
					})
					this.circleList = res.data;
					this.loadData();
				})
			},
			previewImage(imageList, image_index) {
				var current = imageList[image_index].fileUrl;
				uni.previewImage({
					current: current,
					urls: imageList.map(item=>{
						return item.fileUrl
					})
				});
			},
			async loadData() {
				//获取新闻列表
				this.loading = true;
				let par = {
					clanId: this.clanInfo.id,
					pageSize: this.pageSize,
					currentPage: this.currentPage
				}
				//如果不是查询全部
				if (this.activeTab !== 0) {
					par.circleId = this.activeTab;
				}

				const articleList = await this.$api.request.getCircleContentList(par);
				this.totalNum = articleList.totalNum
				if (this.currentPage === 1) {
					this.articleList = [];
				}
				this.currentPage++;
				this.articleList.push(...articleList.data);
				uni.stopPullDownRefresh();
				this.loading = false;
			},
			openDialog() {},
			openDetailPage() {},
		}
	}
</script>

<style lang="scss" scoped>
	.home-pic {
		width: 100%;
		/* margin-top: -150upx; */
		position: relative;
		height: 300upx;
		z-index: 5;
		background-image: url('~@/static/jiapu.jpg');
		background-size: cover;
		margin-bottom: 10upx
	}
	.moments__post {
		background: #fff;
		display: block;
		border-bottom: 1px solid #f2eeee;
		padding: 30upx 20upx;
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		&:before {
			content: none;
		}
		.post-left{
			.post_header {
				width: 90upx !important;
				height: 90upx !important;
				border-radius: 10upx;
				margin-top: 8upx;
			}
		}
		
		.post_right {
			font-size: 32upx;
			display: table-cell;
			padding-left: 20upx;
			width: 100%;
			.post-username {
				line-height: 60upx;
				font-size: 32upx;
				font-weight: 600;
				color: $base-color;
			}
			.circleName{
				color:#ec9205;
				line-height: 50upx;
				font-size: 26upx;
				.follow{
					background: #ec9205;
					padding:0 10upx;
					border-radius: 4upx;
					color: #fff;
				}
			}
			.paragraph{
				line-height: 40upx;
				font-size: 26upx;
			}
		}
		.thumbnails {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			.thumbnail {
				width: 30%;
				height: 180upx;
				margin: 4upx;
				background: #757575;
				overflow: hidden;
			}
			.my-gallery {
				width: 300upx;
				margin: 4upx;
				background: #757575;
				overflow: hidden;
			}
		}
		.toolbar {
			position: relative;
			top: 10upx;
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-align: center;
			-webkit-align-items: center;
			-ms-flex-align: center;
			align-items: center;
			.timestamp {
				color: #757575;
				font-size: 22upx;
			}
			image {
				margin-left: 20upx;
				width: 30upx;
				height: 30upx;
			}
		}
		.like {
			width: auto;
			height: auto;
			position: absolute;
			right: 60upx;
			display: flex;
			align-items: center;
		}
		.comment {
			width: auto;
			height: auto;
			position: absolute;
			right: 0upx;
			display: flex;
			align-items: center;
		}
		.post-footer {
			padding:20upx;
			margin-top: 30upx;
			background-color: #f3f3f5;
			width: 100%;
		}
		.footer_content {
			padding-left: 10upx;
			position: relative;
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-align: center;
			-webkit-align-items: center;
			-ms-flex-align: center;
			align-items: center;
			-webkit-flex-wrap: wrap;
			-ms-flex-wrap: wrap;
			flex-wrap: wrap;
			line-height: 36upx;
			.liked {
				/* display: inline-block; */
				position: relative;
				margin-right: 10upx;
				width: 34upx;
				height: 34upx;
			}
			
			.nickname {
				color: $base-color;
				font-size: 24upx
			}
			.comment-nickname {
				color: $base-color;
				font-size: 24upx
			}
			.comment-content {
				color: #000000;
				font-size: 24upx
			}
		}
	}
</style>
