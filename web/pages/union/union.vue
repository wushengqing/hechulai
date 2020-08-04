<template>
	<view class="container">
		 <list-cell  v-for="item in unionList" :title="item.clanName||'未命名宗族'" border="" @eventClick="changeClanId(item)"></list-cell>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex';
	import listCell from '@/components/mix-list-cell';
	export default {
		components: {listCell},
		data() {
			return {
				unionList:[],
			}
		},
		methods: {
			...mapMutations(['setClanInfo']),
			async getDnsList(){
				this.unionList =  await this.$api.request.getDnsList();
			},
			changeClanId(clanInfo){
				this.setClanInfo(clanInfo);
				uni.reLaunch({
					url: '/pages/index/index'
				});
				
			}
		},
		onLoad(){
			this.getDnsList()
		}
	}
</script>

<style lang="scss" scoped>

</style>
