<template>
	<view class="container-dark" >
		<view class="notice-item mt30" style="display: flex;" v-for="item in familyList">
			<view class="headFileUrl-wrap"><image class="headFileUrl" :src="item.headFileUrl||`../../static/missing-face.png`"></image></view>
			<view class="content">
				<text class="title">
					<text class="c-base">{{ item.name }} </text>
					<text class=" font30" style="margin-left: 20upx;">{{ item.scName }}</text>
					<text class=" font30" style="margin-left: 20upx;">称呼：{{ item.call }}</text>
				</text>
				<text class="introduce">
					{{item.dec || '暂无介绍'}}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				familyList: []
			}
		},
		computed: {
			...mapState(['clanInfo', 'userInfo']),
		},
		methods: {
			async getZpList() {
				let family = await this.$api.request.getZpList({
					clanId: this.clanInfo.id,
					clansmanId: this.userInfo.clanManId,
				});
				family = family[0];
				this.familyList =[];
				//妻子列表
				family.spouseDtoList.forEach(item =>{
					this.familyList.push({
						name:item.spouseName,
						headFileUrl:item.headFileUrl,
						call:'妻子',
						scName:family.scName,
						dec:item.spouseDec
					})
				})
				//儿女列表
				family.sonDtoList.forEach(item =>{
					this.familyList.push({
						name:item.clansmanName,
						headFileUrl:item.headFileUrl,
						call:item.sex==='男'?"儿子":'女儿',
						scName:	item.scName,
						dec:item.clansmanDec
					});
					//儿媳妇
					item.spouseDtoList.forEach(wife=>{
						this.familyList.push({
							name:wife.spouseName||'不详',
							headFileUrl:item.headFileUrl,
							call:`儿媳妇(${item.clansmanName})之妻`,
							scName:	item.scName,
							dec:wife.spouseDec
						});
					});
					//孙辈
					item.sonDtoList.forEach(son=>{
						this.familyList.push({
							name:son.clansmanName,
							headFileUrl:son.headFileUrl,
							call:son.sex==='男'?`孙子(${item.clansmanName})之子`:`孙女(${item.clansmanName})之女`,
							scName:	son.scName,
							dec:son.clansmanDec
						});
					})
				})
				console.log(family);
			},
		},
		onShow() {
			if (!this.checkRouter()) {
				return;
			}
			this.getZpList();
		}
	}
</script>

<style lang='scss'>
	page {
		background-color: #f7f7f7;
		padding-bottom: 30upx;
	}

	.notice-item {
		margin-bottom: 20upx;
		display: flex;
		background-color: #fff;
		padding:10upx;
	}
	.headFileUrl-wrap{
	
		width: 150upx;
		.headFileUrl{
			width: 150upx;
			height: 150upx;
			border-radius: 50%;
		}
	}

	.content {
		
		flex: 1;
		padding: 0 20upx 0;
		border-radius: 4upx;
	
	}

	.title {
		display: flex;
		align-items: center;
		height: 90upx;
		font-size: 32upx;
		font-weight: bold;
		color: #303133;
	}

	.img-wrapper {
		width: 100%;
		height: 260upx;
		position: relative;
	}

	.pic {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 6upx;
	}

	.cover {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		font-size: 36upx;
		color: #fff;
	}

	.introduce {
		display: inline-block;
		padding: 16upx 0;
		font-size: 28upx;
		color: #606266;
		line-height: 38upx;
	}

	.bot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80upx;
		font-size: 24upx;
		color: #707070;
		position: relative;
	}

	.more-icon {
		font-size: 32upx;
	}
</style>
