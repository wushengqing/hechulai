<template>
	<view>
		<view class="home-pic">
			<view class="home-pic-base">
				<cl-button v-if="currcircle.id"  type="primary"  @click="openPublishPage(currcircle.id)" class="add ml-20" >发布</cl-button>
			</view>
		</view>
		<wyb-noticeBar style="margin-bottom: 10upx;" type="vert" :time="5000" :text="noticeList" url="/pages/notice/list" />
		<view class="container">
			<view class="tab-view">
				<scroll-view scroll-x style="position: relative;">
					<view class="tabs" :style="{width:circleList.length*180+'upx' }">
						<view class="tab" :class="{active:item.id===activeTab}" @tap="changeTab(item.id)" v-for="item in circleList">
							{{ item.circleName }}
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="circle-detail" v-if="activeTab !==0">
				<view class="list" >
					<view class="list-icon">
						<image :src="currcircle.circleFileUrl"></image>
					</view>
					<view class="list-content">
						<view class="name font30">
							<text class="">话题：<text class="c-base mr-20">{{currcircle.contentNum}}</text>|</text>
							<text class="ml-20 ">关注：<text class="c-base">{{currcircle.memberNum}}</text></text>
							<text class="follow ml-20 " @click="follow()">+关注</text>
						</view>
						<view class="dec">{{currcircle.circleDec}}</view>
						<view class="content">{{currcircle.circleContent}}</view>
					</view>
				</view>
				
			</view>
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
					</view>
					<view id="paragraph" class="paragraph">{{post.circleContent}}</view>
					<!-- 相册 -->
					<view class="thumbnails" v-if="post.fileList.length>0">
						<view 
							v-if="post.fileList.length === 1"
							:style="{width:`${post.fileList[0].width}upx`, height:`${post.fileList[0].height}upx`}"
							class="my-gallery" >
							<image 
								class="gallery_img" 
								lazy-load 
								mode="aspectFill" 
								@load="imageLoad($event,post.fileList[0])"
								:style="{width:`${post.fileList[0].width}upx`, height:`${post.fileList[0].height}upx`}"
								:src="post.fileList[0].fileUrl" 
								:data-src="post.fileList[0].fileUrl" 
								@tap="previewImage(post.fileList,0)">
							</image>
						</view>
						<template v-else>
							<view
								class="thumbnail" 
								v-for="(image, index_images) in post.fileList"
								:key="index_images">
								<image 
									class="gallery_img" 
									lazy-load 
									mode="aspectFill" 
									:src="image.fileUrl" 
									:data-src="image.fileUrl" 
									@tap="previewImage(post.fileList,index_images)">
								</image>
							</view>
						</template>
						
					</view>
					<!-- 资料条 -->
					<view class="toolbar">
						<view class="timestamp">{{post.createTime}}</view>
						<view class="like iconfont" :class="{'c-base':isLike(post)}" @tap="like(post)">
							&#xe62d
						</view>
						<view class="comment iconfont" @tap="comment(post)">
							&#xe62c
						</view>
					</view>
					<!-- 赞／评论区 -->
					<view class="post-footer">
						<view class="footer_content">
							<text class="iconfont c-base mr-10">&#xe62d</text>
							<text class="nickname" v-for="(user,index_like) in post.goodList" :key="index_like"><text v-if="index_like!==0">，</text>{{user.clanManName}}</text>
						</view>
						<view 
							class="footer_content" 
							v-for="(comment,comment_index) in post.commentList" 
							:key="comment_index" @tap="reply(post.id,comment)">
							<text 
								v-if="!comment.commentParentClanManName" 
								class="comment-nickname">{{comment.clanManName}} 
								<text class="comment-content">:{{comment.commentContent}}</text>
								<text v-if="showDeleteBtn(comment)" class="ml-10 c-base" @tap="deleteComment(comment.id,post)">删除</text>
							</text>
							<text 
								v-if="comment.commentParentClanManName" 
								class="comment-nickname">{{comment.clanManName}}
								<text class="comment-content">回复</text>
								{{comment.commentParentClanManName}} 
								<text class="comment-content">:{{comment.commentContent}}</text>
								<text v-if="showDeleteBtn(comment)" class="ml-10 c-base" @tap="deleteComment(comment.id,post)">删除</text>
							</text>
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
		<cl-popup :visible.sync="visible" direction="bottom">
			<view class="line88">评论内容：</view>
			<cl-input 
				style="width: 100%;" 
				maxlength="100" 
				v-model="currComment.commentContent" 
				placeholder="请输入(100字以内)" 
				type="textarea">
			</cl-input>
			<view class="mb30">
			</view>
			<view class="footer flex" style="padding-bottom: 150upx;">
				<cl-button class="flex1" type="primary" @tap="saveComment">
					<text>提交评论</text>
				</cl-button>
			</view>
		</cl-popup>
		<cl-message ref="message"></cl-message>
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
				visible:false,
				noticeList: [],
				circleName: [],
				activeTab: 0,
				circleList: [],
				loading: true,
				pageSize: 10,
				totalNum: 200,
				currentPage: 1,
				articleList: [],
				currComment:{
					contentId:'',
					commentContent:'',
					commentParentId:'',
					commentParentClanManName:'',
				},
			}
		},
		components: {
			wybNoticeBar
		},
		computed: {
			...mapState(['clanInfo','userInfo']),
			currcircle() {
				if (this.activeTab === 0) {
					return {};
				} else {
					return this.circleList.filter(item => {
						return item.id === this.activeTab;
					})[0];
				}
			},
		},
		onLoad() {
			if (!this.checkRouter()) {
				return;
			}
			this.getData()
		},
		onShow(){
			if(this.loading){
				return;
			}
			this.currentPage = 1;
			this.articleList = [];
			this.getData();
		},
		//下拉刷新
		onPullDownRefresh() {
			this.currentPage = 1;
			this.articleList = [];
			this.getData();
		},
		//加载更多
		onReachBottom() {
			if (this.articleList.length >= this.totalNum) {
				return;
			}
			this.loadData();
		},
		methods: {
			changeTab(id) {
				this.activeTab = id;
				this.articleList = [];
				this.totalNum = 200;
				this.currentPage = 1;
				this.loadData();
			},
			imageLoad(e,imageItem){
				let [$width,$height] = [e.detail.width,e.detail.height];
				//最大宽度300upx,最大高度500upx
				let newHeight = 300 * ($height/$width);
				if(newHeight>500){
					newHeight=500;
				}
				imageItem.height = newHeight;
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
					res.data.forEach(item => {
						this.circleName[item.id] = item.circleName;
					})
					this.circleList = res.data;
					this.loadData();
				})
			},
			//当前登录的用户是否点赞
			isLike(item){
				let userClanManId= this.userInfo.clanManId;
				return item.goodList.findIndex(user=>user.clanManId===userClanManId) !==-1;
			},
			//点赞和取消点赞
			like(item){
				let par = {
					contentId:item.id,
					clanManId:this.userInfo.clanManId,
				};
				this.$api.request.addOrUpdateCircleCommentInfo(par).then(res=>{
					if(res.code===0){
						if(!this.isLike(item)){
							//点赞
							item.goodList.push({
								id:'',
								clanManId:this.userInfo.clanManId,
								clanManName:this.userInfo.zqName
							})
						}else{
							let userClanManId= this.userInfo.clanManId;
							let index = item.goodList.findIndex(user=>user.clanManId===userClanManId)
							//取消点赞
							item.goodList.splice(index,1)
						}
						
					}
				})
			},
			//评论
			comment(item){
				this.visible = true;
				this.currComment = {
					contentId:item.id,
					commentContent:'',
					commentParentId:''
				}
			},
			reply(contentId,comment){
				if(comment.clanManId===this.userInfo.clanManId){
					return;
				}
				this.visible = true;
				this.currComment = {
					contentId:contentId,
					commentContent:'',
					commentParentId:comment.id,
					commentParentClanManName:comment.clanManName
				}
			},
			//是否可删除
			showDeleteBtn(comment){
				return comment.clanManId === this.userInfo.clanManId;
			},
			//删除评论
			deleteComment(id,currArticle){
				let par = {
					commentState:1,
					id,
				};
				this.$api.request.addOrUpdateCircleCommentInfo(par).then(res=>{
					if(res.code===0){
						 for(let i=0,len=currArticle.commentList.length; i<len;){  
							 let item = currArticle.commentList[i];
							if(item.id ===id || item.commentParentId=== id){
								currArticle.commentList.splice(i,1);
								len--;
							}else{
								i++;
							}
						 }
					}
				})
			},
			//保存评论
			saveComment(){
				let par = {
					...this.currComment,
					clanManId:this.userInfo.clanManId,
				};
				if(this.currComment.commentParentId===''){
					delete par.commentParentId;
					delete par.commentParentClanManName;
				}
				this.$api.request.addOrUpdateCircleCommentInfo(par).then(res=>{
					if(res.code===0){
						this.visible = false;
						let currArticle = this.articleList.filter(item=>item.id===this.currComment.contentId)[0];
						let newComment = {
							id:res.data.id,
							clanManName:this.userInfo.zqName,
							clanManId:this.userInfo.clanManId,
							commentContent:this.currComment.commentContent
						}
						if(this.currComment.commentParentId!==''){
							newComment.commentParentClanManName = this.currComment.commentParentClanManName;
							newComment.commentParentId = par.commentParentId;
						}
						currArticle.commentList.push(newComment)
					}
				})
			},
			previewImage(imageList, image_index) {
				var current = imageList[image_index].fileUrl;
				uni.previewImage({
					current: current,
					urls: imageList.map(item => {
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
				articleList.data.forEach(item=>{
					item.fileList.forEach(img=>{
						img.width='300';
						img.height='300';
					})
				})
				this.totalNum = articleList.totalNum
				if (this.currentPage === 1) {
					this.articleList = [];
				}
				this.currentPage++;
				this.articleList.push(...articleList.data);
				uni.stopPullDownRefresh();
				this.loading = false;
			},
			//加关注
			follow(){
				let par = {
					circleId:this.currcircle.id,
					clanManId:this.userInfo.clanManId,
				}
				this.$api.request.addOrUpdateCircleUserRel(par).then(res=>{
					if(res.code===0){
						uni.showToast({
						    title: '关注成功！',
						    duration: 1000
						});
					}else{
						uni.showToast({
						    title: res.msg,
						    duration: 1000
						});
					}
				})
			},
			openDialog() {},
			openPublishPage(id) {
				uni.navigateTo({
					url:`./publish?id=${id}`
				})
			},
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
	.add{
		position: absolute;
		right: 20upx;
		bottom: 20upx;
		width: 150upx;
		line-height: 60upx;
		height: 60upx;
		border:none;
		background: rgb(245, 163, 0);
	}
	.follow {
		background: #ec9205;
		padding: 0 10upx;
		line-height: 50upx;
		display: inline-block;
		border-radius: 4upx;
		font-size: $font-base;
		color: #fff;
	}
.circle-detail{
	border-bottom: #ddd solid 1upx;
	.list {
		display: inline-block;
		margin: 20upx 0;
		display: flex;
		.list-icon {
			width: 280upx;
			height: 240upx;
			overflow: hidden;
			margin-right: 20upx;
	
			image {
				width: 100%;
				height: 100%;
			}
		}
	
		.list-content {
			flex: 1;
			line-height: 60upx;
		
			.dec {
				color: #ec9205;
			}
	
			.content {
				color: #999;
				height: 120upx;
				overflow: hidden;
			}
		}
	}
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

		.post-left {
			.post_header {
				width: 90upx !important;
				height: 90upx !important;
				border-radius: 10upx;
				margin-top: 8upx;
			}
		}

		.post_right {
			font-size: $font-base;
			padding-left: 20upx;
			width: 100%;
			flex: 1;
			.post-username {
				line-height: 60upx;
				font-size: $font-base;
				font-weight: 600;
				color: $base-color;
			}

			.circleName {
				color: #ec9205;
				line-height: 50upx;
				font-size: $font-sm;
			}

			.paragraph {
				line-height: 60upx;
				font-size: $font-base;
			}
		}

		.thumbnails {
			width: 100%;
			display: flex;
			flex-wrap: wrap;

			.thumbnail {
				width: 30%;
				height: 150upx;
				margin: 4upx;
				background: #757575;
				overflow: hidden;
				.gallery_img{
					width: 100%;
					height: 100%;
				}
			}

			.my-gallery {
				width: 300upx;
				height: 300upx;
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
				font-size: $font-sm;
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
			padding: 20upx;
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
			line-height: 60upx;

			.liked {
				/* display: inline-block; */
				position: relative;
				margin-right: 10upx;
				width: 34upx;
				height: 34upx;
			}

			.nickname {
				color: $base-color;
			}

			.comment-nickname {
				color: $base-color;
			}

			.comment-content {
				color: #000000;
			}
		}
	}
</style>
