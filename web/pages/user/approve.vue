<template>
	<view class="container" style="padding: 0;">
		<view class="approve-body">
			<view class="notice-item" v-for="approveItem in approveList"  @click="approve(approveItem)">
				<text class="time">{{ approveItem.createTime }}</text>
				<view class="content ">
					<view class="title flex">
						<view class="flex1" v-if="approveItem.messageType===1">添加家庭成员</view>
						<view class="flex1" v-if="approveItem.messageType===5">申请绑定宗亲</view>
						<view v-if="approveItem.messageDec !='审查通过'" class="c-yellow ">{{ approveItem.messageDec }}</view>
						<view v-if="approveItem.messageDec =='审查通过'" class="c-grey ">{{ approveItem.messageDec }}</view>
					</view>
					<text class="introduce">
						{{ approveItem.messageContent }}
					</text>
					<view class="bot b-t">
						<text class="c-base">{{ approveItem.messageDec !='审查通过'?'立即审核':'已通过审核' }}</text>
						<text class="more-icon yticon icon-you"></text>
					</view>
				</view>
			</view>
		</view>
		<cl-popup :visible.sync="visible" direction="bottom">
			<view class="bold font30 mb30">拒绝理由</view>
			<view class="mb30">审核内容：<text class="c-base">{{ currentApprove.messageContent }}</text></view>
			<cl-input
				placeholder="请填拒绝理由"
				v-model="auditDec"
				type="textarea">
			</cl-input>
			<view class="footer mt30 mb30 flex">
				<cl-button class="flex1" @tap="visible = false">
					<text>取消</text>
				</cl-button>
				<cl-button class="flex1" type="primary" @tap="setApprove('fail')">
					<text>提交</text>
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
				visible:false,
				currentApprove:{},
				//申请绑定宗亲列表
				approveList: [],
				//添丁列表
				approveList2:[],
				auditDec:'',
				labels: [{
					label: '用户绑定宗亲'
				}, {
					label: '添加家庭成员'
				}],
			}
		},
		computed: {
			...mapState(['clanInfo', 'userInfo']),
		},
		methods: {
			async getUserApproveList() {
				this.approveList = await this.$api.request.getAuditMsgList({
					clanId: this.clanInfo.id,
					auditUserClanManId: this.userInfo.clanManId
				});
			},
			//立即审核
			approve(item){
				this.currentApprove = item;
				uni.showActionSheet({
				    itemList: ['通过申请', '拒绝申请'],
				    success:(res) => {
						if(res.tapIndex===0){
							this.auditDec = '通过申请';
							this.setApprove('success')
						}else if(res.tapIndex===1){
							this.auditDec = '';
							this.visible = true;
						}
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			async setApprove(actionName){
				if(this.tabIndex===1){
					// 如果审核家庭成员，则跳转到对应的接口
					this.setApprove2(actionName);
				}
				let messageDec = actionName==='success'?'审查通过':this.auditDec;
				if(actionName==='fail' && !this.auditDec){
					this.$refs["message"].open({
						type:'cancel',
						message: "请填写拒绝理由",
					});
					return false;
				}
				this.$api.request.auditUserUpdateClanMainRel({
					auditUserId:this.userInfo.clanManId,
					messageDec,
					id:this.currentApprove.id,
				}).then(res=>{
					if(res.code===0){
						this.$refs["message"].open({
							type: 'success',
							message: "已提交，请等待审核",
						});
						this.visible = false;
					}else{
						this.$refs["message"].open({
							type: 'error',
							message: res.msg,
						});
					}
					this.getUserApproveList();
					this.visible = false;
				});
				
				
				
			},
			//立即审核添加家庭成员
			approve2(item){
				this.currentApprove = item;
				uni.showActionSheet({
				    itemList: ['通过申请', '拒绝申请'],
				    success:(res) => {
						if(res.tapIndex===0){
							this.auditDec = '通过申请';
							this.setApprove2('success')
						}else if(res.tapIndex===1){
							this.auditDec = '';
							this.visible = true;
						}
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			async setApprove2(actionName){
				let auditDec = actionName==='success'?'通过审核':this.auditDec;
				if(actionName==='fail' && !this.auditDec){
					this.$refs["message"].open({
						type:'cancel',
						message: "请填写拒绝理由",
					});
					return false;
				}
				debugger
				this.$api.request.auditUserUpdateClanMain({
					clanId:this.currentApprove.clanMainRel.id,
					auditState:actionName==='success'?1:2,
					auditDec,
					id:this.currentApprove.id,
				}).then(res=>{
					if(res.code===0){
						this.$refs["message"].open({
							type: 'success',
							message: "已提交，请等待审核",
						});
						this.visible = false;
					}else{
						this.$refs["message"].open({
							type: 'error',
							message: res.msg,
						});
					}
					this.getUserApproveList();
					this.visible = false;
				});
				
				
				
			}

		},
		onShow() {
			if (!this.checkRouter()) {
				return;
			}
			this.getUserApproveList();
		}
	}
</script>

<style lang='scss'>
	.approve-body{
		background-color: #f7f7f7;
	}
	.notice-item {
		margin-bottom: 20upx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.time {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80upx;
		padding-top: 10upx;
		font-size: 26upx;
		color: #7d7d7d;
	}

	.content {
		width: 710upx;
		padding: 0 24upx;
		background-color: #fff;
		border-radius: 4upx;
	}

	.title {
		display: flex;
		align-items: center;
		height: 90upx;
		.flex1{
			color: #303133;
			font-size: 32upx;
			font-weight: bold;
		}
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
