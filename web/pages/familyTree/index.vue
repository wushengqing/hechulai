<template>
	<view class="container">
		<view class="full-page"  :class="{show:show}">
			<text class="name">{{ clanInfo.name }}族谱</text>
		</view>
		<view class="title1" style="padding: 30upx 0 0 0;">祖训</view>
		<view class="content">
			{{ clanInfo.summary }}
		</view>
		<view>
			<view style="padding: 30upx 0 0 0;"  class="title1">族谱目录</view>
			<list-cell v-for="(item,index) in generationList" :title="item.name" :tips="item.phone"  @eventClick="openGenerationPage(item)"  ></list-cell>
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
				    url: `./generation?id=${item.id}&name=${item.name}`
				});
			}
					
		},
		onShow(){
			if(!this.checkRouter()){
				return;
			}
			this.show = false;
			setTimeout(()=>{
				this.show=true;
				this.getGenerationList();
			},2000)
		}
	}
</script>

<style lang="scss">
.full-page{
	position: fixed;
	z-index: 999;
	font-size: 80upx;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #ccc59d;
	transform: translateX(0%);
	&.show{
		transition: all .2s;
		transform: translateX(-100%);
	}
	.name{
		display: block;
		flex: 0 0 80upx;
	}
}
	.content{
		line-height: 60upx;
	}
	
	.catalog{
		
	}
</style>
