import axios from 'axios'

export default {
	/**
	 * 查询风采列表
	 * @returns {*}
	 */
	list(condition, pageInfo) {
		return axios.post('getMienBaseList.json', {})
	},
	/**
	 * 新增更改风采信息
	 * @returns {*}
	 */
	add(vo) {
		return axios.post('addOrUpdateMienBaseInfo.json', vo)
	},
	/**
	 * 新增更改菜单信息
	 * @returns {*}
	 */
	getRoleInfo(vo) {
		return axios.post('addOrUpdateMenuBaseInfo.json', {
			...vo,
		})
	},
}
