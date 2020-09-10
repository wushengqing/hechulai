<template>
	<view class="container">
		<navigator v-for="item in ancestralHallList" :url="`../ancestralHall/detail?id=${item.id}`" class="img-view mt-30">
			<image class="img-bg" :src="item.fileList.length>0 ? item.fileList[0].fileUrl :'../../static/jiapu.jpg'"></image>
			<view class="desc-view">
				<view class="img-title">{{ item.name }}</view>
				<view class="img-desc">{{ item.ancestralHallDec }} • {{ item.fileList.length>0 ?item.fileList.length+'张':'无照片' }}</view>
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
		display: block;
		width: 100%;
		height: 400upx;
		border-radius: 20upx;
		overflow: hidden;
		position: relative;
		.img-bg{
			width: 100%;
			height: 400upx;
		}
		.desc-view{
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 80upx;
			line-height: 40upx;
			background: rgba(0,0,0,.5);
			color: #fff;
			padding: 0 20upx;
		}
	}
</style>
