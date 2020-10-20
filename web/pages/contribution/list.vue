<template>
	<view class="container">
		<navigator v-for="item in projectList " :url="`./detail?id=${item.id}`" class="item-link">
			<view class="title">{{ item.name }}</view>
			<view class="field field-user">
				<text class="label">发起人：</text>
				<text class="value ">{{ item.createUserName }}</text>
			</view>
			<view class="field ">
				<text class="label"><text class="iconfont mr-10">&#xe611</text>目标金额：</text>
				<text class="value">{{ item.givingSumMoney||'-' }}</text>
			</view>
			<view class="field field-clock">
				<text class="label">发起时间：</text>
				<text class="value yellow">{{ item.givingBtime }}</text>
			</view>
			<view class="field field-clock">
				<text class="label">截止时间：</text>
				<text class="value yellow">{{ item.givingEtime }}</text>
			</view>
		</navigator>
		<view v-if="!loading && projectList.length>=totalNum && totalNum!==0" class="tc line88 c-grey">
			我是有底线的~
		</view>
		<view v-if="projectList.length===0 && totalNum===0" class="tc line88 c-grey">
			暂无数据~
		</view>
		<view v-if="loading" class="tc line88 c-grey">
			加载中...
		</view>
	</view>
</template>	

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				projectList:[],
				loading: true,
				pageSize: 10,
				totalNum: 200,
				currentPage: 1
			}
		},
		computed: {
			...mapState(['clanInfo']),
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
			if (this.projectList.length >= this.totalNum) {
				return;
			}
			this.loadData();
		},
		methods: {
			async loadData() {
				if(!this.checkRouter()){
					return;
				}

				//获取
				this.loading = true;
				const projectList = await this.$api.request.projectList({
					clanId: this.clanInfo.id,
					pageSize: this.pageSize,
					currentPage: this.currentPage
				});
				this.totalNum = projectList.totalNum
				if (this.currentPage === 1) {
					this.projectList = [];
				}
				this.currentPage++;
				this.projectList.push(...projectList.data);
				uni.stopPullDownRefresh();
				this.loading = false;
			},
		},
	}
</script>

<style lang="scss" scoped>
page{
	background: #f8f8f8;
}
</style>
