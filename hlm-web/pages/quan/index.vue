<template>
	<view id="moments">
		<view class="home-pic">
			<view class="home-pic-base">
				<view class="top-pic">
					<image class="header" src="../../static/quan/test/header06.jpg" @tap="test"></image>
				</view>
				<view class="top-name">Liuxy</view>
			</view>
		</view>

		<view class="moments__post" v-for="(post,index) in posts" :key="index" :id="'post-'+index">
			<view class="post-left">
				<image class="post_header" :src="post.header_image"></image>
			</view>

			<view class="post_right">
				<text class="post-username">{{post.username}}</text>
				<view id="paragraph" class="paragraph">{{post.content.text}}</view>
				<!-- 相册 -->
				<view class="thumbnails">
					<view :class="post.content.images.length === 1?'my-gallery':'thumbnail'" v-for="(image, index_images) in post.content.images"
					 :key="index_images">
						<image class="gallery_img" lazy-load mode="widthFix" :src="image" :data-src="image" @tap="previewImage(post.content.images,index_images)"></image>
					</view>
				</view>
				<!-- 资料条 -->
				<view class="toolbar">
					<view class="timestamp">{{post.timestamp}}</view>
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
						<text class="nickname" v-for="(user,index_like) in post.like" :key="index_like">{{user.username}}</text>
					</view>
					<view class="footer_content" v-for="(comment,comment_index) in post.comments.comment" :key="comment_index" @tap="reply(index,comment_index)">
						<text class="comment-nickname">{{comment.username}}: <text class="comment-content">{{comment.content}}</text></text>
					</view>
				</view>
			</view>
			<!-- 结束 post -->
		</view>

		<view class="foot" v-show="showInput">
			<chat-input @send-message="send_comment" @blur="blur" :focus="focus" :placeholder="input_placeholder"></chat-input>
			<!-- <chat-input @send-message="send_comment" @blur="blur" :placeholder="input_placeholder"></chat-input> -->
		</view>
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>

</template>

