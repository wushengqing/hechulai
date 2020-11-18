<template>
	<view class="container">
		<view class="full-page" @click="show=true"  :class="{show:show}">
			<text class="name">{{ clanInfo.name }}族谱</text>
		</view>
		<view class="title1" style="padding: 30upx 0 0 0;">宗族简介</view>
		<view class="content">
			{{ clanInfo.summary }}
		</view>
		<view>
			<view style="padding: 30upx 0 0 0;"  class="title1">族谱目录</view>
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
				show:false,
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
			this.show = false;
			this.getGenerationList();
			setTimeout(()=>{
				this.show=true;
			},2000)
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
		line-height: 300%;
	}
	
	.catalog{
		
	}
</style>
