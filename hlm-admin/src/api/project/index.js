import axios from 'axios'

export default {
	/**
	 * 乐捐列表
	 * @returns {*}
	 */
	list(condition, pageInfo) {
		return axios.post('getGivingBaseList.json', {
			...condition,
			//...pageInfo
		})
	},
	/**
	 * 用户乐捐列表
	 * @returns {*}
	 */
  givingUserRelList(vo) {
		return axios.post('getGivingUserRelList.json', {
			...vo,
		})
	},
	/**
	 * 保存乐捐项目
	 * @returns {*}
	 */
	save(vo) {
		return axios.post('addOrUpdateGivingBaseInfo.json', {
			...vo,
		})
	},
}
