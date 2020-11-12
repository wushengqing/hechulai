<template>
	<view class="container pb100">
		<view class="title">{{detailVo.name}}</view>
		<view class="detail">{{detailVo.givingDec }}</view>
		<view class="mt-30 field"><text class="iconfont mr-10">&#xe604</text>发起人：{{ detailVo.createUserName}}</view>
		<view class="mt-30 field"><text class="iconfont mr-10">&#xe60d</text>发起时间：{{detailVo.givingBtime}}</view>
		<view class="mt-30 field"><text class="iconfont mr-10">&#xe60d</text>截止时间：{{detailVo.givingEtime}}</view>
		<view class="mt-30 field"><text class="iconfont mr-10">&#xe60f</text>当前进度：{{ statusName[detailVo.status]}}</view>
		<view class="mt-30 field"><text class="iconfont mr-10">&#xe610</text>乐捐人数：{{ detailVo.givingUserSum }}</view>
		<view class="mt-30 field"><text class="iconfont mr-10">&#xe611</text>乐捐目标金额：{{ detailVo.givingSumMoney}}元</view>
		<view class="mt-30 field"><text class="iconfont mr-10">&#xe611</text>乐捐已收金额：{{ detailVo.givingMoneySum}}元</view>
		<view class="title2 mt-30">乐捐排行榜</view>
		<view class="user flex" v-for="(item,index) in userList">
			<view class="flex1">
				<text :class="getClassNames(index)">{{ index+1 }}</text>
				<image class="avatar" src="../../static/missing-face.png"></image>
				<text class="name">{{ item.userName}}</text>
			</view>
			<view class="money">
				<view class="value">{{ item.giveMoney }}</view>
				<view class="tip">捐款金额</view>
			</view>
		</view>
		<view v-if="totalNum!==0 && !loading && userList.length>=totalNum" class="tc line88 c-grey">
			我是有底线的~
		</view>
		<view v-if="userList.length===0 && totalNum===0" class="tc line88 c-grey">
			暂无乐捐数据~
		</view>
		<view v-if="loading" class="tc line88 c-grey">
			加载中...
		</view>
		<view class="fotter-bar flex">
			<cl-button class="flex1" type="primary" @tap="visible=true">我要乐捐</cl-button>
		</view>
		<cl-popup :visible.sync="visible" direction="bottom">
			<cl-form>
				<cl-form-item label="乐捐金额">
					<cl-input v-model="form.giveMoney" placeholder="0.00" maxlength="11" type="text">
					</cl-input>
				</cl-form-item>
				<cl-form-item label="备注">
					<cl-input v-model="form.giveDec" placeholder="请输入备注" maxlength="100" type="textarea">
					</cl-input>
				</cl-form-item>
			</cl-form>

			<view class="footer flex">
				<cl-button class="flex1" @tap="visible = false">
					<text>取消</text>
				</cl-button>
				<cl-button class="flex1" type="primary" @tap="addOrUpdateGivingUserRel">
					<text>提交乐捐</text>
				</cl-button>
			</view>
		</cl-popup>
		<cl-message ref="message"></cl-message>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				id: '',
				detailVo: {

				},
				userList: [],
				loading: true,
				pageSize: 10,
				totalNum: 200,
				currentPage: 1,
				visible: false,
				form: {
					giveMoney: '',
					giveDec: '',

				},
				statusName:['未知','未开始','进行中','已结束'],
			}
		},
		async onLoad(options) {
			this.id = parseInt(options.id);
			if (this.id) {
				this.loadPageData();
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			this.currentPage = 1;
			this.loadPageData();
		},
		//加载更多
		onReachBottom() {
			if (this.userList.length >= this.totalNum) {
				return;
			}
			this.loadData();
		},
		methods: {
			async loadPageData() {
				//获取
				let par = {
					id: this.id,
				};
				const detailVo = await this.$api.request.projectDetail(par);
				detailVo.status= 0;
				if(detailVo.givingBtime){
					let now = new Date().getTime();
					let startTime = new Date(detailVo.givingBtime.replace(/-/g,'/')).getTime();
					let endTime = new Date(detailVo.givingEtime.replace(/-/g,'/')).getTime();
					if(startTime > now){
						detailVo.status=1;
					}else if(startTime<=now && now <= endTime){
							detailVo.status=2;
					}else if(now > endTime){
							detailVo.status=3;
					}
				}
				this.detailVo = detailVo;
				this.loadData();
			},
			async loadData() {
				//获取新闻列表
				this.loading = true;
				const userList = await this.$api.request.projectUserList({
					givingId: this.id,
					pageSize: this.pageSize,
					currentPage: this.currentPage,
				});
				this.totalNum = userList.totalNum
				if (this.currentPage === 1) {
					this.userList = [];
				}
				this.currentPage++;
				this.userList.push(...userList.data);
				uni.stopPullDownRefresh();
				this.loading = false;
			},
			getClassNames(index){
				if(index===0){
					return 'index large c-red'
				}
				if(index===1){
					return 'index large c-yollow'
				}
				if(index===2){
					return 'index large c-green'
				}
				return 'index'
			},
			//发起乐捐
			addOrUpdateGivingUserRel() {
				if(!this.checkRouter()){
					return;
				};
				if (!this.form.giveMoney) {
					this.$refs["message"].open({
						type:'cancel',
						message: "请输入金额",
					});
					return false;
				}
				let par = {
					givingId:this.id,
					userId:this.userInfo.clanManId,
					giveMoney:this.form.giveMoney,
					//giveDec:this.form.giveDec
				}
				this.$api.request.addOrUpdateGivingUserRel(par).then(res=>{
					if(res.code===0){
						uni.showToast({
						    title: '提交成功',
						    duration: 1000
						});
						this.visible = false;
					}else{
						uni.showToast({
							title: res.msg,
							icon:'none',
						});	
					}
				})
			}
		},
		computed: {
			...mapState(['clanInfo','userInfo']),
			totalMoney() {
				if (this.userList.length === 0) {
					return '0.00';
				}
				return '0.00';
			}
		},
		
	}
</script>

<style lang="scss">
	.title {
		line-height: 80upx;
		font-size: 40upx;
	}

	.detail {
		font-size: 28upx;
		line-height: 50upx;
	}

	.title2 {
		line-height: 80upx;
		font-size: 32upx;
	}

	.user {
		+.user {
			border-top: $border-color-dark solid 1px;
			;
		}

		justify-content: space-between;
		padding: 30upx 0;

		.flex1 {
			vertical-align: middle;

			.index {
				vertical-align: middle;
				display: inline-block;
				width: 100upx;
				height: 100upx;
				line-height: 100upx;
				font-size: 40upx;
				text-align: center;

				&.large {
					font-size: 80upx;
				}
			}

			.avatar {
				vertical-align: middle;
				display: inline-block;
				width: 100upx;
				height: 100upx;
				border-radius: 50upx;
				overflow: hidden;
				margin: 0 30upx;
			}

			.name {
				font-size: 30upx;
			}
		}

		.money {
			vertical-align: middle;
			display: inline-block;
			width: 200upx;
			line-height: 50upx;
			text-align: center;

			.value {
				color: $uni-color-warning;
				font-size: 40upx;
			}
		}
	}
</style>
