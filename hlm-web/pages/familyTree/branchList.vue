<template>
	<view class="container">
		<view>
			<view style="padding: 30upx 0 0 0;"  class="title1">房系目录</view>
			<list-cell v-for="(item,index) in directoryList" :title="item.name"  @eventClick="openBranchDetail(item)"  ></list-cell>
		</view>
	</view>
</template>

<script>
	import listCell from '@/components/mix-list-cell';
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				directoryList: [],
			}
		},
		components: {
			listCell
		},
		computed: {
			...mapState(['clanInfo']),
		},
		methods: {
			async getDirectoryList() {
				//获取房系列表
				this.directoryList = await this.$api.request.directoryList({
					clanId: this.clanInfo.id
				});
			},
			
			openBranchDetail(item){
				uni.navigateTo({
				    url: `./branchDetail?id=${item.id}&name=${item.name}`
				});
			}
					
		},
		onShow(){
			if(!this.checkRouter()){
				return;
			}
			this.getDirectoryList();
			
		}
	}
</script>

<style lang="scss">
	page{
		background: #fff;
	}
.full-page{
	position: fixed;
	z-index: 999;
	font-size: 40upx;
	line-height: 80upx;
	display: flex;
	text-align: center;
	justify-content: center;
	align-items: top;
	background: #ccc59d;
	background-image: url( '~@/static/book-bg.jpg');
	background-size: 100% 100%;
	transform: translateX(0%);
	&.show{
		transition: all .2s;
		transform: translateX(-100%);
	}
	.name{
		margin: 250upx 0;
		display: inline-block;
		text-align: center;
		line-height: 80upx;
		letter-spacing: 12upx;
		writing-mode: vertical-rl;
		writing-mode: tb-lr;
		overflow: hidden;
		font-size: 60upx;
		padding-bottom: 80upx;
	}
}
	.content{
		line-height: 200%;
	}
	
	.catalog{
		
	}
</style>
