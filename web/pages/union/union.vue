<template>
	<view class="container">
		 <uni-list-item :title=" item.name||'未命名宗族'" v-for="item in unionList" @click="changeClanId(item)"></uni-list-item>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex';
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	export default {
		components: {uniList,uniListItem},
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
