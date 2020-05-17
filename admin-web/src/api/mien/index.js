import axios from 'axios'

export default {
	/**
	 * 查询风采列表
	 * @returns {*}
	 */
	list(condition, pageInfo) {
		return axios.post('/hcl-web/web/getMienBaseList.json', {})
	},
	/**
	 * 新增更改风采信息
	 * @returns {*}
	 */
	add(vo) {
		return axios.post('/hcl-web/web/addOrUpdateMienBaseInfo.json', vo)
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
