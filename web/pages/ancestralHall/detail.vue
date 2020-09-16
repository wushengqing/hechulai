<template>
	<view>
		<view class="container">
			<view class="carousel-section" style="border-radius: 20upx;overflow: hidden;">
				<!-- 背景色区域 -->
				<view class="titleNview-background" ></view>
				<swiper class="carousel" circular @change="swiperChange">
					<swiper-item 
						v-for="(item, index) in detailVo.fileList" 
						:key="index" class="carousel-item" >
						<image mode="aspectFill" :src="item.fileUrl" />
					</swiper-item>
				</swiper>
				<!-- 自定义swiper指示器 -->
				<view class="swiper-dots">
					<text class="num">{{swiperCurrent+1}}</text>
					<text class="sign">/</text>
					<text class="num">{{ detailVo.fileList.length }}</text>
				</view>
			</view>
			<view class="title">{{detailVo.name }}</view>
			<view class="content" v-html="detailVo.ancestralHallDec"></view>
			<view class="content-label">
				<view class="label">关联宗亲：</view>
				<view class="value">
					<navigator 
						class="c-base mr-20"
						v-for="item in detailVo.clanManList" 
						:url="`../familyTree/clan?id=${item.id}`">
						{{ item.name }}
					</navigator>
				</view>
				<view class="label">地址：</view>
				<view class="value mb30">
					{{ detailVo.ancestralHallAddess }}
				</view>
				<view class="label">地图位置：</view>
				<map 
					style="width: 100%; height: 400upx;" 
					:latitude="detailVo.latitude" 
					scale="14"
					:longitude="detailVo.longitude" 
					:markers="covers">
				</map>
			</view>
		</view>
		<view class="c-grey tc line88">我是有底线的~</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				id:'',
				swiperCurrent: 0,
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
				let mapVo = this.bMapTransQQMap(this.detailVo.longitude,this.detailVo.latitude)
				console.log(mapVo)
				this.detailVo.latitude= mapVo.lat
				this.detailVo.longitude= mapVo.lng
				this.covers = [
					{
						latitude:mapVo.lat,
						longitude:mapVo.lng,
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
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				//this.titleNViewBackground = this.bannerList[index].mienBgColor;
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
			//百度地图经纬度转腾讯地图经纬度
			bMapTransQQMap(lng, lat) {
			      let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
			      let x = lng - 0.0065;
			      let y = lat - 0.006;
			      let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
			      let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
			      let lngs = z * Math.cos(theta);
			      let lats = z * Math.sin(theta);
			      
			      return {
			          lng: lngs,
			          lat: lats        
			      }   
			}
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
		font-size: 40upx;
		line-height: 80upx;
		font-weight: bold;
	}
	.content-label{
		margin-top: 15upx;
		.label{
			line-height: 100upx;	
			font-size: 32upx;
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
