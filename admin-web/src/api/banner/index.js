import axios from 'axios'

export default {
	/**
	 * banner列表
	 * @returns {*}
	 */
	list(condition, pageInfo) {
		return axios.post('/hcl-web/web/getBannerList.json', {
			...condition,
			...pageInfo
		})
	},
	/**
	 * 编辑用户信息
	 * @returns {*}
	 */
	upDateUserInfo(vo) {
		return axios.post('/hcl-web/web/addOrUpdateUserInfo.json', {
			...vo,
		})
	},
	/**
	 * 编辑用户信息
	 * @returns {*}
	 */
	changeUserState(vo) {
		return axios.post('/hcl-web/web/changeUserState.json', {
			...vo,
		})
	},
}
