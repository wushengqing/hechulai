import axios from 'axios'

export default {
  /**
   * banner列表
   * @returns {*}
   */
  list(condition) {
    return axios.post('getAncestralHallList.json', {
      ...condition,
    })
  },
  /**
   * 保存banner 图
   * @returns {*}
   */
  save(vo) {
    return axios.post('addOrUpdateAncestralHallInfo.json', {
      ...vo,
    })
  },
  /**
   * 编辑用户信息
   * @returns {*}
   */
  changeUserState(vo) {
    return axios.post('changeUserState.json', {
      ...vo,
    })
  },
}
