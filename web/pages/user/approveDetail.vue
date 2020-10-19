<template>
	<view class="container" :class="{pb100:detailVo.auditState!==1}">
		<view class="title" v-if="detailVo.messageType===1">添加家庭成员</view>
		<view class="title" v-if="detailVo.messageType===5">绑定宗亲</view>
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
			<text class="value" @click="makePhoneCall(detailVo.clanMainRel.userNum)">{{ detailVo.clanMainRel.userNum }}</text>
		</view>
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
		<view class="fotter-bar flex" v-if="detailVo.auditState!==1">
			<cl-button v-if="!detailVo.auditState|| detailVo.auditState===0" class="flex1" @tap="visible = true">
				<text>驳回审核</text>
			</cl-button>
			<cl-button class="flex1" type="primary" @tap="approvePass">
				<text v-if="!detailVo.auditState|| detailVo.auditState===0" >通过审核</text>
				<text v-if="detailVo.auditState===2" >重新通过审核</text>
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
				approveApi:'',
			};
		},
		components: {
			uParse	
		},
		methods: {
			async loadData() {
				const detailVo = await this.$api.request.getMsgInfo({
					clanId:this.clanId,
					id:this.id,
					});
				this.detailVo = detailVo;
				if(detailVo.messageType===1){
					this.approveApi = this.$api.request.auditUserUpdateClanMain;
				}else if(detailVo.messageType===5){
					this.approveApi = this.$api.request.auditUserUpdateClanMainRel;
				}
			},
			makePhoneCall(phone){
				uni.makePhoneCall({
				    phoneNumber:phone,
				})
			},
			approvePass(){
				this.approveApi({
					clanId:this.clanId,
					auditState:1,
					auditDec:'通过申请',
					id:this.detailVo.id,
				}).then(res=>{
					if(res.code===0){
						this.$refs["message"].open({
							type: 'success',
							message: "已提交，请等待审核",
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
				this.approveApi({
					clanId:this.clanId,
					auditState:2,
					auditDec:this.auditDec,
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
		computed: {
		
			
		},
		async onLoad(options){
			this.id = options.id;
			this.clanId = options.clanId;
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
