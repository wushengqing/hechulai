import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		clanInfo:{},
	},
	mutations: {
		//缓存宗族id
		setClanInfo(state, clanInfo) {
			state.hasLogin = true;
			state.clanInfo = clanInfo;
		
		},
		login(state, userInfo) {
			userInfo.isRelZq= true;
			userInfo.clanManId=userInfo.clanManId||52;
			state.hasLogin = true;
			state.userInfo = userInfo;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: userInfo  
			}) 
			console.log(state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		}
	},
	actions: {
	
	}
})

export default store
