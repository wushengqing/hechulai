<template>
	<view class="container">
		<view class="sx-list" v-for="(item,index) in sxList">	
		<view class="sx-icon" style="margin-top: 40upx;"  v-if="index === 0" >
			<text class="iconfont">开始</text>
		</view>
		<view class="sx-icon" >
			<text  class="iconfont">&#xe613</text>
		</view>
			<view class="sx-desc">
				<text class="scName">{{ item.scName}}</text>
				<text class="cmName" @click="openClanPage(item)">
					{{ item.cmName}}
					<text v-if="userInfo.clanManId && item.cmId==userInfo.clanManId">(自己)</text>
				</text>
			</view>
			
		</view>
	</view>
</template>

<script>
   import { mapState } from 'vuex';  
	export default {
		data() {
			return {
				sxList:[],
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			async getSxList(){
				let sxList = await this.$api.request.sxList({
					clansmanId:this.userInfo.clanManId
				});
				sxList.sort((a,b)=>a.scId-b.scId);
				this.sxList = sxList;
			},
			openClanPage(item){
				uni.navigateTo({
				    url: `../familyTree/clan?id=${item.cmId}`
				});
			},
		},
		onShow(){
			if(!this.checkRouter()){
				return;
			}
			this.getSxList();
			
		},
	}
</script>

<style scoped lang="scss">
.sx-list{
	width: 300upx;
	margin:0 auto 10upx auto;
	text-align: center;
	.sx-desc{
		border: #984c06 solid 1upx;
		border-radius: 10upx;
		background: #984c06 ;
		line-height: 80upx;
		color: #fff;
		.scName{
			color: $uni-color-warning;
			margin-right: 10upx;
		}
		.cmName{
			
		}
	}
	.sx-icon{
		margin-bottom: 10upx;	
	}

	
}
</style>
