import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {
			userId: ''
		},
		clanInfo: {
			id: ''
		},
	},
	mutations: {
		//缓存宗族id
		setClanInfo(state, clanInfo) {
			uni.setStorageSync('clanInfo', clanInfo);
			state.clanInfo = clanInfo;

		},
		login(state, userInfo) {
			state.hasLogin = true;
			state.userInfo = userInfo;
			console.log(userInfo)
			uni.setStorage({ //缓存用户登陆状态
				key: 'userInfo',
				data: userInfo
			})
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
				key: 'userInfo'
			})
		},
	},
	actions: {

	}
})

export default store
