<template>
	<view class="container">
		<view>
			<navigator v-for="item in list" :url="`/pages/user/messageDetail?id=${item.id}&clanId=${clanInfo.id}`" class="item-link">
				<view class="title" v-if="item.messageType===1">添加家庭成员</view>
				<view class="title" v-if="item.messageType===5">绑定宗亲</view>
				<view class="field">
					<text class="">{{ item.messageContent }}</text>
				</view>
				<view class="field">
					<text class="label">审核员：</text>
					<text class="value ">{{ item.auditUser ? item.auditUser.name:'' }}</text>
				</view>
				<view class="field">
					<text class="label">审核结果：</text>
					<text class="value ">{{ item.messageDec }}</text>
				</view>
				<view class="field field-clock">
					<text class="label">发起审核时间：</text>
					<text class="value yellow">{{ item.createTime }}</text>
				</view>
			</navigator>
			<view v-if="!loading && list.length>=totalNum" class="tc line88 c-grey">
				我是有底线的~
			</view>
			<view v-if="list.length===0 && totalNum===0" class="tc line88 c-grey">
				暂无数据~
			</view>
			<view v-if="loading" class="tc line88 c-grey">
				加载中...
			</view>
		</view>
	</view>
</template>	

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				list:[],
				loading:true,
				pageSize: 10,
				totalNum: 200,
				currentPage: 1
			}
		},
		computed: {
			...mapState(['clanInfo','userInfo']),
		},
		onLoad(options) {
		
		},
		onShow() {
			this.currentPage = 1;
			this.loadData();
		},
		//下拉刷新
		onPullDownRefresh() {
			this.currentPage = 1;
			this.loadData();
		},
		//加载更多
		onReachBottom() {
			if (this.list.length >= this.totalNum) {
				return;
			}
			this.loadData();
		},
		methods: {
			async loadData() {
				//
				if(!this.checkRouter()){
					return;
				}
				this.loading = true;
				let par = {
					clanId:this.clanInfo.id,
					clanMainId:this.userInfo.clanManId,
					pageSize: this.pageSize,
					currentPage: this.currentPage
				};
				const list = await this.$api.request.userMsgList(par);
				
				
				this.totalNum = list.totalNum
				if (this.currentPage === 1) {
					this.list = [];
				}
				this.currentPage++;
				this.list.push(...list.data);
				uni.stopPullDownRefresh();
				this.loading = false;
			},
		}
	}
</script>

<style lang="scss" scoped>
page{
	background: #f8f8f8;
}
.title{
	font-weight: bold;
}
</style>
