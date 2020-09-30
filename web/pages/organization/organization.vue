<template>
	<view>
	<view class="container" v-show="ready">
		<view class="title">族委会会长</view>
		<view class="item-view" v-for="item in list1">
			<image class="avatar" :src="item.headFileUrl ||'../../static/missing-face.png' "></image>
			<view class="desc-view">
				<view class="name">{{ item.clansmanName}}</view>
				<view class="desc">世称：{{ item.scName||'-' }} 性别：{{ item.sex}}</view>
				<view class="desc">简介：{{ item.clansmanDec }}</view>
			</view>
		</view>
		<view class="item-view" v-if="list1.length==0">
			暂未设置
		</view>
		<view class="title mt-30">族委会副会长</view>
		<view class="item-view" v-for="item in list2">
			<image class="avatar" :src="item.headFileUrl ||'../../static/missing-face.png' "></image>
			<view class="desc-view">
				<view class="name">{{ item.clansmanName}}</view>
				<view class="desc">世称：{{ item.scName||'-' }} </view>
					<view class="desc">性别：{{ item.sex}}</view>
					<view class="desc">简介：{{ item.clansmanDec }}</view>
			</view>
		</view>
		<view class="item-view" v-if="list2.length==0">
			暂未设置
		</view>
		<view class="title mt-30">族委会委员</view>
		<view class="list flex">
			<view class="item-view" v-for="item in list3">
				<image class="avatar" :src="item.headFileUrl ||'../../static/missing-face.png' "></image>
				<view class="desc-view">
					<view class="name">{{ item.clansmanName}}</view>
					<view class="desc">世称：{{ item.scName||'-' }}</view>
					<view class="desc">性别：{{ item.sex}}</view>
				</view>
			</view>
		</view>
		<view class="item-view" v-if="list3.length==0">
			暂未设置
		</view>
		<view class="fotter-bar">
			<button type="primary" @tap="visible=true">我要反馈</button>
		</view>
		<cl-popup :visible.sync="visible" direction="bottom">
			<view class="line88">
				反馈内容：
			</view>
			<cl-input style="width: 100%;" v-model="messageContent" placeholder="请输入" type="textarea">
			</cl-input>
			<view class="mb30">
			</view>
			<view class="footer flex">
				<cl-button class="flex1" type="primary" @tap="saveClanMsg">
					<text>提交反馈</text>
				</cl-button>
			</view>
		</cl-popup>
	</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				ready:false,
				visible:false,
				organizationList:[],
				messageContent:''
			}
		},
		computed: {
			...mapState([ 'userInfo','clanInfo']),
			//宗族族委会会长
			list1(){
				return this.organizationList.filter(item=>item.userAccessId===5)
			},
			//宗族族委会副会长
			list2(){
				return this.organizationList.filter(item=>item.userAccessId===6)
			},
			//宗族委员
			list3(){
				return this.organizationList.filter(item=>item.userAccessId===3)
			}
		},
		methods: {
			async getClanOrganizationList(){
				let organizationList = await this.$api.request.organizationList({
					clanId:this.clanInfo.id
				});
				this.organizationList = organizationList;
				setTimeout(()=>{
					this.ready = true;
				},1000)
			},
			saveClanMsg(){
				console.log(this.userInfo);
				this.$api.request.saveClanMsg({
					clanId:this.clanInfo.id,
					messageContent:this.messageContent,
					clanMainId:this.userInfo.clanManId
				}).then(res=>{
					if(res.code===0){
						uni.showToast({
						    title: '提交成功',
						    duration: 1000
						});
						this.visible = false;
					}else{
						uni.showToast({
							title: res.msg,
							icon:'none',
						});	
					}
				});
				this.messageContent = '';
			}
			
		},
		onShow(){
			if(!this.checkRouter()){
				return;
			}
			this.getClanOrganizationList();
		}
	}
</script>

<style lang="scss">
	.title{
		font-size: 36upx;
	}
	.item-view{
		border-bottom:$border-color-base solid 1px;
		display: flex;
		padding: 30upx 0;
		.avatar{
			width: 100upx;
			height: 100upx;
			border-radius: 50%;
			overflow: hidden;
		}
		.desc-view{
			padding-left: 20upx;
			flex:1;
			line-height: 50upx;
			.name{
				font-size: 32upx;
			}
			.desc{
				color: $font-color-disabled;
			}
		}
	}
	.list{
		flex-wrap: wrap;
		.item-view{
			width: 50%;
			border-bottom: none;
		}
	}
	
</style>
