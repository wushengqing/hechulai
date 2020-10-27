<template>
	<view class="container" @touchstart="touchStart" @touchend="touchEnd">
		<form>
			<view class="uni-textarea">
				<textarea placeholder="请输入内容(50字以内)" v-model="input_content" />
				</view>
			<view class="img-list flex-wrap">
				<view class="img-view2" v-for="(item,index) in imageList" :style="{display:item.hide?'none':''}">
					<image lazy-load 
					mode="aspectFill"
					class="img-cover" :src="item.minFileUrl||item.fileUrl" @tap="previewImage(index)"></image>
					<view class="set-cover" @click.stop="setAsCover(item)"><text class="iconfont font28">&#xe619</text></view>
					<view class="delete" @click.stop="deletePhoto(item)"><text class="iconfont f22">&#xe618</text></view>
				</view>
				<view class="img-view2-add" @tap="chooseImage()">
					<text class="iconfont">&#xe617</text>
				</view>
				
			</view>
			
			<view class="footer" >
				<cl-button class="w100off" type="primary" @click="publish">提交</cl-button>
			</view>
		</form>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				// title: 'choose/previewImage',
				input_content:'',
				imageList: [],
				id:'',
			
			}
		},
		onUnload(opctions) {
			
		},
		
		methods: {
			async publish(){
				if (!this.input_content) {
					uni.showModal({ content: '内容不能为空', showCancel: false, });
					return;
				}
				
				uni.showLoading({title:'发布中'});
				
				var location = await this.getLocation();//位置信息,可删除,主要想记录一下异步转同步处理
				var images = [];
				for(var i = 0,len = this.imageList.length; i < len; i++){
					var image_obj = {name:'image-'+i,uri:this.imageList[i]};
					images.push(image_obj);
				}
				
				
			},
			
			
			
			close(e){
			    this.imageList.splice(e,1);
			},
		
			
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			touchStart: function(e) {
				this.startX = e.mp.changedTouches[0].pageX;
			},
			
			touchEnd: function(e) {
				this.endX = e.mp.changedTouches[0].pageX;
				if (this.endX - this.startX > 200) {
					uni.navigateBack();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.footer {
		margin-top: 80upx;
	}

	.uni-textarea {
		width: auto;
		padding: 20upx 25upx;
		line-height: 1.6;
		height: 150upx;
		border-bottom:#ddd solid 1upx;
		margin-bottom: 20upx;
	}
.img-view {
		display: block;
		flex: 0 0 48%;
		
		overflow: hidden;
		position: relative;
		.img-bg{
			border-radius: 10upx;
			width: 100%;
			height:330upx;
			box-sizing: border-box;
			border:$border-color-dark solid 1upx;
		}
	}
	.img-view2-add{
		width: 33.3333333%;
		box-sizing: border-box;
		padding: 0upx;
		height: 240upx;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		background: #f1f1f1;
		.iconfont{
			flex: 1;
			color: #999;
			font-size: 60upx;
		}
	}
</style>
