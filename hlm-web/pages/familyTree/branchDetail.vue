<template>
	<view class="container">
		<view>
			<view style="padding: 30upx 0;"  class="title1">{{name}}</view>
			<view v-for="grop in clanUserRelListShow">
				<view class="gropName">{{ grop[0].scName }}</view>
				<view class="c-list">
					<view class="c-list-item" v-for="(item,index) in grop"  @click="openClanPage(item)">{{ item.clansmanName }}</view>
				</view>
			</view>
			<view class="" v-if="loading">加载中...</view>
		</view>
		<view class="control">
				<view class="action-btn" @click="changeShowBottom()">切换目录</view>
				<view class="current">
					当前目录：{{ name }}
				</view>
			</view>
			<view class="bottom-box" :class="showBottom?'show':''">
				<view class="bottom-item"  v-for="(item,index) in directoryList" @click="openGenerationPage(item)">{{ item.name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import tools from '../../utils/tools'

	export default {
		data() {
			return {
				loading:false,
				id:'',
				name:'',
				showBottom:false,
				directoryList:[],
				clanUserRelList: [],
			}
		},
		computed: {
			...mapState(['clanInfo']),
			clanUserRelListShow(){
				if(this.clanUserRelList.length===0){
					return [];
				}
				console.log(tools.groupBy(this.clanUserRelList,'scId'))
				return tools.groupBy(this.clanUserRelList,'scId')
			},
		},
		methods: {
			async getDirectoryList() {
				//获取房系列表
				this.directoryList = await this.$api.request.directoryList({
					clanId: this.clanInfo.id
				});
			},
			async getClanUserRelList() {
				//获取房系宗亲列表
				this.loading = true;
				this.clanUserRelList = await this.$api.request.clanUserRelList({
					clanId: this.clanInfo.id,
					directoryId:this.id
				});
					this.loading = false;
			},
			changeShowBottom(){
				this.showBottom = !this.showBottom
			},
			openGenerationPage(item){
				uni.navigateTo({
				    url: `./branchDetail?id=${item.id}&name=${item.name}`
				});
			},
			openClanPage(item){
				uni.redirectTo({
				    url: `./clan?id=${item.clansmanId}`
				});
			},
					
		},
		onLoad(options){
			this.id = options.id;
			this.name = options.name;
			this.getClanUserRelList();
			this.getDirectoryList();
		},
		onShow(){
			if(!this.checkRouter()){
				return;
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #fff;
	}
	.container{
		padding-bottom: 88upx;
	}
	.gropName{
		font-weight: bold;
		border-top:$border-color-base dashed 2upx;
		padding-top: 20upx;
	}
	.c-list{
		margin: 20upx 0 20upx 40upx;
		display: flex;
		flex-wrap: wrap;
		.c-list-item{
			line-height: 60upx;
			color: #693604;
			flex: 0 0 20%;
			text-align: center;
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
			text-align: left;
			padding-left: 20upx;
			line-height: 59upx;
			border-top:$border-color-dark solid 1upx
		}
		
	}
</style>
