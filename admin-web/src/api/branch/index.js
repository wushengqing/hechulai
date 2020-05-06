import axios from 'axios'

export default {
	/**
	 * 世称列表
	 * @returns {*}
	 */
	list(condition, pageInfo) {
		return axios.post('/hcl-web/web/getDirectoryList.json', {
			...condition,
		})
	},
	/**
	 * 新增、编辑世称
	 * @returns {*}
	 */
	add(vo) {
		return axios.post('/hcl-web/web/addOrUpdateDirectoryInfo.json', {
			...vo,
		})
	},
}
