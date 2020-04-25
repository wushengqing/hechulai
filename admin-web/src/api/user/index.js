import axios from 'axios'

export default {
	/**
	 * 用户注册
	 * @returns {*}
	 */
	register(vo) {
		return axios.post('/hcl-web/web/userRegistered.json', {
			...vo,
		})
	},
	/**
	 * 用户登陆
	 * @returns {*}
	 */
	login(vo) {
		return axios.post('/hcl-web/web/userLogin.json', {
			...vo,
		})
	},
	/**
	 * 查询用户列表
	 * @returns {*}
	 */
	list(condition, pageInfo) {
		return axios.post('/hcl-web/web/getUserList.json', {
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
	/**
	 * 获取用户的角色列表
	 * @returns {*}
	 */
	getUserAccessRelList(vo) {
		return axios.post('/hcl-web/web/getUserAccessRelList.json', {
			...vo,
		})
	},
}
