<template>
	<view class="container">
		<view class="title">{{detailVo.name}}</view>
		<view class="detail">{{detailVo.givingDec }}</view>
		<view class="mt-30 field"><text class="iconfont mr-10">&#xe604</text>发起人：{{ detailVo.createUserId}}</view>
		<view class="mt-30 field"><text class="iconfont mr-10">&#xe60d</text>发起时间：{{detailVo.createTime}}</view>
		<view class="mt-30 field"><text class="iconfont mr-10">&#xe60f</text>当前进度：进行中</view>
		<view class="mt-30 field"><text class="iconfont mr-10">&#xe610</text>乐捐人数：{{ userList.length }}</view>
		<view class="mt-30 field"><text class="iconfont mr-10">&#xe611</text>乐捐金额：{{ totalMoney}}元</view>
		<view class="title2 mt-30">乐捐排行榜</view>
		<view class="user flex">
			<view class="flex1">
				<text class="index large c-red">1</text>
				<image class="avatar" src="../../static/temp/avatar.png"></image>
				<text class="name">巫卡卡</text>
			</view>
			<view class="money">
				<view class="value">50000.00</view>
				<view class="tip">捐款金额</view>
			</view>
		</view>
		<view class="user flex">
			<view class="flex1">
				<text class="index large c-yellow">2</text>
				<image class="avatar" src="../../static/temp/avatar2.jpg"></image>
				<text class="name">巫卡卡</text>
			</view>
			<view class="money">
				<view class="value">15840.00</view>
				<view class="tip">捐款金额</view>
			</view>
		</view>
		<view class="user flex">
			<view class="flex1">
				<text class="index  large c-green">3</text>
				<image class="avatar" src="../../static/temp/avatar4.jpg"></image>
				<text class="name">巫卡卡</text>
			</view>
			<view class="money">
				<view class="value">1000.00</view>
				<view class="tip">捐款金额</view>
			</view>
		</view>
		<view class="user flex">
			<view class="flex1">
				<text class="index">4</text>
				<image class="avatar" src="../../static/temp/avatar3.jpg"></image>
				<text class="name">巫卡卡</text>
			</view>
			<view class="money">
				<view class="value">200.00</view>
				<view class="tip">捐款金额</view>
			</view>
		</view>
		<view class="user flex">
			<view class="flex1">
				<text class="index">5</text>
				<image class="avatar" src="../../static/temp/avatar.png"></image>
				<text class="name">巫卡卡</text>
			</view>
			<view class="money">
				<view class="value">100.00</view>
				<view class="tip">捐款金额</view>
			</view>
		</view>
		<view class="tc c-grey h88">没有了~</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				id:'',
				detailVo:{
					
				},
				userList:[]
			}
		},
		methods: {
			async loadData() {
				//获取轮播图
				let par = {
					clanId:this.clanInfo.id,
				};
				const detailVo = await this.$api.request.projectList(par);
				const userList = await this.$api.request.projectUserList({givingId:this.id})
				this.detailVo = detailVo.filter(item=>item.id===parseInt(this.id))[0];
				//this.userList = userList;
			},
		},
		computed: {
			...mapState(['clanInfo']),
			totalMoney(){
				if(this.userList.length===0){
					return '0.00';
				}
				return '0.00';
			}
		},
		async onLoad(options){
			this.id = options.id;
			if(this.id){
				this.loadData();
			}
			
		},
	}
</script>

<style lang="scss">
.title{
	line-height: 80upx;
	font-size: 40upx;
}
.detail{
	font-size: 28upx;
	line-height: 50upx;
}
.title2{
	line-height: 80upx;
	font-size: 32upx;
}
.user{
	+.user{
		border-top: $border-color-dark solid 1px;;
	}
	 justify-content: space-between;
	 padding: 30upx 0;
	 .flex1{
		 vertical-align: middle;
		 .index{
			 vertical-align: middle;
			 display: inline-block;
			 width: 100upx;
			 height: 100upx;
			 line-height: 100upx;
			 font-size: 40upx;
			 text-align:center;
			 &.large{
				 font-size: 80upx;
			 }
		 }
		 .avatar{
		 	 vertical-align: middle;
			 display: inline-block;
			 width: 100upx;
			 height: 100upx;
			 border-radius: 50upx;
			 overflow: hidden;
			 margin: 0 30upx;
		 }
		 .name{
		 	font-size: 30upx;
		 }
	 }
	
	 .money{
		  vertical-align: middle;
		 display: inline-block;
		 width: 200upx;
		 line-height: 50upx;
		 text-align: center;
		 .value{
			 color: $uni-color-warning;
			 font-size: 40upx;
		 }
	 }
}
</style>
