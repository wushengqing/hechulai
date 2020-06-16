
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
//获取轮播图
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
		return res.data.data;
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

//​绑定宗亲
function userRelClanMain(data){
	return globalRequest({
	    url: `${baseUrl}userRelClanMain.json`,
		method:'POST',
	    data,
	});
}


export default {
	//获取宗族列表
	getClanList,
	//用户登录
	userLogin,
	//获取轮播图
	bannerList,
	//新闻列表
	newsList,
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
	//世系表
	sxList,
	//族委会
	organizationList,
}