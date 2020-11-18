<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				用户登录
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">用户名</text>
					<input 
						placeholder="请输入用户名"
						v-model="userNum"
					
					/>
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input 
						type="mobile" 
						v-model="userPassword"
						placeholder="请输入密码"
						placeholder-class="input-empty"
						maxlength="20"
						password 
						@confirm="toLogin"
					/>
				</view>
			</view>
			<button class="confirm-btn" @click="toLogin" :disabled="logining">登录/注册</button>
			<view class="forget-section">
				快速登录
			</view>
			<view class="forget-section" @click="loginByWechat()">
				<image class="wechat" src="../../static/wechat.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {  
		mapState,
        mapMutations  
    } from 'vuex';
	
	export default{
		data(){
			return {
				userNum: '',
				userPassword: '',
				logining: false
			}
		},
		computed: {
			...mapState(['clanInfo', 'userInfo']),
		},
		mounted(){
			//红楼梦
			console.log(this.clanInfo.id)
			if(this.clanInfo.id===7){
				this.userNum ='hechulai';
				this.userPassword = '123456';
			}
			
		},
		methods: {
			...mapMutations(['login']),
			
			navBack(){
				uni.navigateBack();
			},
			//获取微信授权
			loginByWechat(){
				//#ifdef  H5
				let APPID = 'wxff47f0bed871c55c';
				let redirect_uri = encodeURIComponent('http://www.hclzz.com/hcl-web/index.jsp?r='+location.origin);
				// this.$api.request.getOAuth().then(res=>{
				// 	console.log(res);
				// });
				let wx_login_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?';
				let parArray = [
					`appid=${APPID}`,
					`redirect_uri=${redirect_uri}`,
					'response_type=code',
					'scope=snsapi_userinfo',
					'state=1#wechat_redirect',
				]
				wx_login_url += parArray.join('&')
				location.href= wx_login_url;
				//#endif
			},
			async toLogin(){
				this.logining = true;
				const {userNum, userPassword} = this;
				const sendData = {
					userNum,
					userPassword
				};
				//判断用户是否登录
				const result = await this.$api.request.userLogin(sendData);
				if(result.code === 0){
					//result.data.isRelZq =result.isRelZq;
					this.login(result.data);
					this.navBack();  
				}else{
					//尝试注册
					const registerResult = await this.$api.request.userRegistered(sendData);
					if(registerResult.code ===0){
						const loginResult  = await this.$api.request.userLogin(sendData)
						if(loginResult.code === 0){
							//loginResult.data.isRelZq =loginResult.isRelZq;
						
							this.login(loginResult.data);
						  this.navBack();  
						}else{
							this.$api.msg(loginResult.msg);
							this.logining = false;
						}
					}else{
						this.$api.msg(registerResult.msg);
						this.logining = false;
					}
					
				
				}
			}
		},

	}
</script>

<style lang='scss' scoped>
	page{
		background: #fff;
	}
	.container{
		padding-top: 115px;
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		padding-bottom: 40upx;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-content{
		padding: 0 60upx;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}	
	}

	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}
	.register-section{
		position:absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		text{
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
	.wechat{
		width: 100upx;
		height:100upx;
	}
</style>
