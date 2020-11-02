<template>
	<view class="container">
		<view v-if="!loading">
			<navigator v-for="item in projectList" :url="`/pages/contribution/detail?id=${item.givingId}`" class="item-link">
				<view class="title">{{ item.givingName }}</view>
				<view class="field">
					<text class="label">乐捐金额：</text>
					<text class="value ">{{ item.giveMoney }}</text>
				</view>
				<view class="field">
					<text class="label">乐捐时间：</text>
					<text class="value yellow">{{ item.createTime }}</text>
				</view>
				<view class="field">
					<text class="label">乐捐备注：</text>
					<text class="value ">{{ item.giveDec }}</text>
				</view>
			</navigator>
			<view v-if="projectList.length===0" class="tc line88 c-grey">
				暂无数据~
			</view>
		</view>
		<view v-else class="tc line88 c-grey">
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
				loading:true
			}
		},
		computed: {
			...mapState(['userInfo']),
		},
		methods: {
			async loadData() {
				//
				let par = {
					userId:this.userInfo.clanManId,
				};
				const projectList = await this.$api.request.projectUserList(par);
				this.projectList = projectList.data;
				this.loading=false
			},
		},
		onShow(){
			if(!this.checkRouter()){
				return;
			}
			this.loading=true
			this.loadData();
		}
	}
</script>

<style lang="scss" scoped>
page{
	background: #f8f8f8;
}
</style>
