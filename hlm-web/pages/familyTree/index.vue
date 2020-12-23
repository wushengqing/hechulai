<template>
	<view class="container">
		<view class="full-page" >
			<view class="content">
				<text class="name">{{ clanInfo.name }}</text>
				<scroll-view scroll-y style="height: 600upx;">
					<view class="summary">
						{{ clanInfo.summary }}
					</view>
				</scroll-view>
				<view class="title1 mt30">在线族谱</view>
				<view class="mt30 mb30 flex">
					<cl-button class="flex1" type="primary" @tap="openPage('/pages/familyTree/branchList')">
						<text>按房系</text>
					</cl-button>
					<cl-button class="flex1" type="primary" @tap="openPage('/pages/familyTree/generationList')">
						<text>按字辈</text>
					</cl-button>
					<cl-button  class="flex1" type="primary" @tap="openPage('/pages/familyTree/search')">
						<text>按姓名</text>
					</cl-button>
				</view>
			</view>
			
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
			},
			openPage(url){
				uni.navigateTo({
				    url:url
				});
			}
					
		},
		onShow(){
			if(!this.checkRouter()){
				return;
			}

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
	width: 100%;
	height: calc(100% - var(--window-bottom));
	z-index: 999;
	font-size:$font-base;
	line-height: 60upx;
	display: flex;
	align-items: top;
	background: #ccc59d;
	background-image: url( '~@/static/book-bg.jpg');
	background-size: 100% 100%;
	.summary{
		text-indent: 2em;
	}
	.name{
		margin: 30upx 0 20upx;
		display: inline-block;
		text-align: center;
		line-height: 60upx;
		letter-spacing: 12upx;
		font-size: 40upx;
	}
}
	.content{
		padding:0 20upx 0 130upx;
	}
	
	.catalog{
		
	}
</style>
