import axios from 'axios'

export default {
	/**
	 * 查询审核事宜列表
	 * @returns {*}
	 */
  save(vo) {
		return axios.post('/hcl-web/web/addOrUpdateClanAuditRel.json', {
			...vo,
		})
	},
  del(){
    //todo
  },
  userList(vo) {
  	let baseList = axios.post('/hcl-web/web/getAuditBaseList.json',{});
  	let userList = axios.post('/hcl-web/web/getAuditUserList.json', {
      ...vo,
    });

    return new Promise((resolve, reject) => {
      Promise.all([baseList,userList]).then(res=>{
      	let baseListObj = {};
      	res[1].data.forEach(item=>{
      		item.auditList.forEach(e=>{
            if(!baseListObj[e.auditId]){
              baseListObj[e.auditId] = [];
						}
            baseListObj[e.auditId].push({
              auditUserName:item.auditUserName,
              userAccessName:item.userAccessName,
              auditUserId:item.auditUserId,
              auditUserClanManId:item.auditUserClanManId
            })
					})
				})
        res[0].data = res[0].data.map(item=>{
           return {
						...item,
						userList:baseListObj[item.id]||[]
					}
				});
        resolve(res[0])
      })
    })


  },
}
