<template>
	<view class="container">
		<view class="notice-item">
			<text class="time">11:30</text>
			<view class="content">
				<text class="title">申请绑定宗亲</text>
				<text class="introduce">
					用戶u23213213，微信号：妖气的卡卡，申请绑定为宗亲巫卡卡
				</text>
				<view class="bot b-t">
					<text>查看详情</text>
					<text class="more-icon yticon icon-you"></text>
				</view>
			</view>
		</view>
		<view class="notice-item">
			<text class="time">昨天 12:30</text>
			<view class="content">
				<text class="title">申请绑定宗亲</text>
				<text class="introduce">
					用戶u23213213，微信号：妖气的卡卡，申请绑定为宗亲巫卡卡
				</text>
				<view class="bot b-t">
					<text>查看详情</text>
					<text class="more-icon yticon icon-you"></text>
				</view>
			</view>
		</view>
		<view class="notice-item">
			<text class="time">2019-07-26 12:30</text>
			<view class="content">
				<text class="title">申请绑定宗亲</text>
				<text class="introduce">
					用戶u23213213，微信号：妖气的卡卡，申请绑定为宗亲巫卡卡
				</text>
				<view class="bot b-t">
					<text>查看详情</text>
					<text class="more-icon yticon icon-you"></text>
				</view>
			</view>
		</view>
		<view class="notice-item">
			<text class="time">2019-07-26 12:30</text>
			<view class="content">
				<text class="title">申请绑定宗亲</text>
				<text class="introduce">
					用戶u23213213，微信号：妖气的卡卡，申请绑定为宗亲巫卡卡
				</text>
				<view class="bot b-t">
					<text>查看详情</text>
					<text class="more-icon yticon icon-you"></text>
				</view>
			</view>
		</view>
		<view class="notice-item">
			<text class="time">2019-07-26 12:30</text>
			<view class="content">
				<text class="title">申请绑定宗亲</text>
				<text class="introduce">
					用戶u23213213，微信号：妖气的卡卡，申请绑定为宗亲巫卡卡
				</text>
				<view class="bot b-t">
					<text>查看详情</text>
					<text class="more-icon yticon icon-you"></text>
				</view>
			</view>
		</view>
		<view class="notice-item">
			<text class="time">2019-07-26 12:30</text>
			<view class="content">
				<text class="title">申请绑定宗亲</text>
				<text class="introduce">
					用戶u23213213，微信号：妖气的卡卡，申请绑定为宗亲巫卡卡
				</text>
				<view class="bot b-t">
					<text>查看详情</text>
					<text class="more-icon yticon icon-you"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				approveList: []
			}
		},
		computed: {
			...mapState(['clanInfo', 'userInfo']),
		},
		methods: {
			getUserApproveList() {
				this.approveList = this.$api.request.userApproveList({
					clanId: this.clanInfo.id,
					auditUserClanManId: this.userInfo.auditUserClanManId
				});
			},
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
	page {
		background-color: #f7f7f7;
		padding-bottom: 30upx;
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
		font-size: 32upx;
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
