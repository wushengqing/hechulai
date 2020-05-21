import axios from 'axios'

export default {
	/**
	 * banner列表
	 * @returns {*}
	 */
	list(condition, pageInfo) {
		return axios.post('/hcl-web/web/getMienBaseList.json', {
			...condition,
			//...pageInfo
		})
	},
	/**
	 * 保存banner 图
	 * @returns {*}
	 */
	save(vo) {
		return axios.post('/hcl-web/web/addOrUpdateMienBaseInfo.json', {
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
