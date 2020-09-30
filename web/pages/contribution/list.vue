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
	</view>
</template>	

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				projectList:[],
			}
		},
		computed: {
			...mapState(['clanInfo']),
		},
		methods: {
			async loadData() {
				//获取轮播图
				let par = {
					clanId:this.clanInfo.id,
				};
				const projectList = await this.$api.request.projectList(par);
				this.projectList = projectList;
			},
		},
		onShow(){
			if(!this.checkRouter()){
				return;
			}
			this.loadData();
		}
	}
</script>

<style lang="scss" scoped>
page{
	background: #f8f8f8;
}
</style>
