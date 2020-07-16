
const baseUrl = '/hcl-web/web/'
import globalRequest from './globalRequest.js'
//获取宗族列表
async function getClanList(data={
	currentPage:0,
	pageSize:100
}){
	var [error, res] = await uni.request({
	    url: `${baseUrl}getClanList.json`,
		method:'POST',
	    data
	});
	if(res){
		return res.data.data;
	}else{
		return {
			code:'1',
			error
		}
	}
	
}

async function userLogin(data){
	var [error, res] = await uni.request({
	    url: `${baseUrl}userLogin.json`,
		method:'POST',
	    data
	});
	if(res){
		return res.data;
	}else{
		return {
			code:'1',
			error
		}
	}
	
}
//获取轮播图
async function bannerList(data){
	var [error, res] = await uni.request({
	    url: `${baseUrl}getBearLenList.json`,
		method:'POST',
	    data
	});
	if(res){
		return res.data.data;
	}else{
		return {
			code:'1',
			error
		}
	}
	
}
//获取新闻列表
async function newsList(data){
	var [error, res] = await uni.request({
	    url: `${baseUrl}getNewList.json`,
		method:'POST',
	    data
	});
	if(res){
		return res.data.data;
	}else{
		return {
			code:'1',
			error
		}
	}
	
}
//获取新闻详情
async function newsDetail(data){
	var [error, res] = await uni.request({
	    url: `${baseUrl}getMienBaseInfo.json`,
		method:'POST',
	    data
	});
	if(res){
		return res.data.data;
	}else{
		return {
			code:'1',
			error
		}
	}
	
}


//获取世称列表
async function generationList(data){
	var [error, res] = await uni.request({
	    url: `${baseUrl}getScList.json`,
		method:'POST',
	    data
	});
	if(res){
		return res.data.data;
	}else{
		return {
			code:'1',
			error
		}
	}
	
}

//获取房系列表
async function directoryList(data){
	var [error, res] = await uni.request({
	    url: `${baseUrl}getDirectoryList.json`,
		method:'POST',
	    data
	});
	if(res){
		return res.data.data;
	}else{
		return {
			code:'1',
			error
		}
	}
	
}
//获取宗亲列表
async function clanUserRelList(data){
	var [error, res] = await uni.request({
	    url: `${baseUrl}getClanUserRelList.json`,
		method:'POST',
	    data
	});
	if(res){
		return res.data.data;
	}else{
		return {
			code:'1',
			error
		}
	}
}
//获取宗亲消息列表
async function userMsgList(data){
	var [error, res] = await uni.request({
	    url: `${baseUrl}getUserMsgList.json`,
		method:'POST',
	    data
	});
	if(res){
		return res.data;
	}else{
		return {
			code:'1',
			error
		}
	}
}
//获取宗亲消息列表
async function userApproveList(data){
	var [error, res] = await uni.request({
	    url: `${baseUrl}getAuditMsgList.json`,
		method:'POST',
	    data
	});
	if(res){
		return res.data;
	}else{
		return {
			code:'1',
			error
		}
	}
}

//获取世系表
async function sxList(data){
	var [error, res] = await uni.request({
	    url: `${baseUrl}getSxList.json`,
		method:'POST',
	    data
	});
	if(res){
		return res.data.data;
	}else{
		return {
			code:'1',
			error
		}
	}
}
//获取族委会
async function organizationList(data){
	var [error, res] = await uni.request({
	    url: `${baseUrl}getClanOrganizationList.json`,
		method:'POST',
	    data
	});
	if(res){
		return res.data.data;
	}else{
		return {
			code:'1',
			error
		}
	}
}

//获取宗亲详情
async function clanUserInfo(data){
	var [error, res] = await uni.request({
	    url: `${baseUrl}getClanUserInfo.json`,
		method:'POST',
	    data
	});
	if(res){
		return res.data.data;
	}else{
		return {
			code:'1',
			error
		}
	}
}
//获取宗亲详情
async function getZpList(data){
	var [error, res] = await uni.request({
	    url: `${baseUrl}getZpList.json`,
		method:'POST',
	    data
	});
	if(res){
		return res.data.data;
	}else{
		return {
			code:'1',
			error
		}
	}
}
//​绑定宗亲
function userRelClanMain(data){
	return globalRequest({
	    url: `${baseUrl}userRelClanMain.json`,
		method:'POST',
	    data,
	});
}

//获取乐捐列表
async function projectList(data){
	var [error, res] = await uni.request({
	    url: `${baseUrl}getGivingBaseList.json`,
		method:'POST',
	    data
	});
	if(res){
		return res.data.data;
	}else{
		return {
			code:'1',
			error
		}
	}
	
}

//获取乐捐详情
async function projectDetail(data){
	var [error, res] = await uni.request({
	    url: `${baseUrl}getGivingBaseList.json`,
		method:'POST',
	    data
	});
	if(res){
		return res.data.data;
	}else{
		return {
			code:'1',
			error
		}
	}
	
}
//获取乐捐详情
async function projectUserList(data){
	var [error, res] = await uni.request({
	    url: `${baseUrl}getGivingUserRelList.json`,
		method:'POST',
	    data
	});
	if(res){
		return res.data.data;
	}else{
		return {
			code:'1',
			error
		}
	}
	
}
//族谱获取单个宗亲的信息

export default {
	//获取宗族列表
	getClanList,
	//用户登录
	userLogin,
	//获取轮播图
	bannerList,
	//新闻列表
	newsList,
	//新闻详情
	newsDetail,
	//获取世称列表
	generationList,
	//获取房系列表
	directoryList,
	//获取宗亲列表
	clanUserRelList,
	//绑定宗亲
	userRelClanMain,
	//获取宗亲消息列表
	userMsgList,
	//宗亲详情
	clanUserInfo,
	//世系表
	sxList,
	//族委会
	organizationList,
	//乐捐列表
	projectList,
	//乐捐详情
	projectDetail,
	//乐捐榜
	projectUserList,
	//获取族谱中宗亲的详情
	getZpList,
	//获取我的审核列表
	userApproveList
}