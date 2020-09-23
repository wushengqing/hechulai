<template>
	<view class="container" >
		<template v-if="!loading">
			<list-cell  
			v-for="item in unionList" 
			:title="item.clanName || item.name||'未命名宗族'" 
			border="" 
			@eventClick="changeClanId(item)">
			</list-cell>	
		</template>
		 </view>
</template>

<script>
	import tools from '@/utils/tools';
	import { mapMutations } from 'vuex';
	import listCell from '@/components/mix-list-cell';
	export default {
		components: {listCell},
		data() {
			return {
				unionList:[],
				dnsList:[],
				redirect_uri:'',
				loading:false,
				pageName:'union'
			}
		},
		methods: {
			...mapMutations(['setClanInfo','login']),
			async getClanList(){
				this.unionList =  await this.$api.request.getClanList();
			},
			async getDnsList(){
				this.dnsList =  await this.$api.request.getDnsList();
			},
			changeClanId(clanInfo){
				this.setClanInfo(clanInfo);
				console.log(this.redirect_uri.split('/pages/')[1]);
				//#ifdef  H5
				 if(this.redirect_uri && this.redirect_uri.split('/pages/')[1]){
					uni.reLaunch({
						url: `/pages/${this.redirect_uri.split('/pages/')[1]}`
					}); 
				 }else{
					uni.reLaunch({
						url: '/pages/index/index'
					}); 
				 }
				//#endif
				//#ifndef H5
				uni.reLaunch({
					url: '/pages/index/index'
				});
				//#endif
			},
			async initPage(opctions){
				await this.getClanList();
				//判断当前环境
				//#ifdef  H5
				//判断是否为微信授权登录
				if(opctions.code){
					const loginVo = await this.$api.request.getOAuth({
						code:opctions.code,
						state:opctions.state
					});
					console.log(loginVo);
					if(loginVo.code===0){
						this.login(loginVo.data);
					}
				}
				await this.getDnsList();
				 let dnsName = window.location.origin +'/web';
				 let clan = this.dnsList.filter(item=>{
					 console.log(item.dnsName)
					 return item.dnsName===dnsName
				 });
				 let clanId = '';
				 if(clan && clan.length===1){
					 clanId = clan[0].clanId
				 };
				 if(clanId){
					 this.changeClanId(this.unionList.filter(item=>item.id===clanId)[0]);
				 }
				
				//#endif
			},
		},
		async onLoad(opctions){
			console.log(opctions)
			if(opctions.redirect_uri){
				this.redirect_uri = opctions.redirect_uri;
			}
			this.loading = true;
			await this.initPage(opctions);
			this.loading = false;
			
		}
	}
</script>

<style lang="scss" scoped>

</style>
