import Vue from 'vue'
import store from './store'
import App from './App'

import Json from './Json' //测试用数据

import request from './request' //测试用数据


require('./utils/wxShare');

/**
 *  因工具函数属于公司资产, 所以直接在Vue实例挂载几个常用的函数
 *  所有测试用数据均存放于根目录json.js
 *  
 *  css部分使用了App.vue下的全局样式和iconfont图标，有需要图标库的可以留言。
 *  示例使用了uni.scss下的变量, 除变量外已尽量移除特有语法,可直接替换为其他预处理器使用
 */
const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const json = type => {
	//模拟异步请求数据
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(Json[type]);
		}, 500)
	})
}

const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}


Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {
	msg,
	json,
	prePage,
	request
};

Vue.prototype.checkRouter = function(isLogin = true, isRelZq = true, ask = true) {
	//获取userInfo
	let userInfo = uni.getStorageSync('userInfo')||{userId:''};
	let clanInfo = uni.getStorageSync('clanInfo')||{id:''};
	if (isLogin && !userInfo.userId) {
		uni.showToast({
			title: '请先登录',
			icon: "none",
			duration: 500
		});
		setTimeout(() => {
			uni.redirectTo({
				url: "/pages/public/login"
			});
		}, 200)
		return false;
	}
	if (isRelZq && !userInfo.isRelZq) {
		uni.showModal({
			title: '提示',
			content: '该功能需要绑定宗族，是否前往？',
			success: function(res) {
				if (res.confirm) {
					uni.navigateTo({
						url: "../bindLineage/index"
					});
				} else if (res.cancel) {
					uni.switchTab({
						url: '/pages/index/index'
					});
				}
			}
		});
		return false
	}
	if (isRelZq && userInfo.clanId !== clanInfo.id) {
		uni.showModal({
			title: '提示',
			content: '您已经是其他宗族的宗亲，不能绑定为本宗族',
			success: function(res) {
				uni.switchTab({
					url: '/pages/index/index'
				});
			}
		});
		return false
	}
	return true;
};

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
