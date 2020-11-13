import axios from 'axios'

export default {
	/**
	 * 圈子列表
	 * @returns {*}
	 */
  getCircleList(vo) {
		return axios.post('/hcl-web/web/getCircleList.json', {
			...vo,
		})
	},
	/**
	 * 新增或者编辑
	 * @returns {*}
	 */
  add(vo) {
		return axios.post('/hcl-web/web/addOrUpdateCircleBaseInfo.json', {
			...vo,
		})
	},
	/**
	 * 圈子详情
	 * @returns {*}
	 */
	detail(vo) {
		return axios.post('/hcl-web/web/getCircleBaseInfo.json',vo)
	},
	/**
	 * 查询圈子文章
	 * @returns {*}
	 */
  article(vo,pageInfo) {
		return axios.post('/hcl-web/web/getCircleContentList.json', {
			...vo,
			...pageInfo
		})
	},
	/**
	 * 查询圈子关注成员
	 * @returns {*}
	 */
  user(vo) {
		return axios.post('/hcl-web/web/getCircleMemberList.json', {
			...vo,
		})
	},
	/**
	 * 关注审核
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
	/**
	 * 保存用户角色信息
	 * @returns {*}
	 */
  addOrUpdateUserAccessRel(vo) {
		return axios.post('/hcl-web/web/addOrUpdateUserAccessRel.json', {
			...vo,
		})
	},
	/**
	 * 删除用户角色
	 * @returns {*}
	 */
  delUserAccessRel(vo) {
		return axios.post('/hcl-web/web/delUserAccessRel.json', vo)
	},
	//根据宗族，世称，房系查询用户列表
	getClanUserRelList(vo) {
    return axios.post('/hcl-web/web/getClanUserRelList.json', {
      ...vo,
    })
  },
}
