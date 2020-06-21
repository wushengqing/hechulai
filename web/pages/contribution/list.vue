<template>
	<view class="container">
		<navigator v-for="item in projectList " :url="`./detail?id=${item.id}`" class="item-link">
			<view class="title">{{ item.name }}</view>
			<view class="field field-user">
				<text class="label">发起人：</text>
				<text class="value ">{{ item.createUserId }}</text>
			</view>
			<view class="field field-clock">
				<text class="label">发起时间：</text>
				<text class="value yellow">{{ item.createTime }}</text>
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
