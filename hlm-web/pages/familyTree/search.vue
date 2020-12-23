<template>
	<view class="container">
			<view style="padding: 30upx 0;"  class="title1">搜索</view>
			<view class="popup-box" style="height: calc(100vh - 150upx);">
				<view class="popup-search flex-wrap">
					<cl-input class="flex1" v-model="keyword" placeholder="姓名快速查找"></cl-input>
					<cl-button style="width: 200upx; margin-left: 10upx;" type="primary" @click="getClanUserRelList">查找</cl-button>
				</view>
				<view class="popup-cent">
					<view class="user-list" v-for="(item,index) in clanUserRelList" @click="openClanPage(item)">
						<image class="avatar" :src="item.headFileUrl || '../../static/missing-face.png'"></image>
						<view class="cent">
							<view class="bold cent-line">{{ item.clansmanName }}</view>
							<view class="cent-line">{{ item.clansmanDec}}</view>
						</view>
					</view>
					<view class="tc line88 c-grey" v-if="loaded && clanUserRelList.length===0">查询不到结果</view>
				</view>
			</view>
			<cl-message ref="message"></cl-message>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				show:false,
				keyword:'',
				clanUserRelList: [],
			}
		},
	
		computed: {
			...mapState(['clanInfo']),
		},
		methods: {
			async getClanUserRelList() {
				if(!this.keyword){
					this.$refs["message"].open({
						type: 'cancel',
						message: '请输入关键字',
					});
					return;
				}
				this.loaded = false;
				this.clanUserRelList = [];
				//获取宗亲列表
				let clanUserRelList = await this.$api.request.clanUserRelList({
					clanId: this.clanInfo.id,
					clanManName:this.keyword,
				});
				this.clanUserRelList = clanUserRelList;
				this.loaded = true;
			},
			openClanPage(item){
				uni.redirectTo({
				    url: `./clan?id=${item.clansmanId}`
				});
			},
		},
		onShow(){
			if(!this.checkRouter()){
				return;
			}
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
