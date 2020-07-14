<template>
	<view class="container">
		 <list-cell  v-for="item in unionList" :title="item.name||'未命名宗族'" border="" @eventClick="changeClanId(item)"></list-cell>
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
			async getClanList(){
				this.unionList =  await this.$api.request.getClanList();
			},
			changeClanId(clanInfo){
				this.setClanInfo(clanInfo);
				uni.reLaunch({
					url: '/pages/index/index'
				});
				
			}
		},
		onLoad(){
			this.getClanList()
		}
	}
</script>

<style lang="scss" scoped>

</style>
