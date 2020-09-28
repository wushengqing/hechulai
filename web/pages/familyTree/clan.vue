<template>
	<view v-show="ready">
		<view class="img-bg">
			<image class="img-jp" src="../../static/jiapu.jpg"></image>
		</view>
		<view class="container">
			<view class="title1">{{ clanUserInfo.clansmanName }}</view>
			<view class="desc">
				<view>房系：{{ clanUserInfo.directoryName }}</view>
				<view>世称：{{ clanUserInfo.scName }}</view>
				<view>性别：{{ clanUserInfo.sex||'男' }}</view>
				<view>出生日期：{{ clanUserInfo.clansmanBirthDay }}</view>
				<view v-if=" clanUserInfo.clansmanendDay">去世日期：{{ clanUserInfo.clansmanendDay }}</view>
			</view>
			<view class="avatar">
				<image class="avatar" :src="clanUserInfo.headFileUrl || '../../static/missing-face.png'"></image>
			</view>
			
			<view class="title1 mt-30">简介</view>
			<view class="mt-30">{{ clanUserInfo.clansmanDec }}</view>
			
			<view class="title1 mt-30">配偶</view>
			<view class="c-list">
				<view v-if="!clanUserInfo.spouseDtoList || clanUserInfo.spouseDtoList.length==0">暂未收录</view>
				<view class="c-list-item" v-for="(item,index) in clanUserInfo.spouseDtoList"  @click="openClanPage2(item)">{{ item.spouseName }}</view>
			</view>
			<view class="title1 mt-30">儿子</view>
			<view class="c-list">
				<view v-if="!clanUserInfo.sonDtoList|| clanUserInfo.sonDtoList.length==0">暂未收录</view>
				<view class="c-list-item" v-for="(item,index) in clanUserInfo.sonDtoList"  @click="openClanPage(item)">{{ item.clansmanName }}</view>
			</view>
			<view class="title1 mt-30">女儿</view>
			<view class="c-list">
				<view v-if="!clanUserInfo.daughterDtoList|| clanUserInfo.daughterDtoList.length==0">暂未收录</view>
				<view class="c-list-item" v-for="(item,index) in clanUserInfo.daughterDtoList"  @click="openClanPage2(item)">{{ item.daughterName }}</view>
			</view>
			<view class="control">
				<view class="action-btn" @click="changeShowBottom()">切换目录</view>
				<view class="current">
					当前目录：{{ clanUserInfo.scName }}
				</view>
			</view>
			<view class="bottom-box" :class="showBottom?'show':''">
				<view class="bottom-item"  v-for="(item,index) in generationList" @click="openGenerationPage(item)">{{ item.name }}</view>
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
					clansmanId: parseInt(this.id),
					clanId:this.clanInfo.id
				}
				const clanUserInfo = await this.$api.request.getZpList(par);
				this.clanUserInfo = clanUserInfo[0];
				this.ready = true
		
			},
			openClanPage(item){
				uni.redirectTo({
				    url: `./clan?id=${item.clansmanId || item.spouseId}`
				});
			},
			openClanPage2(item){
				uni.redirectTo({
				    url: `./clan2?id=${item.clansmanId || item.spouseId}`
				});
			},
			openGenerationPage(item){
				uni.redirectTo({
				    url: `./generation?id=${item.id}&name=${item.name}`
				});
			},
			changeShowBottom(){
				this.showBottom = !this.showBottom
			}
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
		background: #d2c4a7;
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
		.title1{
			font-size: 40upx;
		}
		.desc{
			line-height: 60upx;
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
		width:200upx;
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
			line-height: 60upx;
			color: #693604;
			flex: 0 0 20%;
			text-align: center;
		}
	}
</style>
