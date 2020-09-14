<template>
	<view class="container">
		<navigator v-for="item in ancestralHallList" :url="`../ancestralHall/detail?id=${item.id}`" class="img-view mt-30">
			<image class="img-bg" mode="aspectFill" :src="item.fileList.length>0 ? item.fileList[0].fileUrl :'../../static/jiapu.jpg'"></image>
			<view class="desc-view">
				<view class="img-title">{{ item.name }}</view>
				<view class="img-desc">{{ item.ancestralHallDec }}</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				ancestralHallList:[]
			}
		},
		computed: {
			...mapState(['clanInfo']),
		},
		onLoad(){
			this.$api.request.getAncestralHallList({
				clanId:this.clanInfo.id,
			}).then(res=>{
				if(res.code===0){
					this.ancestralHallList = res.data;
				}
			})
		}
	}
</script>

<style lang="scss">
	.img-view {
		display: flex;
		width: 100%;
		height: 200upx;
		overflow: hidden;
		position: relative;
		margin-bottom: 30upx;
		padding-top: 30upx;
		border-top: $border-color-base solid 1px;
		&:nth-child(1){
			margin-bottom: 0upx;
			padding-top: 0upx;
			border-top: none;
		}
		.img-bg{
			width: 300upx;
			height: 200upx;
			border-radius:10upx;
		}
		.desc-view{
			flex:1;
			width: 100%;
			height: 200upx;
			overflow: hidden;
			padding: 0 20upx;
			.img-title{
				font-size: 36upx;
				font-weight: bold;
			}
			.img-desc{
				margin-top: 10upx;
				line-height: 50upx;
			}
		}
	}
</style>
