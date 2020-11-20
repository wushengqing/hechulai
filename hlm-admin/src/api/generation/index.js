import axios from 'axios'

export default {
	/**
	 * 世称列表
	 * @returns {*}
	 */
	list(condition, pageInfo) {
		return axios.post('getScList.json', {
			...condition,
		})
	},
	/**
	 * 新增、编辑世称
	 * @returns {*}
	 */
	add(vo) {
		return axios.post('addOrUpdateScInfo.json', {
			...vo,
		})
	},
}
