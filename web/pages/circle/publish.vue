<template>
	<view class="container">
		<form>
			<view class="uni-textarea">
				<textarea placeholder="请输入内容(50字p以内)" v-model="input_content" />
				</view>
			<view class="img-list flex-wrap">
				<view 
					class="img-view2" 
					v-for="(item,index) in fileList">
					<image lazy-load 
					mode="aspectFill"
					class="img-cover" 
					:src="item.minImgUrl" 
					@tap="previewImage(index)">
					</image>
					<view class="delete" @click.stop="deletePhoto(item)"><text class="iconfont f22">&#xe62b</text></view>
				</view>
				<view class="img-view2-add" @tap="chooseImage()">
					<text class="iconfont">&#xe617</text>
				</view>
				
			</view>
			
			<view class="footer" >
				<cl-button class="w100off" type="primary" @click="publish">提交</cl-button>
			</view>
		</form>
		<cl-message ref="message"></cl-message>
		<cl-loading-mask :loading="upload.loading" :text="`正在上传${upload.progress}/${upload.total}`" fullscreen></cl-loading-mask>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				// title: 'choose/previewImage',
				input_content:'',
				fileList: [],
				id:'',
				upload: {
					loading: false,
					total: 0,
					progress: 0,
				},
				pageInfo: {
					currentPage: 1,
					pageSize: 21,
					total: 0,
				}
			
			}
		},
		computed: {
			...mapState(['clanInfo','userInfo']),
		},
		onLoad(options) {
			this.id = parseInt(options.id);
			console.log(this.id,options);
		},
		
		methods: {
			async publish(){
				if (!this.input_content) {
					uni.showModal({ content: '内容不能为空', showCancel: false, });
					return;
				}
				
				this.$api.request.addOrUpdateCircleContentInfo({
					clanId:this.clanInfo.id,
					clanManId:this.userInfo.clanManId,
					circleContent:this.input_content,
					circleId:this.id,
					fileList:this.fileList.map(item=>{
						return {
							id:item.id
						}
					})
				}).then(res=>{
					console.log(res);
					if (res.code === 0) {
						this.$refs["message"].open({
							type: 'success',
							message: "发布成功，请等待审核！",
						});
						setTimeout(()=>{
							uni.navigateBack()
						},1000)
					} else {
						this.$refs["message"].open({
							type: 'error',
							message: "发布失败！",
						});
					}
				})
			},
			
			
			
			//选择图片
			chooseImage() {
				uni.chooseImage({
					sizeType: ['original', 'compressed'],
					success: (chooseImageRes) => {
						console.log(chooseImageRes);
						const tempFilePaths = chooseImageRes.tempFilePaths;
						this.upload.total = tempFilePaths.length;
						this.upload.progress = 0;
						this.uploadFile(tempFilePaths);
						this.upload.loading = true;
					}
				});
			},
			//依次上传图片
			uploadFile(files) {
				uni.uploadFile({
					url: this.$api.request.uploadAction,
					filePath: files[0],
					name: 'file',
					formData: {
						typeId: this.id,
					},
					success: (res) => {
						
						let data = JSON.parse(res.data);
						console.log(data);
						files.shift();
						this.upload.progress = this.upload.total - files.length;
						this.fileList.push({
							id:data.id,
							minImgUrl:data.minImgUrl
						})
						if (files.length > 0) {
							this.uploadFile(files);
						} else {
							this.upload.loading = false;
							this.$refs["message"].open({
								type: 'success',
								message: "已全部上传",
							});
							this.pageInfo.currentPage = 1;
						}
					}
				});
			},
			//预览大图
			previewImage(index) {
				let imgArray = [];
				this.fileList.forEach(item => {
					imgArray.push(item.minImgUrl)
				})
				uni.previewImage({
					urls: imgArray,
					current: index,
					loop: true
				});
			},
			deletePhoto(item) {
				let index = this.fileList.findIndex(file =>item.id===file.id);
				this.fileList.splice(index,1);
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	
	.footer {
		margin-top: 80upx;
	}

	.uni-textarea {
		width: auto;
		padding: 20upx 25upx;
		line-height: 1.6;
		height: 150upx;
		border-bottom:#ddd solid 1upx;
		margin-bottom: 20upx;
	}
.img-view2 {
		width: 33.3333333%;
		box-sizing: border-box;
		padding: 8upx;
		height: 240upx;
		position: relative;
		.img-cover {
			width: 100%;
			height: 100%;
			object-fit: cover;
			background: #ccc;
		}
		.delete{
			position: absolute;
			right: 10upx;
			top: 4upx;
			display: block;
			color: #999;
			font-size: 30upx;
			text-align: center;
		
		}
	}
	.img-view2-add{
		width: 33.3333333%;
		box-sizing: border-box;
		padding: 0upx;
		height: 240upx;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		background: #f1f1f1;
		.iconfont{
			flex: 1;
			color: #999;
			font-size: 60upx;
		}
	}
</style>
