<template>
	<view class="container">
		<!-- <view style="padding: 30upx 0 0 0;"  class="title1">{{ name }}</view> -->
		<template v-for="pItem in clanUserRelList">
			<view class="title1" v-if="pItem[0].parentName">{{ pItem[0].parentName }}子嗣</view>
			<view class="title1" v-else>开山始祖</view>
			<view class="c-list">
				<view class="c-list-item" v-for="(item,index) in pItem"  @click="openClanPage(item)">{{ item.clansmanName }}</view>
			</view>
		</template>	
		<view class="control">
			<view class="action-btn" @click="changeShowBottom()">切换目录</view>
			<view class="current">
				当前目录：{{ name }}
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
				name:'',
				showBottom:false,
				clanUserRelList:[],
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
					clanId: this.clanInfo.id,
					scId:this.id,
					currentPage:0,
					pageSize:9999
				}
				const clanUserRelList = await this.$api.request.clanUserRelList(par);
				//通过 parentId 分组
				Array.prototype.groupBy = function(groupName){
					if(!groupName){ return this};
					let newAyy = [];
					let groupNameArr = [];
					let emptyGroupName = 'empty';
					this.forEach(item=>{
						let groupNameValue = item[groupName] || 'empty'
						let index = groupNameArr.indexOf(groupNameValue)
						if(index == -1){
							index = newAyy.length;
							groupNameArr.push(groupNameValue)
							newAyy.push([]);
						};
						newAyy[index].push(item);
					})
					return newAyy;
				}
				this.clanUserRelList = clanUserRelList.groupBy('parentId');
			},
			openClanPage(item){
				uni.redirectTo({
				    url: `./clan?id=${item.clansmanId}`
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
			this.name = options.name;
			
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
		max-height: 50%;
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
