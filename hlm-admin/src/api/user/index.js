import axios from 'axios'

export default {
	/**
	 * 用户注册
	 * @returns {*}
	 */
	register(vo) {
		return axios.post('userRegistered.json', {
			...vo,
		})
	},
	/**
	 * 用户登陆
	 * @returns {*}
	 */
	login(vo) {
		return axios.post('userLogin.json', {
			...vo,
		})
	},
	/**
	 * 查询用户列表
	 * @returns {*}
	 */
	list(condition, pageInfo) {
		return axios.post('getUserList.json', {
			...condition,
			...pageInfo
		})
	},
	/**
	 * 编辑用户信息
	 * @returns {*}
	 */
	upDateUserInfo(vo) {
		return axios.post('addOrUpdateUserInfo.json', {
			...vo,
		})
	},
  /**
   * 绑定宗亲
   * @returns {*}
   */
  editUserInfo(vo) {
    return axios.post('editUserInfo.json', {
      ...vo,
    })
  },
	/**
	 * 编辑用户信息
	 * @returns {*}
	 */
	changeUserState(vo) {
		return axios.post('changeUserState.json', {
			...vo,
		})
	},
	/**
	 * 获取用户的角色列表
	 * @returns {*}
	 */
	getUserAccessRelList(vo) {
		return axios.post('getUserAccessRelList.json', {
			...vo,
		})
	},
	/**
	 * 保存用户角色信息
	 * @returns {*}
	 */
  addOrUpdateUserAccessRel(vo) {
		return axios.post('addOrUpdateUserAccessRel.json', {
			...vo,
		})
	},
	/**
	 * 删除用户角色
	 * @returns {*}
	 */
  delUserAccessRel(vo) {
		return axios.post('delUserAccessRel.json', vo)
	},
	//根据宗族，世称，房系查询用户列表
	getClanUserRelList(vo) {
    return axios.post('getClanUserRelList.json', {
      ...vo,
    })
  },
}
