<template>
	<view class="container" :class="{pb100:detailVo.auditState!==1}">
		<view class="title" v-if="detailVo.messageType===1">绑定宗亲</view>
		<view class="title" v-if="detailVo.messageType===2">添加家庭成员</view>
		<view class="title" v-if="detailVo.messageType===3">宗亲乐捐消息</view>
		<view class="title" v-if="detailVo.messageType===4">宗亲反馈消息</view>
		<view class="title" v-if="detailVo.messageType===5">发布宗圈文章</view>
		<view class="title" v-if="detailVo.messageType===6">新丁消息</view>
		<view class="title" v-if="detailVo.messageType===7">逝世消息</view>
		<view class="title" v-if="detailVo.messageType===8">关注宗族圈</view>
		<view class="sub-title">
			<text class="label">发起时间：</text>
			<text class="value">{{ detailVo.createTime}}</text>
		</view>
		<view class="sub-title">
			<text class="label">审核状态：</text>
			<text class="value c-base"  v-if="!detailVo.auditState|| detailVo.auditState===0">待审核</text>
			<text class="value c-grey"  v-if="detailVo.auditState===1">已通过</text>
			<text class="value c-base"  v-if="detailVo.auditState===2">已驳回</text>
		</view>
		<view class="sub-title">
			<text class="label">审核内容：</text>
			<text class="value">{{ detailVo.messageContent }}</text>
		</view>
		<view class="title2">用户信息</view>
		<view class="sub-title">
			<text class="label">手机号码：</text>
			<text class="value c-base" @click="makePhoneCall(detailVo.clanMainRel.userNum)">
				{{ detailVo.clanMainRel.userNum }}
				<text class="iconfont">&#xe62e</text>
			</text>
		</view>
		<!--宗亲信息-->
		<template>
			<view class="title2">宗亲信息</view>
			<view class="sub-title">
				<text class="label">宗亲姓名：</text>
				<text class="value">{{ detailVo.clanMainRel.clansmanName}}</text>
			</view>
			<view class="sub-title">
				<text class="label">宗亲世称：</text>
				<text class="value">{{ detailVo.clanMainRel.scName}}</text>
			</view>
			<view class="sub-title">
				<text class="label">父亲姓名：</text>
				<text class="value">{{ detailVo.clanMainRel.parentName}}</text>
			</view>
			<view class="sub-title">
				<text class="label">宗亲简介：</text>
				<text class="value">{{ detailVo.clanMainRel.clansmanDec}}</text>
			</view>
		</template>
		<!--宗亲乐捐-->
		<template v-if="detailVo.messageType===3">
			<view class="title2">乐捐信息</view>
			<view class="sub-title">
				<text class="label">项目名称：</text>
				<text class="value">{{ detailVo.givingInfo.givingName}}</text>
			</view>
			<view class="sub-title">
				<text class="label">乐捐进度：</text>
				<text v-if="detailVo.givingInfo.status===0" class="value">未知</text>
				<text v-if="detailVo.givingInfo.status===1" class="value">未开始</text>
				<text v-if="detailVo.givingInfo.status===2" class="value">进行中</text>
				<text v-if="detailVo.givingInfo.status===3" class="value">已结束</text>
			</view>
			<view class="sub-title">
				<text class="label">乐捐金额：</text>
				<text class="value">{{ detailVo.givingInfo.giveMoney}}</text>
			</view>
			<view class="sub-title">
				<text class="label">乐捐备注：</text>
				<text class="value">{{ detailVo.givingInfo.giveDec||'-'}}</text>
			</view>
		</template>
		<!--宗亲反馈-->
		<template v-if="detailVo.messageType===4">
			<view class="title2">反馈信息</view>
			<view class="sub-title">
				<text class="label">反馈内容：</text>
				<text class="value">{{ detailVo.messageDec}}</text>
			</view>
		</template>
		
		<view class="fotter-bar flex" v-if="detailVo.auditState!==1">
			<cl-button v-if="detailVo.auditState===0" class="flex1" @tap="visible = true">
				<text>驳回审核</text>
			</cl-button>
			<cl-button v-if="detailVo.auditState===0" class="flex1" type="primary" @tap="approvePass">
				通过审核
			</cl-button>
			<cl-button v-if="detailVo.auditState===2" class="flex1" type="primary" @tap="approvePass">
				重新通过审核
			</cl-button>
		</view>
		<cl-popup :visible.sync="visible" direction="bottom">
			<view class="bold font30 mb30">拒绝理由</view>
			<view class="mb30">审核内容：<text class="c-base">{{ detailVo.messageContent }}</text></view>
			<cl-input
				placeholder="请填拒绝理由"
				v-model="auditDec"
				type="textarea">
			</cl-input>
			<view class="footer mt30 mb30 flex">
				<cl-button class="flex1" @tap="visible = false">
					<text>取消</text>
				</cl-button>
				<cl-button class="flex1" type="primary" @tap="approveReject()">
					<text>提交</text>
				</cl-button>
			</view>
		</cl-popup>
		<cl-message ref="message"></cl-message>
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/parse.vue'
	import {
	    mapState 
	} from 'vuex'; 
	export default{
		data() {
			return {
				visible:false,
				id:'',
				clanId:'',
				detailVo:{
					clanMainRel:{}
				},
				auditDec: '',
			};
		},
		components: {
			uParse	
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			async loadData() {
				const detailVo = await this.$api.request.getMsgInfo({
					clanId:this.clanId,
					id:this.id,
					});
					if(detailVo.messageType===3){
						detailVo.givingInfo.status = 0;
						if(detailVo.givingInfo.givingBtime){
							let now = new Date().getTime();
							let startTime = new Date(detailVo.givingInfo.givingBtime.replace(/-/g,'/')).getTime();
							let endTime = new Date(detailVo.givingInfo.givingEtime.replace(/-/g,'/')).getTime();
							if(startTime > now){
								detailVo.givingInfo.status=1;
							}else if(startTime<=now && now <= endTime){
									detailVo.givingInfo.status=2;
							}else if(now > endTime){
									detailVo.givingInfo.status=3;
							}
						}
					}
				
					
				this.detailVo = detailVo;
			},
			makePhoneCall(phone){
				uni.makePhoneCall({
				    phoneNumber:phone,
				})
			},
			approvePass(){
				this.$api.request.auditUserUpdateMsg({
					messageType:this.detailVo.messageType,
					auditState:1,
					auditUserId:this.userInfo.userId,
					messageDec:'通过申请',
					id:this.detailVo.id,
				}).then(res=>{
					if(res.code===0){
						this.$refs["message"].open({
							type: 'success',
							message: "已通过申请！",
						});
					}else{
						this.$refs["message"].open({
							type: 'error',
							message: res.msg,
						});
					}
					this.loadData();
				});
			},
			approveReject(){
				if(!this.auditDec){
					this.$refs["message"].open({
						type:'cancel',
						message: "请填写拒绝理由",
					});
					return false;
				}
				this.$api.request.auditUserUpdateMsg({
					messageType:this.detailVo.messageType,
					auditState:2,
					auditUserId:this.userInfo.userId,
					messageDec:this.auditDec,
					id:this.detailVo.id,
				}).then(res=>{
					if(res.code===0){
						this.$refs["message"].open({
							type: 'success',
							message: "已驳回",
						});
					}else{
						this.$refs["message"].open({
							type: 'error',
							message: res.msg,
						});
					}
					this.loadData();
					this.visible = false;
				});
			},
		},
		async onLoad(options){
			if (!this.checkRouter()) {
				return;
			}
			this.id = parseInt(options.id);
			this.clanId = parseInt(options.clanId);
			if(this.id){
				this.loadData();
			}
			
		},

	}
</script>

<style lang='scss' scoped>
	.title{
		font-size: 36upx;
		line-height: 65upx;
		font-weight: bold;
	}
	.title2{
		margin-top: 20upx;
		padding-top: 20upx;
		color:$base-color;
		border-top:$border-color-base solid 2upx;
		font-size: 28upx;
		line-height: 65upx;
	}
	.sub-title{
		margin-top: 15upx;
		font-size: 32upx;
		display: flex;
		line-height: 50upx;
		.label{
			color:$font-color-light;
			width: 5.5em;
		}
		.value{
			flex: 1;
			
		}
	}
	.content{
		margin-top: 20upx;
		font-size: 30upx!important;
		line-height: 200%;
	}
</style>
