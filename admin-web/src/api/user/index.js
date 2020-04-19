import axios from 'axios'

export default {
  /**
   * 用户注册
   * @returns {*}
   */
  register (vo) {
    return axios.post('/hcl-web/web/userRegistered', {
      ...vo,
    })
  },
  /**
   * 用户登陆
   * @returns {*}
   */
  login (vo) {
    return axios.post('/hcl-web/web/userLogin', {
      ...vo,
    })
  },
  /**
   * get接口
   * @returns {*}
   */
  del (id) {
    return axios.get('/hcl-web/web/motor/item/del', {
      params: {
        id
      }
    })
  },
}
