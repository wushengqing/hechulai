<template>
	<view class="container">
		<view class="full-page"  :class="{show:show}">
			<text class="name">{{ clanInfo.name }}族谱</text>
		</view>
		<view class="title1" style="padding: 30upx 0 0 0;">族谱简介</view>
		<view class="content">
			<view>本族谱修订于公元二零零八年，由巫晓明（仁宗房，二十四世）等宗亲出资修订。</view>
			<view style="font-weight: 600;">特别感谢乐捐宗亲：</view>
			<view>巫晓明：60000元</view>
			<view>巫晓明：60000元</view>
			<view>巫晓明：60000元</view>
			<view>巫晓明：60000元</view>
			<view>巫晓明：60000元</view>
			<view>巫晓明：60000元</view>
			<view>巫晓明：60000元</view>
			<view>巫晓明：60000元</view>
			<view>巫晓明：60000元</view>
			<view>巫晓明：60000元</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				show:false,
			}
		},
		computed: {
			...mapState(['clanInfo']),
		},
		methods: {
			
		},
		onShow(){
			this.show = false;
			setTimeout(()=>{
				this.show=true;
			},2000)
		}
	}
</script>

<style lang="scss">
.full-page{
	font-size: 80upx;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #ccc59d;
	transform: translateX(0%);
	&.show{
		transition: all .2s;
		transform: translateX(-100%);
	}
	.name{
		display: block;
		flex: 0 0 80upx;
	}
}
	.content{
		line-height: 60upx;
	}
</style>
