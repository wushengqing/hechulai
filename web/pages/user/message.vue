<template>
	<view class="container">
		<view v-if="!loading">
			<navigator v-for="item in list" :url="`/pages/user/messageDetail?id=${item.id}&clanId=${clanInfo.id}`" class="item-link">
				<view class="title" v-if="item.messageType===1">添加家庭成员</view>
				<view class="title" v-if="item.messageType===5">绑定宗亲</view>
				<view class="field ">
					<text class="label">消息详情：</text>
					<text class="value ">{{ item.messageContent }}</text>
				</view>
				<view class="field field-user">
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
			<view v-if="list.length===0" class="tc line88 c-grey">
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
				list:[],
				loading:true
			}
		},
		computed: {
			...mapState(['clanInfo','userInfo']),
		},
		methods: {
			async loadData() {
				//
				let par = {
					clanId:this.clanInfo.id,
					clanMainId:this.userInfo.clanManId,
				};
				const list = await this.$api.request.userMsgList(par);
				this.list = list;
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
