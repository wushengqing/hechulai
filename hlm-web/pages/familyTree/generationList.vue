<template>
	<view class="container">
		<view>
			<view style="padding: 30upx 0 0 0;"  class="title1">世称字辈目录</view>
			<list-cell v-for="(item,index) in generationList" :title="item.name" :tips="`字辈：${item.seniority}`"  @eventClick="openGenerationPage(item)"  ></list-cell>
		</view>
	</view>
</template>

<script>
	import listCell from '@/components/mix-list-cell';
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				generationList: [],
			}
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
			openGenerationPage(item){
				uni.navigateTo({
				    url: `./generation?id=${item.id}&name=${item.name}(字辈：${item.seniority})`
				});
			}
					
		},
		onShow(){
			if(!this.checkRouter()){
				return;
			}
			this.getGenerationList();
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
