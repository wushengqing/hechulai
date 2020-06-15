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
				<text class="cmName">
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
		border: $uni-color-primary solid 1upx;
		line-height: 80upx;
		color: $uni-color-primary;
		.scName{
		
			color: $font-color-light;
		}
		.cmName{
			
		}
	}
	.sx-icon{
		margin-bottom: 10upx;	
	}

	
}
</style>
