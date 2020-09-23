<template>
	<view class="container form-box">
		<form @submit="formSubmit" @reset="formReset">
			<view class="form-item">
				<view class="label">宗族名称</view>
				<view class="field">
					{{ clanInfo.name }}
				</view>
			</view>
			<view class="form-item">
				<view class="label">您的房系</view>
				<view class="field">
					<picker @change="changeDirectory" :value="directoryIndex" :range="directoryList" range-key="name">
						<view class="uni-input">{{directoryIndex===-1 ?'请选择':directoryList[directoryIndex].name}}</view>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="label">您的世称</view>
				<view class="field">
					<picker @change="changeGeneration" :value="generationIndex" :range="generationList" range-key="name">
						<view class="uni-input">{{generationIndex===-1 ?'请选择': generationList[generationIndex].name}}</view>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="label">您的名字</view>
				<view class="field">
					<cl-popup :visible.sync="visible" direction="bottom">
						<view class="popup-box">
							<view class="popup-search" :class="{hide:clanUserRelList.length===0}">
								<cl-input v-model="keyword" placeholder="姓名快速查找"></cl-input>
							</view>
							<view class="popup-cent">
								<view class="user-list" v-for="(item,index) in clanUserRelListShow" @click="changeClanUserRel(item)">
									<image class="avatar" :src="item.headFileUrl || '../../static/missing-face.png'"></image>
									<view class="cent">
										<view class="bold cent-line">{{ item.clansmanName }}</view>
										<view class="cent-line">{{ item.clansmanDecAdd }}{{ item.clansmanDec }}</view>
									</view>
								</view>
								<view class="tc line88 c-grey" v-if="clanUserRelList.length===0">暂无数据，请确保已选择房系、世称</view>
							</view>
						</view>
						
					</cl-popup>
					<view @click="visible=true" class="uni-input">{{clanUserRelIndex===-1 ?'请选择':clanUserRelList[clanUserRelIndex].clansmanName}}</view>

				</view>
			</view>
			<view class="form-item">
				<view class="label">联系方式</view>
				<view class="field" style="padding-bottom: 30upx;">
					<cl-input v-model="formData.userNum" maxlength="11" placeholder="请输入您的手机号码"></cl-input>
				</view>
			</view>
			<view class="uni-btn-v">
				<button type="primary"  form-type="submit">提交申请</button>
			</view>
		</form>
	</view>
</template>
<script>
	import {
		mapState
	} from 'vuex';
	export default {
		computed: {
			...mapState(['userInfo','clanInfo']),
			clanUserRelListShow(){
				if(this.keyword){
					return this.clanUserRelList.filter(item=>item.clansmanName.indexOf(this.keyword)!==-1)
				}else{
					return this.clanUserRelList;
				}
			},
		},
		data() {
			return {
				generationList: [],
				generationIndex:-1,
				directoryList:[],
				directoryIndex:-1,
				clanUserRelList:[],
				clanUserRelIndex:-1,
				formData:{
					generationId:'',
					directoryId:'',
					name:'',
					userNum:''
					
				},
				keyword:'',
				visible:false
			}
		},
		methods: {
			formSubmit: function(e) {
				this.$api.request.userRelClanMain({
					id:this.userInfo.userId,
					clanId: this.clanInfo.id,
					clanManId:this.formData.clanUserRelId,
					userNum:this.formData.userNum
				}).then(res=>{
					if(res.code===0){
						uni.showToast({
						    title: '提交成功',
						    duration: 1000
						});
						setTimeout(()=>{
							uni.switchTab({
							    url: '/pages/index/index'
							});
						},1000)
					}else{
						uni.showToast({
							title: res.msg,
							icon:'none',
						});	
					}
				});
				
			},
			formReset: function(e) {
				console.log('清空数据')
			},
			async getDirectoryList() {
				//获取房系列表
				this.directoryList = await this.$api.request.directoryList({
					clanId: this.clanInfo.id
				})
			},
					
			async getGenerationList() {
				//获取世称列表
				this.generationList = this.directoryList.filter(item=>{
					return item.id === this.formData.directoryId
				})[0].scIds||[]
			},
		
			async getClanUserRelList() {
				//获取宗亲列表
				let clanUserRelList = await this.$api.request.clanUserRelList({
					clanId: this.clanInfo.id,
					currentPage:0,
					pageSize:10000,
					scId:this.formData.generationId,
					directoryId:this.formData.directoryId,
					//已审核
					auditState:1
				});
				clanUserRelList.filter(item=>!item.userId)
				let res = []
				clanUserRelList.forEach(item=>{
					res.push(item);
					//妻子
					if(item.spouseDtoList.length>0){
						res.push(...item.spouseDtoList.map(spouse=>{
							return {
								clansmanName:spouse.spouseName,
								clansmanId:spouse.spouseId,
								headFileUrl:spouse.headFileUrl,
								clansmanDecAdd:item.clansmanName+'之妻。',
								clansmanDec:spouse.spouseDec,
							}
						}));
					}
					// 女儿
					if(item.daughterDtoList.length>0){
						res.push(...item.daughterDtoList.map(daughter=>{
							return {
								clansmanName:daughter.daughterName,
								clansmanId:daughter.daughterId,
								headFileUrl:daughter.headFileUrl,
								clansmanDecAdd:item.clansmanName+'之女。',
								clansmanDec:daughter.spouseDec,
							}
						}));
					}
				})
				this.clanUserRelList = res;
			},
			//切换房系
			changeDirectory(e){
				this.directoryIndex = e.target.value;
				this.formData.directoryId = this.directoryList[e.target.value].id;
				if(e){
					this.changeGeneration();
					this.changeClanUserRel();
					this.getGenerationList(this.formData.directoryId);
				}
				
			},
			//选择世称
			changeGeneration(e){
				this.generationIndex = e ? e.target.value:-1;
				this.formData.generationId = e? this.generationList[e.target.value].id :'';
				if(e){
					this.changeClanUserRel();
					this.getClanUserRelList()
				}
				
			},
			
			changeClanUserRel(currItem){
				if(!currItem){
					this.clanUserRelIndex= -1
				}else{
					this.clanUserRelIndex = this.clanUserRelList.findIndex(item=>item.clansmanId == currItem.clansmanId)
				}
				this.formData.clanUserRelId = currItem ? currItem.clansmanId:'';
				this.visible = false; 
			}
		},
		onLoad() {
			this.getDirectoryList()
		}
	}
</script>

<style>
	.uni-form-item .title {
		padding: 20rpx 0;
	}
</style>
