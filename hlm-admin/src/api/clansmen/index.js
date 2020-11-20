import axios from 'axios'

export default {
	/**
	 * 宗亲列表
	 * @returns {*}
	 */
	list(condition, pageInfo) {
		return axios.post('getClanUserRelList.json', {
			...condition,
			...pageInfo
		})
	},
  /**
   * 宗亲详情
   * @returns {*}
   */
  detail(vo) {
    return axios.post('getZpList.json', vo)
  },

	/**
	 * 新增或者编辑宗亲
	 * @returns {*}
	 */
	add(vo) {
		return axios.post('addOrUpdateClanUserRel.json', {
			...vo,
		})
	},
}
