<template>
	<view class="container">
		<view class="title">族委会会长</view>
		<view class="item-view">
			<image class="avatar" src="../../static/missing-face.png"></image>
			<view class="desc-view">
				<view class="name">陈孟星</view>
				<view class="desc">第三十九世 长子</view>
			</view>
		</view>
		<view class="title mt-30">族委会副会长</view>
		<view class="item-view">
			<image class="avatar" src="../../static/missing-face.png"></image>
			<view class="desc-view">
				<view class="name">陈孟星</view>
				<view class="desc">第三十九世 长子</view>
			</view>
		</view>
		<view class="title mt-30">族委会委员</view>
		<view class="list flex">
			<view class="item-view">
				<image class="avatar" src="../../static/missing-face.png"></image>
				<view class="desc-view">
					<view class="name">陈孟星</view>
					<view class="desc">第三十九世 长子</view>
				</view>
			</view>
			<view class="item-view">
				<image class="avatar" src="../../static/missing-face.png"></image>
				<view class="desc-view">
					<view class="name">陈孟星</view>
					<view class="desc">第三十九世 长子</view>
				</view>
			</view>
			<view class="item-view">
				<image class="avatar" src="../../static/missing-face.png"></image>
				<view class="desc-view">
					<view class="name">陈孟星</view>
					<view class="desc">第三十九世 长子</view>
				</view>
			</view>
			<view class="item-view">
				<image class="avatar" src="../../static/missing-face.png"></image>
				<view class="desc-view">
					<view class="name">陈孟星</view>
					<view class="desc">第三十九世 长子</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				organizationList:[],
			}
		},
		computed: {
			...mapState([ 'userInfo','clanInfo'])
		},
		methods: {
			async getClanOrganizationList(){
				let organizationList = await this.$api.request.organizationList({
					clanId:this.clanInfo.id
				});
				this.organizationList = organizationList;
			},
			
		},
		onShow(){
			if(!this.checkRouter()){
				return;
			}
			this.getClanOrganizationList();
		}
	}
</script>

<style lang="scss">
	.title{
		font-size: 36upx;
	}
	.item-view{
		border-bottom:$border-color-base solid 1px;
		display: flex;
		padding: 30upx 0;
		.avatar{
			width: 100upx;
			height: 100upx;
			border-radius: 50%;
			overflow: hidden;
		}
		.desc-view{
			padding-left: 20upx;
			flex:1;
			line-height: 50upx;
			.name{
				font-size: 32upx;
			}
			.desc{
				color: $font-color-disabled;
			}
		}
	}
	.list{
		flex-wrap: wrap;
		.item-view{
			width: 50%;
			border-bottom: none;
		}
	}
	
</style>
