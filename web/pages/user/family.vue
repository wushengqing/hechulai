<template>
	<view class="container-dark pb100">
		<view class="notice-item mt30" style="display: flex;" v-for="item in familyList" @click="openClanPage(item)">
			<view class="headFileUrl-wrap">
				<image class="headFileUrl" :src="item.headFileUrl||`../../static/missing-face.png`"></image>
			</view>
			<view class="content">
				<text class="title">
					<text class="c-base">{{ item.name }} </text>
					<text class=" font30" style="margin-left: 20upx;">{{ item.scName }}</text>
					<text class=" font30" style="margin-left: 20upx;">称呼：{{ item.call }}</text>
				</text>
				<text class="introduce">
					{{item.dec || '暂无介绍'}}
				</text>
			</view>
		</view>
		<view class="w100off fotter-bar" style="background: #fff;">
			<cl-button @tap="visible = true" class="w100off" type="primary">添加成员</cl-button>
		</view>
		<!--添加成员-->
		<cl-popup :visible.sync="visible" direction="bottom">
			<view style="overflow: auto; max-height:90vh;">
				<view class="bold font30 mb30">添加成员</view>
				<cl-card label="称呼">
					<cl-radio v-model="form.type" :label="1">妻子</cl-radio>
					<cl-radio v-model="form.type" :label="2">儿子</cl-radio>
					<cl-radio v-model="form.type" :label="3">女儿</cl-radio>
				</cl-card>
				<cl-card label="姓名">
					<cl-input v-model="form.name" placeholder="请输入姓名"></cl-input>
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
							:src="minImgUrl" 
							@tap="previewImage(0)">
							</image>
							<view class="delete" @click.stop="deletePhoto(item)"><text class="iconfont f22">&#xe62b</text></view>
						</view>
						<view v-else class="img-view2-add" @tap="chooseImage()">
							<text class="iconfont">&#xe617</text>
						</view>
						
					</view>
				</cl-card>
				<cl-card label="出生日期">
					<cl-date-select v-model="form.birthday" placeholder="年/月/日"></cl-date-select>
					<!-- <view class="input-readonly" @click="opendDateSelect()" placeholder="年/月/日">{{ form.birthday ||'年/月/日' }}</view> -->
				</cl-card>
				<cl-card label="介绍">
					<cl-input v-model="form.dec" placeholder="请输入介绍"></cl-input>
				</cl-card>
			</view>
			<view class="footer flex">
				<cl-button class="flex1" @tap="visible = false">
					<text>取消</text>
				</cl-button>
				<cl-button class="flex1" type="primary" @tap="addOrUpdateClanUserRelByApp">
					<text>提交</text>
				</cl-button>
			</view>
		</cl-popup>
		<cl-message ref="message"></cl-message>
		<cl-loading-mask :loading="upload.loading" text="正在上传头像" fullscreen></cl-loading-mask>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				familyList: [],
				visible: false,
				form: {
					type: 2,
					name: '',
					birthday: '',
					dec: '',
					headFileId:''
				},
				minImgUrl:'',
				upload: {
					loading: false,
					total: 0,
					progress: 0,
				},
			}
		},
		computed: {
			...mapState(['clanInfo', 'userInfo']),
		},
		methods: {
			async getZpList() {
				let family = await this.$api.request.getZpList({
					clanId: this.clanInfo.id,
					clansmanId: this.userInfo.clanManId,
				});
				family = family[0];
				this.familyList = [];
				//妻子列表
				this.familyList.push({
					name: family.clansmanName,
					headFileUrl: family.headFileUrl,
					call: '自己',
					scName: family.scName,
					dec: family.clansmanDec,
					clansmanId: family.clansmanId,
					type: 0,
				})
				family.spouseDtoList.forEach(item => {
					this.familyList.push({
						name: item.spouseName,
						headFileUrl: item.headFileUrl,
						call: '妻子',
						scName: family.scName,
						dec: item.spouseDec,
						clansmanId: item.spouseId,
						type: 1,
						husbandId: item.clansmanId
					})
				})
				//儿子列表
				family.sonDtoList.forEach(item => {
					this.familyList.push({
						name: item.clansmanName,
						headFileUrl: item.headFileUrl,
						call: '儿子',
						scName: item.scName,
						dec: item.clansmanDec,
						clansmanId: item.clansmanId,
						type: 0,
					});
					//儿媳妇
					item.spouseDtoList.forEach(wife => {
						this.familyList.push({
							name: wife.spouseName || '不详',
							headFileUrl: wife.headFileUrl,
							call: `儿媳妇(${item.clansmanName})之妻`,
							scName: item.scName,
							dec: wife.spouseDec,
							clansmanId: wife.spouseId,
							type: 1,
							husbandId: item.clansmanId
						});
					});
					//孙辈
					(item.sonDtoList || []).forEach(son => {
						this.familyList.push({
							name: son.clansmanName,
							headFileUrl: son.headFileUrl,
							call: son.sex === '男' ? `孙子(${item.clansmanName})之子` : `孙女(${item.clansmanName})之女`,
							scName: son.scName,
							dec: son.clansmanDec,
							clansmanId: item.clansmanId
						});
					})
				})
				//女儿列表
				family.daughterDtoList.forEach(daughter => {
					this.familyList.push({
						name: daughter.daughterName || '不详',
						headFileUrl: daughter.headFileUrl,
						call: `女儿`,
						scName: daughter.scName,
						dec: daughter.daughterDec,
						clansmanId: daughter.daughterId,
						type: 2,
						fatherId: family.clansmanId
					});
				})
			},
			addOrUpdateClanUserRelByApp() {
				let par = {
					id: this.userInfo.clanManId,
					sonDtoList: [],
					spouseDtoList: [],
					daughterDtoList: [],
				};
				switch (this.form.type) {
					case 1:
						//妻子
						par.spouseDtoList = [{
							spouseName: this.form.name,
							spouseBirthDay: this.form.birthday,
							spouseDec: this.form.dec,
							headFileId:this.form.headFileId
						}]
						break;
					case 2:
						//儿子
						par.sonDtoList = [{
							clansmanName: this.form.name,
							clansmanBirthDay: this.form.birthday,
							clansmanDec: this.form.dec,
							headFileId:this.form.headFileId
						}]
						break;
					case 3:
						//女儿
						par.daughterDtoList = [{
							daughterName: this.form.name,
							daughterBirthDay: this.form.birthday,
							daughterDec: this.form.dec,
							headFileId:this.form.headFileId
						}]
						break;
				}
				uni.showLoading({
				    title: '请求中',
						mask:true
				});
				this.$api.request.addOrUpdateClanUserRelByApp(par).then(res => {
					uni.hideLoading();
					if (res.code === 0) {
						this.$refs["message"].open({
							type: 'success',
							message: "已提交，请等待审核",
						});
						this.visible = false;
					} else {
						this.$refs["message"].open({
							type: 'cancel',
							message: res.msg,
						});
					}
				})
			},
			openClanPage(item) {
				uni.navigateTo({
					url: `/pages/user/familyDetail?id=${item.clansmanId }`
				});
			},
			opendDateSelect() {
				this.$refs.dateselect.show();
			},
			changeDate(datestr) {
				//返回的是阳历 数字的  比如:2020-02-02
				console.log(datestr);
			},
			changelunarDate(lunardate) {
				//返回的是对象 具体对象内容看图片或者自己看控制台输出
				console.log(lunardate);
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
			//预览大图
			previewImage(index) {
				let imgArray = [this.minImgUrl];
				uni.previewImage({
					urls: imgArray,
					current: index,
					loop: true
				});
			},
			deletePhoto(item) {
				this.minImgUrl = '';
				this.form.headFileId = '';
			}
			
		},
		onShow() {
			if (!this.checkRouter()) {
				return;
			}
			this.getZpList();
		}
	}
</script>

<style lang='scss' scoped>
	page {
		background-color: #f7f7f7;
		padding-bottom: 30upx;
	}

	.notice-item {
		margin-bottom: 20upx;
		display: flex;
		background-color: #fff;
		padding: 10upx;
	}

	.headFileUrl-wrap {
		width: 120upx;
		.headFileUrl {
			width: 120upx;
			height: 120upx;
			border-radius: 50%;
		}
	}

	.content {

		flex: 1;
		padding: 0 20upx 0;
		border-radius: 4upx;

	}

	.title {
		display: flex;
		align-items: center;
		height: 90upx;
		font-weight: bold;
		color: #303133;
	}

	.img-wrapper {
		width: 100%;
		height: 260upx;
		position: relative;
	}

	.pic {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 6upx;
	}

	.cover {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		font-size: 36upx;
		color: #fff;
	}

	.introduce {
		display: inline-block;
		padding: 16upx 0;
		font-size: 28upx;
		color: #606266;
		line-height: 38upx;
	}

	.bot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80upx;
		font-size: 24upx;
		color: #707070;
		position: relative;
	}

	.more-icon {
		font-size: 32upx;
	}
</style>
