import axios from 'axios'

export default {
	/**
	 * 查询菜单列表
	 * @returns {*}
	 */
	list(condition, pageInfo) {
		return axios.post('/hcl-web/web/getMenuBaseList.json', {})
	},
	/**
	 * 新增更改菜单信息
	 * @returns {*}
	 */
	add(vo) {
		return axios.post('/hcl-web/web/addOrUpdateMenuBaseInfo.json', vo)
	},
	/**
	 * 新增更改菜单信息
	 * @returns {*}
	 */
	getRoleInfo(vo) {
		return axios.post('/hcl-web/web/addOrUpdateMenuBaseInfo.json', {
			...vo,
		})
	},
}
