import axios from 'axios'

export default {
	/**
	 * 世称列表
	 * @returns {*}
	 */
	list(condition, pageInfo) {
		return axios.post('/hcl-web/web/getScList.json', {
			...condition,
		})
	},
	/**
	 * 新增、编辑世称
	 * @returns {*}
	 */
	add(vo) {
		return axios.post('/hcl-web/web/​addOrUpdateScInfo.json', {
			...vo,
		})
	},
}
