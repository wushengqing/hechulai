<template>
	<view v-show="ready">
		<view class="img-bg">
			<image class="img-jp" mode="aspectFill" src="../../static/jiapu.jpg"></image>
		</view>
		<view class="container">
			<view class="title">{{ clanUserInfo.name }}</view>
			<view class="desc">
				<view>房系：{{ clanUserInfo.directoryName }}</view>
				<view>世称：{{ clanUserInfo.scName }}</view>
				<view>性别：{{ clanUserInfo.sex||'男' }}</view>
				<view>出生日期：{{ clanUserInfo.birthDay }}</view>
				<view v-if=" clanUserInfo.endDay">去世日期：{{ clanUserInfo.endDay }}</view>
			</view>
			<view class="avatar" @tap="previewImage(clanUserInfo.headFileUrl)">
				<image class="avatar" :src="clanUserInfo.headFileUrl || '../../static/missing-face.png'"></image>
			</view>
			<view class="title1 mt-30">简介</view>
			<view class="mt-30 desc">{{ clanUserInfo.dec }}</view>
			<view class="control">
				<view class="action-btn" @click="changeShowBottom()">切换目录</view>
			</view>
			<view class="bottom-box" :class="showBottom?'show':''">
				<view class="bottom-item"  v-for="(item,index) in generationList" @click="openGenerationPage(item)">{{ item.name }}(字辈：{{item.seniority}})}</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import listCell from '@/components/mix-list-cell';
	import {mapState} from 'vuex';
	export default{
		data() {
			return {
				ready:false,
				id:'',
				generationId:'',
				generationName:'',
				showBottom:false,
				clanUserInfo:{},
				generationList:[]
			};
		},
		components: {
			listCell
		},
		computed: {
			...mapState(['clanInfo']),
		},
		methods: {
			async getGenerationList() {
				//获取房系列表
				this.generationList = await this.$api.request.generationList({
					clanId: this.clanInfo.id
				});
			},
			async loadData() {
				let par = {
					id: parseInt(this.id)
				}
				const clanUserInfo = await this.$api.request.clanUserInfo(par);
				this.clanUserInfo = clanUserInfo;
				uni.setNavigationBarTitle({
						title: this.clanUserInfo.name
				});
				this.ready = true
		
			},
			openClanPage(item){
				uni.redirectTo({
				    url: `./clan?id=${item.clansmanId || item.spouseId}`
				});
			},
			openGenerationPage(item){
				uni.redirectTo({
				    url: `./generation?id=${item.id}&name=${item.name}`
				});
			},
			changeShowBottom(){
				this.showBottom = !this.showBottom
			},
			previewImage(fileUrl) {
				if(!fileUrl){
					return
				}
				uni.previewImage({
					current: 0,
					urls:[fileUrl]
				});
			},
		},
		onLoad(options){
			this.id = options.id;
			this.generationId = options.generationId;
			this.generationName = options.generationName;
			
		},
		onShow(){
			if(!this.checkRouter()){
				return;
			}
			if(this.id){
				this.loadData();
				this.getGenerationList();
			}
		}

	}
</script>

<style lang='scss' scoped>
	page{
		background: #fff;
		line-height: 60upx;
	}
	.img-bg{
		.img-jp{
			width: 100%;
			height: 350upx;
		}
	}
	.container{
		position: relative;
		padding-bottom: 88upx;
		.avatar{
			width: 200upx;
			height: 200upx;
			position: absolute;
			top:20upx;
			right: 40upx;
		}
		.title{
			font-size: $font-lg;
			font-weight: bold;
		}
		.title1{
			font-size: $font-base;
		}
		.desc {
			line-height: 250%;
			margin-top: 20upx;
		}
	}
	.control{
		position:fixed;
		z-index: 20;
		left: 0;
		bottom: 0;
		height: 88upx;
		line-height: 88upx;
		background: #9e563a;
		width: 100%;
		display: flex;
		.action-btn{
			display: inline-block;
			width: 200upx;
			text-align: center;
			color:$uni-color-warning
		}
		.current{
			flex: 1;
			color:#fff
		}
	}
	.bottom-box{
		max-height: 50%;
		overflow: auto;
		transition: all .2s;
		position: fixed;
		left: 0;
		bottom:-50%;
		width:400upx;
		border-right:$border-color-dark solid 1upx ;
		z-index: 10;
		&.show{
			bottom:88upx
		}
		.bottom-item{
			background: rgba(158,86,58,.8);
			color: #fff;
			text-align: center;
			line-height: 59upx;
			border-top:$border-color-dark solid 1upx
		}
		
	}
	.c-list{
		margin: 20upx 0;
		display: flex;
		flex-wrap: wrap;
		.c-list-item{
			line-height: 250%;
			color: #693604;
			flex: 0 0 20%;
			text-align: center;
		}
	}
</style>
