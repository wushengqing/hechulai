<template>
	<view class="container">
		<!-- <view style="padding: 30upx 0 0 0;"  class="title1">{{ name }}</view> -->
		<view class="title1">{{ clanUserInfo.name }}</view>
		<view class="form-box">
			<view class="form-item">
				<view class="label">出生年月</view>
				<view class="field">
					{{ clanUserInfo.birthDay }}
				</view>
			</view>
			<view class="form-item">
				<view class="label">性别</view>
				<view class="field">
					{{ clanUserInfo.sex }}
				</view>
			</view>
			<view class="form-item">
				<view class="label">简介</view>
				<view class="field">
					{{ clanUserInfo.dec }}
				</view>
			</view>
		</view>
		<view class="title1">配偶1</view>
		
		<view class="title1">配偶2</view>
		
		<view class="title1">子女1</view>
		
		<view class="title1">子女2</view>
		
		<view class="control">
			<view class="action-btn" @click="changeShowBottom()">切换目录</view>
			<view class="current">
				当前目录：{{ generationName }}
			</view>
		</view>
		<view class="bottom-box" :class="showBottom?'show':''">
			<view class="bottom-item"  v-for="(item,index) in generationList" @click="openGenerationPage(item)">{{ item.name }}</view>
		</view>
	</view>
</template>

<script>
	import listCell from '@/components/mix-list-cell';
	import {mapState} from 'vuex';
	export default{
		data() {
			return {
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
		
			},
			openClanPage(item){
				
			},
			openGenerationPage(item){
				uni.navigateTo({
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
	.container{
		padding-bottom: 88upx;
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
		height: 240upx;
		overflow: auto;
		transition: all .2s;
		position: fixed;
		left: 0;
		bottom:-320upx;
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
</style>
