import axios from 'axios'
const env = process.env.NODE_ENV
export default {
  /**
   * 图片上传地址
   */
  uploadAction: process.env.VUE_APP_API_PREFIX + 'hcl-web/web/addFile.file',
  /**
   * 异步获取省市区级联
   */
  getFile (id) {
    return axios.post('/hcl-web/web/getFile.json',{
      id
    })
  },
  /**
   * 下载文件
   */
  downloadFile (file) {
    var params = {
      fileUrl: file.fileUrl || file.httppath || file.path,
      fileName: file.fileName
    }
    var form = document.createElement('form')
    form.name = 'form'
    document.body.appendChild(form)
    for (var obj in params) {
      if (params.hasOwnProperty(obj)) {
        var input = document.createElement('input')
        input.tpye = 'hidden'
        input.name = obj
        input.value = params[obj]
        form.appendChild(input)
      }
    }
    form.method = 'GET'
    form.action = process.env.VUE_APP_API_PREFIX + '/upload/attachment/downloadByFileUrl.htm'
    form.submit()
    document.body.removeChild(form)
  },
  /**
   * 异步获取省市区级联
   */
  // getPcdList () {
  //   return axios.post('/hcl-web/web/getPcdList.json')
  // },
  /**
   * 获取省份列表
   */
  getProvince() {
    return axios.post('/hcl-web/web/getpList.json',{
    })
  },
  /**
   * 获取城市列表
   */
  getCity(provinceId) {
    return axios.post('/hcl-web/web/getcList.json', {
      provinceId
    })
  },
  /**
   * 获取县区列表
   */
  getDistrict(cityId) {
    return axios.post('/hcl-web/web/getdList.json', {
      cityId
    })
  },
}
