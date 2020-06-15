<template>
	<view class="container">
		<navigator url="../albumDetail/albumDetail" class="img-view mt-30">
			<image class="img-bg" src="../../static/temp/banner21.jpg"></image>
			<view class="desc-view">
				<view class="img-title">陈氏宗祠</view>
				<view class="img-desc">2019-08-09 • 6张</view>
			</view>
		</navigator>
		<navigator url="../albumDetail/albumDetail" class="img-view mt-30">
			<image class="img-bg" src="../../static/temp/banner21.jpg"></image>
			<view class="desc-view">
				<view class="img-title">陈氏宗祠</view>
				<view class="img-desc">2019-08-09 • 6张</view>
			</view>
		</navigator>
		<navigator url="../albumDetail/albumDetail" class="img-view mt-30">
			<image class="img-bg" src="../../static/temp/banner21.jpg"></image>
			<view class="desc-view">
				<view class="img-title">陈氏宗祠</view>
				<view class="img-desc">2019-08-09 • 6张</view>
			</view>
		</navigator>
		<navigator url="../albumDetail/albumDetail" class="img-view mt-30">
			<image class="img-bg" src="../../static/temp/banner21.jpg"></image>
			<view class="desc-view">
				<view class="img-title">陈氏宗祠</view>
				<view class="img-desc">2019-08-09 • 6张</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
