import axios from 'axios'

export default {
  /**
   * 宗亲列表
   * @returns {*}
   */
  list (condition, pageInfo) {
    pageInfo = Object.assign({
      currentPage: 0,
      pageSize: 10
    }, pageInfo)
    return axios.post('/hcl-web/web/getClanList.json', {
      ...condition,
      ...pageInfo
    })
  },
  /**
   * 查询宗族信息
   * @returns {*}
   */
  get (id) {
    return axios.post('/hcl-web/web/getClanInfo.json',{id})
  },
  /**
   * 新增编辑宗族
   * @returns {*}
   */
  add(vo) {
    return axios.post('/hcl-web/web/addOrUpdateClanInfo.json', vo)
  },

}