<script>
	import chatInput from '../../components/im-chat/chatinput.vue'; //input框
	import postData from './index.post.data.js'; //朋友圈数据

	export default {
		components: {
			chatInput
		},
		data() {
			return {
				posts: postData, //模拟数据
				user_id: 4,
				username: 'Liuxy',

				index: '',
				comment_index: '',

				input_placeholder: '评论', //占位内容
				focus: false, //是否自动聚焦输入框
				is_reply: false, //回复还是评论
				showInput: false, //评论输入框

				screenHeight: '', //屏幕高度(系统)
				platform: '',
				windowHeight: '', //可用窗口高度(不计入软键盘)

				loadMoreText: "加载中...",
				showLoadMore: false,
			}
		},
		mounted() {

			uni.getStorage({
				key: 'posts',
				success: function(res) {
					console.log(res.data);
					this.posts = res.data;
				}
			});

		},
		onLoad() {
			uni.getSystemInfo({ //获取设备信息
				success: (res) => {
					this.screenHeight = res.screenHeight;
					this.platform = res.platform;
				}
			});
			uni.startPullDownRefresh();
		},
		onShow() {
			uni.onWindowResize((res) => { //监听窗口尺寸变化,窗口尺寸不包括底部导航栏
				if (this.platform === 'ios') {
					this.windowHeight = res.size.windowHeight;
					this.adjust();
				} else {
					if (this.screenHeight - res.size.windowHeight > 60 && this.windowHeight <= res.size.windowHeight) {
						this.windowHeight = res.size.windowHeight;
						this.adjust();
					}
				}
			});
		},
		onHide() {
			uni.offWindowResize(); //取消监听窗口尺寸变化
		},
		onUnload() {
			this.max = 0,
				this.data = [],
				this.loadMoreText = "加载更多",
				this.showLoadMore = false;
		},
		onReachBottom() { //监听上拉触底事件
			console.log('onReachBottom');
			this.showLoadMore = true;
			setTimeout(() => {
				//获取数据
				if (this.posts.length < 20) { //测试数据
					this.posts = this.posts.concat(this.posts);
				} else {
					this.loadMoreText = "暂无更多";
				}
			}, 1000);
		},
		onPullDownRefresh() { //监听下拉刷新动作
			console.log('onPullDownRefresh');
			// 这里获取数据
			setTimeout(function() {
				//初始化数据
				uni.stopPullDownRefresh(); //停止下拉刷新
			}, 1000);
		},
		onNavigationBarButtonTap(e) { //监听标题栏点击事件
			if (e.index == 0) {
				this.navigateTo('../publish/publish')
			}
		},
		computed: {

		},
		methods: {
			test() {
				this.navigateTo('../test/test');
			},
			navigateTo(url) {
				uni.navigateTo({
					url: url
				});
			},
			like(index) {
				if (this.posts[index].islike === 0) {
					this.posts[index].islike = 1;
					this.posts[index].like.push({
						"uid": this.user_id,
						"username": "," + this.username
					});
				} else {
					this.posts[index].islike = 0;
					this.posts[index].like.splice(this.posts[index].like.indexOf({
						"uid": this.user_id,
						"username": "," + this.username
					}), 1);
				}
			},
			comment(index) {
				this.showInput = true; //调起input框
				this.focus = true;
				this.index = index;
			},
			adjust() { //当弹出软键盘发生评论动作时,调整页面位置pageScrollTo
				return;
				uni.createSelectorQuery().selectViewport().scrollOffset(res => {
					var scrollTop = res.scrollTop;
					let view = uni.createSelectorQuery().select("#post-" + this.index);
					view.boundingClientRect(data => {
						console.log("data:" + JSON.stringify(data));
						console.log("手机屏幕高度:" + this.screenHeight);
						console.log("竖直滚动位置" + scrollTop);
						console.log("节点离页面顶部的距离为" + data.top);
						console.log("节点高度为" + data.height);
						console.log("窗口高度为" + this.windowHeight);

						uni.pageScrollTo({
							scrollTop: scrollTop - (this.windowHeight - (data.height + data.top + 45)), //一顿乱算
							// scrollTop: 50, 
							duration: 300
						});
					}).exec();
				}).exec();
			},
			reply(index, comment_index) {
				this.is_reply = true; //回复中
				this.showInput = true; //调起input框
				let replyTo = this.posts[index].comments.comment[comment_index].username;
				this.input_placeholder = '回复' + replyTo;
				this.index = index; //post索引
				this.comment_index = comment_index; //评论索引
				this.focus = true;
			},
			blur: function() {
				this.init_input();
			},
			send_comment: function(message) {

				if (this.is_reply) {
					var reply_username = this.posts[this.index].comments.comment[this.comment_index].username;
					var comment_content = '回复' + reply_username + ':' + message.content;
				} else {
					var comment_content = message.content;
				}
				this.posts[this.index].comments.total += 1;
				this.posts[this.index].comments.comment.push({
					"uid": this.user_id,
					"username": this.username,
					"content": comment_content //直接获取input中的值
				});
				this.init_input();
			},
			init_input() {
				this.showInput = false;
				this.focus = false;
				this.input_placeholder = '评论';
				this.is_reply = false;
			},
			previewImage(imageList, image_index) {
				var current = imageList[image_index];
				uni.previewImage({
					current: current,
					urls: imageList
				});
			},
			goPublish() {
				uni.navigateTo({
					url: './publish/publish',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style scoped>
	.liked {
		/* display: inline-block; */
		position: relative;
		margin-right: 10upx;
		width: 34upx;
		height: 34upx;
	}

	.post-username {
		font-size: 32upx;
		font-weight: 600;
		color: #36648B;
	}




	.gallery_img {
		width: 100%;
		height: 100%
	}

	.header {
		width: 100%;
		height: 100%;
		z-index: 10;
		border-radius: 40upx;
	}

	.publish {
		position: absolute;
		top: 20upx;
		right: 20upx;

		/* z-index: 9999; */
	}



	.post_header {

		width: 90upx !important;
		height: 90upx !important;
		border-radius: 10upx;
		margin-top: 8upx;
	}

	#moments {
		background: #fff;
		line-height: 42upx;
	}

	#moments .home-pic {
		width: 100%;
		/* margin-top: -150upx; */
		position: relative;
		height: 300upx;
		z-index: 5;
		background-image: url( '~@/static/jiapu.jpg');
		background-size: cover;
		margin-bottom: 50upx
	}

	#moments .home-pic-base {
		position: absolute;
		left: -60upx;
		bottom: -40upx;
		width: 100%;
		height: 160upx;
		padding: 0 30upx;
	}

	#moments .home-pic-base .top-pic {
		width: 360upx;
		height: 360upx;

		border-radius: 40upx;
		-webkit-transform: scale(0.5);
		-ms-transform: scale(0.5);
		transform: scale(0.5);
		-webkit-transform-origin: 100% 0%;
		-ms-transform-origin: 100% 0%;
		transform-origin: 100% 0%;
		background-color: #ffffff;

		float: right
	}

	#moments .home-pic-base .top-name {
		position: absolute;
		/* left: 20px; */
		right: 240upx;
		top: 30upx;
		font-size: 32upx;
		font-weight: 600;
		text-align: right;
		color: #ffffff;
		overflow: hidden
	}

	#moments .moments__post {
		background: #fff;
		display: block;
		border-bottom: 1px solid #f2eeee;
		padding: 30upx 20upx;
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
	}

	#moments .moments__post::before {
		content: none
	}

	#moments .moments__post .post_right {
		font-size: 32upx;
		display: table-cell;
		padding-left: 20upx;
		width: 100%;
	}

	/* #moments .moments__post .post_right .paragraphExtender {
			margin: 5px auto;
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex
		} */

	#moments .moments__post .title {
		color: #094dcc
	}

	#moments .moments__post .thumbnails {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		/* display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox; */
		/* -webkit-flex-wrap: wrap;
		-ms-flex-wrap: wrap; */
	}

	#moments .moments__post .thumbnails .thumbnail {
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
		overflow: hidden
	}

	#moments .moments__post .toolbar {
		position: relative;
		top: 10upx;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center
	}

	#moments .moments__post .toolbar .timestamp {
		color: #757575;
		font-size: 22upx;
	}


	#moments .moments__post .like {
		width: auto;
		height: auto;
		position: absolute;
		right: 60upx;
		display: flex;
		align-items: center;
	}

	#moments .moments__post .comment {
		width: auto;
		height: auto;
		position: absolute;
		right: 0upx;
		display: flex;
		align-items: center;
	}

	#moments .moments__post .toolbar image {
		margin-left: 20upx;
		width: 30upx;
		height: 30upx;
	}

	.post-footer {
		padding:20upx;
		margin-top: 30upx;
		background-color: #f3f3f5;
		width: 100%;
	}

	#moments .moments__post .footer_content {
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
		flex-wrap: wrap
	}

	#moments .moments__post .footer_content .nickname {
		color: #36648B;
		font-size: 24upx
	}

	#moments .moments__post .footer_content .comment-nickname {
		color: #36648B;
		font-size: 24upx
	}

	#moments .moments__post .footer_content .comment-content {
		color: #000000;
		font-size: 24upx
	}

	.foot {
		position: fixed;
		width: 100%;
		height: 90upx;
		min-height: 90upx;
		left: 0upx;
		bottom: 0upx;
		overflow: hidden;
	}
</style>
