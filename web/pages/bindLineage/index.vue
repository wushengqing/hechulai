<template>
	<view class="container form-box">
		<form @submit="formSubmit" @reset="formReset">
			<view class="form-item">
				<view class="label">祖宗名称</view>
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
					<picker @change="changeClanUserRel" :value="clanUserRelIndex" :range="clanUserRelList" range-key="clansmanName">
						<view class="uni-input">{{clanUserRelIndex===-1 ?'请选择':clanUserRelList[clanUserRelIndex].clansmanName}}</view>
					</picker>
				</view>
			</view>
			<view class="form-item">
				<view class="label">备注信息</view>
				<view class="field">
					 <textarea placeholder-style="color:#aaa" placeholder="请描述您的宗亲信息,如父亲,兄弟,信息越齐全,审核通过的成功率越高"/>
				</view>
			</view>
			<view class="uni-btn-v">
				<button type="primary" form-type="submit">提交申请</button>
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
			...mapState(['userInfo','clanInfo'])
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
					
				}
			}
		},
		methods: {
			formSubmit: function(e) {
				this.$api.request.userRelClanMain({
					id:this.userInfo.id,
					clanId: this.clanInfo.id,
					clanManId:this.formData.clanUserRelId
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
				this.clanUserRelList = await this.$api.request.clanUserRelList({
					clanId: this.clanInfo.id,
					currentPage:0,
					pageSize:10000,
					scId:this.formData.generationId,
					directoryId:this.formData.directoryId,
					//auditState:0
				})
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
			
			changeClanUserRel(e){
				this.clanUserRelIndex = e ? e.target.value:-1;
				this.formData.clanUserRelId = e? this.clanUserRelList[e.target.value].clansmanId:''
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
