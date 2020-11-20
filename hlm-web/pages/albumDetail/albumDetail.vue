<template>
	<view class="container-dark">
		<view class="img-list flex-wrap">
			<view class="img-view">
				<image class="img-cover" src="../../static/temp/banner1.jpg"></image>
			</view>
			<view class="img-view">
				<image class="img-cover" src="../../static/temp/banner2.jpg"></image>
			</view>
			<view class="img-view">
				<image class="img-cover" src="../../static/temp/banner3.jpg"></image>
			</view>
			<view class="img-view">
				<image class="img-cover" src="../../static/temp/banner1.jpg"></image>
			</view>
			<view class="img-view">
				<image class="img-cover" src="../../static/temp/banner1.jpg"></image>
			</view>
			<view class="img-view">
				<image class="img-cover" src="../../static/temp/banner1.jpg"></image>
			</view>
			<view class="img-view">
				<image class="img-cover" src="../../static/temp/banner1.jpg"></image>
			</view>
			<view class="img-view">
				<image class="img-cover" src="../../static/temp/banner2.jpg"></image>
			</view>
			<view class="img-view">
				<image class="img-cover" src="../../static/temp/banner3.jpg"></image>
			</view>
			<view class="img-view">
				<image class="img-cover" src="../../static/temp/banner1.jpg"></image>
			</view>
			<view class="img-view">
				<image class="img-cover" src="../../static/temp/banner1.jpg"></image>
			</view>
			<view class="img-view">
				<image class="img-cover" src="../../static/temp/banner1.jpg"></image>
			</view>
		</view>
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
	.container-dark{
		padding:10upx;
	}
	.img-view{
		width: 50%;
		padding: 5upx;
		height: 300upx;
		.img-cover{
			width: 100%;
			height: 100%;
			object-fit:cover
		}
	}
</style>
