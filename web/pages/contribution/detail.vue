<template>
	<view class="container pb100">
		<view class="title">{{detailVo.name}}</view>
		<view class="detail">{{detailVo.givingDec }}</view>
		<view class="mt-30 field"><text class="iconfont mr-10">&#xe604</text>发起人：{{ detailVo.createUserId}}</view>
		<view class="mt-30 field"><text class="iconfont mr-10">&#xe60d</text>发起时间：{{detailVo.createTime}}</view>
		<view class="mt-30 field"><text class="iconfont mr-10">&#xe60f</text>当前进度：进行中</view>
		<view class="mt-30 field"><text class="iconfont mr-10">&#xe610</text>乐捐人数：{{ userList.length }}</view>
		<view class="mt-30 field"><text class="iconfont mr-10">&#xe611</text>乐捐金额：{{ totalMoney}}元</view>
		<view class="title2 mt-30">乐捐排行榜</view>
		<view class="user flex" v-for="(item,index) in userList">
			<view class="flex1">
				<text :class="getClassNames(index)">{{ index+1 }}</text>
				<image class="avatar" src="../../static/temp/avatar.png"></image>
				<text class="name">{{ item.userName}}</text>
			</view>
			<view class="money">
				<view class="value">{{ item.giveMoney }}</view>
				<view class="tip">捐款金额</view>
			</view>
		</view>
		<view class="tc c-grey h88">暂无乐捐数据~</view>
		<view class="fotter-bar">
			<button type="primary" @tap="visible=true">我要乐捐</button>
		</view>
		<cl-popup :visible.sync="visible" direction="bottom">
			<cl-form>
				<cl-form-item label="乐捐金额">
					<cl-input v-model="form.giveMoney" placeholder="0.00" maxlength="11" type="text">
					</cl-input>
				</cl-form-item>
				<cl-form-item label="备注">
					<cl-input v-model="form.giveDec" placeholder="请输入备注" maxlength="11" type="textarea">
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
				visible: false,
				form: {
					giveMoney: '',
					giveDec: '',

				},
			}
		},
		
		methods: {
			async loadData() {
				//获取轮播图
				let par = {
					clanId: this.clanInfo.id,
				};
				const detailVo = await this.$api.request.projectList(par);
				const userList = await this.$api.request.projectUserList({
					givingId: this.id
				})
				this.detailVo = detailVo.filter(item => item.id === parseInt(this.id))[0];
				this.userList = userList;
			},
			getClassNams(index){
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
		async onLoad(options) {
			this.id = parseInt(options.id);
			if (this.id) {
				this.loadData();
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
