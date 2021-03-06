import axios from 'axios'

export default {
	/**
	 * 查询角色列表
	 * @returns {*}
	 */
	list(condition, pageInfo) {
		return axios.post('getAccessBaseList.json',{})
	},
	/**
	 * 新增更改角色信息
	 * @returns {*}
	 */
	upDateRoleInfo(vo) {
		return axios.post('addOrUpdateAccessBaseInfo.json',vo)
	},
	/**
	 * 获取角色的菜单权限列表
	 * @returns {*}
	 */
	getMenuById(vo) {
		return axios.post('getMenuAccessRelList.json', vo)
	},
  /**
   * 保存角色的菜单权限
   * @returns {*}
   */
  seveMenuById(vo) {
    return axios.post('addOrUpdateMenuAccessRel.json', vo)
  },
}
