import axios from 'axios'

export default {
	/**
	 * 查询审核事宜列表
	 * @returns {*}
	 */
  baseList(vo) {
		return axios.post('/hcl-web/web/getAuditBaseList.json', {
			...vo,
		})
	},
  userList(vo) {
    return axios.post('/hcl-web/web/getAuditUserList.json', {
      ...vo,
    })
  },
}
