<template>
	<view class="pb100" v-show="ready">
		<view class="img-bg">
			<image class="img-jp" mode="aspectFill" src="../../static/jiapu.jpg"></image>
		</view>
		<view class="container">
			<view class="title">{{ clanUserInfo.name }}</view>
			<view class="desc">
				<view>房系：{{ clanUserInfo.directoryName }}</view>
				<view>世称：{{ clanUserInfo.scName }}</view>
				<view>性别：{{ clanUserInfo.sex||'男' }}</view>
				<view>出生日期：{{ clanUserInfo.birthDay }}</view>
				<view v-if=" clanUserInfo.endDay">去世日期：{{ clanUserInfo.endDay }}</view>
			</view>
			<view class="avatar">
				<image @tap="previewImage(clanUserInfo.headFileUrl)" class="avatar" :src="clanUserInfo.headFileUrl || '../../static/missing-face.png'"></image>
			</view>
			<view class="title1 mt-30">简介</view>
			<view class="mt-30">{{ clanUserInfo.dec }}</view>
		</view>
		
		<view class="w100off fotter-bar" style="background: #fff;">
			<cl-button @tap="showPopup()" class="w100off" type="primary">修改信息</cl-button>
		</view>
		<!--添加成员-->
		<cl-popup :visible.sync="visible" direction="bottom">
			<view style="overflow: auto; max-height:90vh;">
				<view class="bold font30 mb30">修改信息</view>
				<cl-card label="姓名">
					{{ form.name }}
				</cl-card>
				<cl-card label="头像">
					<view class="img-list flex-wrap">
						<view 
							v-if="form.headFileId"
							class="img-view2" 
							@tap="chooseImage()"
							>
							<image lazy-load 
							mode="aspectFill"
							class="img-cover" 
							:src="minImgUrl" >
							</image>
							<view class="delete" @click.stop="deletePhoto(item)"><text class="iconfont f22">&#xe62b</text></view>
						</view>
						<view v-else class="img-view2-add" @tap="chooseImage()">
							<text class="iconfont">&#xe617</text>
						</view>
						
					</view>
				</cl-card>
				<cl-card label="出生日期">
					<cl-date-select v-model="form.birthDay" placeholder="年/月/日"></cl-date-select>
					<!-- <view class="input-readonly" @click="opendDateSelect()" placeholder="年/月/日">{{ form.birthDay ||'年/月/日' }}</view> -->
				</cl-card>
				<cl-card label="介绍">
					<cl-input type="textarea" v-model="form.dec" placeholder="请输入介绍"></cl-input>
				</cl-card>
			</view>
			<view class="footer flex">
				<cl-button class="flex1" @tap="visible = false">
					<text>取消</text>
				</cl-button>
				<cl-button class="flex1" type="primary" @tap="addOrUpdateClanUserInfo">
					<text>提交</text>
				</cl-button>
			</view>
		</cl-popup>
		<cl-message ref="message"></cl-message>
		<cl-loading-mask :loading="upload.loading" text="正在上传头像" fullscreen></cl-loading-mask>
	</view>
</template>

<script>
	import listCell from '@/components/mix-list-cell';
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				ready: false,
				id: '',
				clanUserInfo: {},
				visible:false,
				minImgUrl:'',
				form:{
					name:'',
					birthDay:'',
					dec:'',
					headFileId:''
				},
				upload: {
					loading: false,
					total: 0,
					progress: 0,
				},
			};
		},
		components: {
			listCell
		},
		computed: {
			...mapState(['clanInfo']),
		},
		methods: {
			async loadData() {
				let par = {
					id: this.id,
				}
				const clanUserInfo = await this.$api.request.clanUserInfo(par);
				this.clanUserInfo = clanUserInfo;
				this.ready = true
			},
			previewImage(fileUrl) {
				if(!fileUrl){
					return
				}
				uni.previewImage({
					current: 0,
					urls:[fileUrl]
				});
			},
			showPopup(){
				this.form = {
					name:this.clanUserInfo.name,
					birthday:this.clanUserInfo.birthday,
					dec:this.clanUserInfo.dec,
					headFileId:this.clanUserInfo.headFileId
				}
				this.visible = true;
			},
			//保存信息
			addOrUpdateClanUserInfo(){	
				let par = {
					id:this.id,
					...this.form
				}
				this.$api.request.addOrUpdateClanUserInfo(par).then(res=>{
					if(res.code===0){
						this.$refs["message"].open({
							type: 'success',
							message: "已提交，请等待审核",
						});
						this.visible = false;
						this.loadData();
					}else{
						this.$refs["message"].open({
							type: 'error',
							message: res.msg,
						});
					}
				})
			},
			
			//选择图片
			chooseImage() {
				uni.chooseImage({
					sizeType: ['original', 'compressed'],
					count:1,
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
						this.minImgUrl = data.minImgUrl;
						this.form.headFileId = data.id;
						if (files.length > 0) {
							this.uploadFile(files);
						} else {
							this.upload.loading = false;
						}
					}
				});
			},
			deletePhoto(item) {
				this.minImgUrl = '';
				this.form.headFileId = '';
			}


		},
		onLoad(options) {
			this.id = parseInt(options.id);

		},
		onShow() {
			if (!this.checkRouter()) {
				return;
			}
			if (this.id) {
				this.loadData();
			}
		}

	}
</script>

<style lang='scss' scoped>
	page {
		background: #fff;
		line-height: 60upx;
	}

	.img-bg {
		.img-jp {
			width: 100%;
			height: 350upx;
		}
	}

	.container {
		position: relative;
		padding-bottom: 88upx;

		.avatar {
			width: 300upx;
			height: 300upx;
			position: absolute;
			top: 10upx;
			right: 20upx;
			.avatar{
				border:$border-color-dark solid 1upx;
			}
			border-radius: 150upx;
		}

		.title {
			font-size: 40upx;
		}

		.title1 {
			font-size: 30upx;
		}

		.desc {
			line-height: 60upx;
			margin-top: 20upx;
		}
	}

	.control {
		position: fixed;
		z-index: 20;
		left: 0;
		bottom: 0;
		height: 88upx;
		line-height: 88upx;
		background: #9e563a;
		width: 100%;
		display: flex;

		.action-btn {
			display: inline-block;
			width: 200upx;
			text-align: center;
			color: $uni-color-warning
		}

		.current {
			flex: 1;
			color: #fff
		}
	}

	.bottom-box {
		max-height: 50%;
		overflow: auto;
		transition: all .2s;
		position: fixed;
		left: 0;
		bottom: -50%;
		width: 200upx;
		border-right: $border-color-dark solid 1upx;
		z-index: 10;

		&.show {
			bottom: 88upx
		}

		.bottom-item {
			background: rgba(158, 86, 58, .8);
			color: #fff;
			text-align: center;
			line-height: 59upx;
			border-top: $border-color-dark solid 1upx
		}

	}

	.c-list {
		margin: 20upx 0;
		display: flex;
		flex-wrap: wrap;

		.c-list-item {
			line-height: 60upx;
			color: #693604;
			flex: 0 0 20%;
			text-align: center;
		}
	}
</style>
