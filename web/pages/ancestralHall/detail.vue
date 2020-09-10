<template>
	<view class="container">
		<view class="title">{{detailVo.name }}</view>
		<view class="content" v-html="detailVo.ancestralHallDec"></view>
		<view class="content-label">
			<view class="label">关联宗亲：</view>
			<view class="value">
				<navigator 
					class="c-base mr-20"
					v-for="item in detailVo.clanManList" 
					:url="'../familyTree/clan?id=${item.id}'">
					{{ item.name }}
				</navigator>
			</view>
			<view class="label">所在地区：</view>
			<view class="value mb30">
				{{ detailVo.ancestralHallAddess }}
			</view>
			<map 
				style="width: 100%; height: 400upx;" 
				:latitude="detailVo.latitude" 
				scale="14"
				:longitude="detailVo.longitude" 
				:markers="covers">
			</map>
			<view class="label">相册展示：</view>
			<view class="img-list flex-wrap">
				<view class="img-view" v-for="item in detailVo.fileList">
					<image class="img-cover" mode="aspectFill" @tap="previewImage(index)"  :src="item.fileUrl"></image>
				</view>
			
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data() {
			return {
				id:'',
				detailVo:{
					clanManList:[],
					fileList:[]
				},
				covers:[]
			};
		},
		methods: {
			async loadData() {
				//获取轮播图
				const detailVo = await this.$api.request.getAncestralHallInfo({id:this.id});
				this.detailVo = detailVo;
				this.detailVo.latitude=24.494134
				this.detailVo.longitude=118.188087
				this.covers = [
					{
						latitude:'24.494134',
						longitude:'118.188087',
						title:this.detailVo.name,
						callout:{
							bgColor:'white',
							content:this.detailVo.name,
							padding:'40upx',
							display:"ALWAYS"
						}
					}
				]
			},
			//预览大图
			previewImage(index) {
				let imgArray = [];
				this.detailVo.fileList.forEach(item=>{
					imgArray.push(item.fileUrl)
				})
				uni.previewImage({
					urls: imgArray,
					current:index,
					loop:true
				});
			},
		},
		computed: {
	
		},
		async onLoad(options){
			this.id = options.id;
			if(this.id){
				this.loadData();
			}
			
		},

	}
</script>

<style lang='scss' scoped>
	.title{
		font-size: 30upx;
		line-height: 45upx;
		font-weight: bold;
	}
	.content-label{
		margin-top: 15upx;
		.label{
			line-height: 80upx;	
			color: #222;
			font-weight: bold;
		}
		.value{
			margin-right: 30upx;
			.c-base{
				display: inline-block;
			}
		}
	}
	.content{
		margin-top: 20upx;
		font-size: 28upx!important;
		line-height: 200%;
	}
	.img-view{
		width: 50%;
		padding: 5upx;
		height: 300upx;
		.img-cover{
			width: 100%;
			height: 100%;
			object-fit:cover
		}
	}
</style>
