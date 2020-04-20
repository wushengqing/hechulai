import axios from 'axios'

export default {
	/**
	 * 用户注册
	 * @returns {*}
	 */
	register(vo) {
		return axios.post('/hcl-web/web/userRegistered', {
			...vo,
		})
	},
	/**
	 * 用户登陆
	 * @returns {*}
	 */
	login(vo) {
		return axios.post('/hcl-web/web/userLogin', {
			...vo,
		})
	},
	/**
	 * 查询用户列表
	 * @returns {*}
	 */
	list(condition, pageInfo) {
		pageInfo = Object.assign({
		  currentPage: 1,
		  pageSize: 10
		}, pageInfo)
		return axios.post('/hcl-web/web/getUserList', {
			...condition,
			...pageInfo
		})
	},
	/**
	 * 编辑用户信息
	 * @returns {*}
	 */
	upDateUserInfo(vo) {
		return axios.post('/hcl-web/web/addOrUpdateUserInfo', {
			...vo,
		})
	},
	/**
	 * 编辑用户信息
	 * @returns {*}
	 */
	changeUserState(vo) {
		return axios.post('/hcl-web/web/changeUserState', {
			...vo,
		})
	},
}
