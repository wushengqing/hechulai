<template>
	<view class="container" style="padding: 0;">
		<view class="flex line88 tc">
			<view class="flex1 auditState-item" :class="{active:auditState===item.value}" v-for="item in auditStateList" @click="changeAuditState(item)">{{ item.label }}</view>
		</view>
		<view class="approve-body">
			<view class="notice-item" v-for="approveItem in approveList"  @click="navToDetailPage(approveItem)">
				<text class="time">{{ approveItem.createTime }}</text>
				<view class="content ">
					<view class="title flex">
						<view class="flex1" v-if="approveItem.messageType===1">添加家庭成员</view>
						<view class="flex1" v-if="approveItem.messageType===5">申请绑定宗亲</view>
					</view>
					<text class="introduce">
						{{ approveItem.messageContent }}
					</text>
					<text class="introduce">
						审核内容：{{ approveItem.messageDec }}
					</text>
					<view class="bot b-t">
						<text class="c-base" v-if="approveItem.auditState===0">去审核</text>
						<text class="c-yellow" v-if="approveItem.auditState===1">查看审核详情</text>
						<text class="c-red" v-if="approveItem.auditState===2">重新审核</text>
						<text class="more-icon yticon icon-you"></text>
					</view>
				</view>
			</view>
			<view v-if="!loading && approveList.length>=totalNum" class="tc line88 c-grey">
				我是有底线的~
			</view>
			<view v-if="approveList.length===0 && totalNum===0" class="tc line88 c-grey">
				暂无数据~
			</view>
			<view v-if="loading" class="tc line88 c-grey">
				加载中...
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
				auditStateList:[
					{label:'待审核',value:0},
					{label:'审核通过',value:1},
					{label:'已驳回',value:2},
				],
				visible:false,
				currentApprove:{},
				//审核列表
				approveList: [],
				auditDec:'',
				auditState:0,
				loading: true,
				pageSize: 10,
				totalNum: 200,
				currentPage: 1
			}
		},
		computed: {
			...mapState(['clanInfo', 'userInfo']),
		},
		onLoad(options) {
		
		},
		onShow() {
			this.currentPage = 1;
			this.loadData();
		},
		//下拉刷新
		onPullDownRefresh() {
			this.currentPage = 1;
			this.loadData();
		},
		//加载更多
		onReachBottom() {
			if (this.approveList.length >= this.totalNum) {
				return;
			}
			this.loadData();
		},
		methods: {
			async loadData() {
				if (!this.checkRouter()) {
					return;
				}
				this.loading = true;
				const approveList = await this.$api.request.getAuditMsgList({
					clanId: this.clanInfo.id,
					auditUserClanManId: this.userInfo.clanManId,
					auditState:this.auditState,
					pageSize: this.pageSize,
					currentPage: this.currentPage
				});
				this.totalNum = approveList.totalNum
				if (this.currentPage === 1) {
					this.approveList = [];
				}
				this.currentPage++;
				this.approveList.push(...approveList.data);
				uni.stopPullDownRefresh();
				this.loading = false;
			},
			//切换列表类型
			changeAuditState(item){
				this.auditState = item.value;
				this.currentPage=1;
				this.loadData();
			},
			//详情
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				let id = item.id;
				uni.navigateTo({
					url: `/pages/user/approveDetail?id=${id}&clanId=${this.clanInfo.id}`
				})
			},

		},
	}
</script>

<style lang='scss'>
	.approve-body{
		background-color: #f7f7f7;
	}
	.auditState-item{
		border-bottom:#ddd solid 4upx;
		&.active{
			color:$base-color;
			border-bottom:$base-color solid 4upx
		}
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
