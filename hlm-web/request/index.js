const baseUrl = 'https://www.hclzz.com/hclzp-web/web/'
import {defaultRequest,asyncRequest} from './globalRequest.js'

/**
 * 图片上传地址
 */
const uploadAction=`${baseUrl}addFile.file`;

//获取宗族列表
async function getClanList(data = {
	currentPage: 0,
	pageSize: 100
}) {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}getClanList.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data.data;
	} else {
		return {
			code: '1',
			error
		}
	}

}
//获取宗族和子域名关联列表
async function getDnsList() {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}getDnsList.json`,
		method: 'POST',
		data: {}
	});
	if (res) {
		return res.data.data;
	} else {
		return {
			code: '1',
			error
		}
	}

}
//注册
async function userRegistered(data) {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}userRegistered.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data;
	} else {
		return {
			code: '1',
			error
		}
	}

}
//登录
async function userLogin(data) {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}userLogin.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data;
	} else {
		return {
			code: '1',
			error
		}
	}
}
//获取用户信息
async function getUserInfo(data) {
	return defaultRequest({
		url: `${baseUrl}getUserInfo.json`,
		method: 'POST',
		data,
	});
}
//获取openid;
async function getOAuth(data) {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}getOAuth.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data;
	} else {
		return {
			code: '1',
			error
		}
	}
}
//获取轮播图
async function bannerList(data) {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}getBearLenList.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data.data;
	} else {
		return {
			code: '1',
			error
		}
	}

}
//获取新闻列表
async function newsList(data) {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}getNewList.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data;
	} else {
		return {
			code: '1',
			error
		}
	}
}

//获取公告列表
async function noticeList(data) {
	data = {
		...data,
		mienType: 3
	}
	var [error, res] = await asyncRequest({
		url: `${baseUrl}getMienBaseList.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data;
	} else {
		return {
			code: '1',
			error
		}
	}
}
//获取新闻详情
async function newsDetail(data) {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}getMienBaseInfo.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data.data;
	} else {
		return {
			code: '1',
			error
		}
	}

}


//获取世称列表
async function generationList(data) {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}getScList.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data.data;
	} else {
		return {
			code: '1',
			error
		}
	}

}

//获取房系列表
async function directoryList(data) {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}getDirectoryList.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data.data;
	} else {
		return {
			code: '1',
			error
		}
	}

}
//获取宗亲列表
async function clanUserRelList(data) {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}getClanUserRelList.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data.data;
	} else {
		return {
			code: '1',
			error
		}
	}
}
//获取宗亲消息列表
async function userMsgList(data) {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}getUserMsgList.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data;
	} else {
		return {
			code: '1',
			error
		}
	}
}
async function getMsgInfo(data) {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}getMsgInfo.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data.data;
	} else {
		return {
			code: '1',
			error
		}
	}
}
//获取宗亲审核员获取用户关联宗亲审查消息列表
async function userApproveList(data) {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}getAuditMsgListByUser.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data.data;
	} else {
		return {
			code: '1',
			error
		}
	}
}
//获取宗亲审核员获取用户关联宗亲审查消息列表
async function getAuditMsgList(data) {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}getAuditMsgList.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data;
	} else {
		return {
			code: '1',
			error
		}
	}
}
//审核员审查用户绑定宗亲的消息  已弃用
function auditUserUpdateClanMainRel(data) {
	return defaultRequest({
		url: `${baseUrl}auditUserUpdateClanMainRel.json`,
		method: 'POST',
		data,
	});
}
//审核添加家庭成员 已弃用
function auditUserUpdateClanMain(data) {
	return defaultRequest({
		url: `${baseUrl}auditUserUpdateClanMain.json`,
		method: 'POST',
		data,
	});
}
//审核消息
function auditUserUpdateMsg(data) {
	return defaultRequest({
		url: `${baseUrl}auditUserUpdateMsg.json`,
		method: 'POST',
		data,
	});
}

//获取宗祠祖坟列表
function getAncestralHallList(data) {
	return defaultRequest({
		url: `${baseUrl}getAncestralHallList.json`,
		method: 'POST',
		data,
	});
}
//获取宗祠祖坟详情
async function getAncestralHallInfo(data) {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}getAncestralHallInfo.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data.data;
	} else {
		return {
			code: '1',
			error
		}
	}
}
//获取世系表
async function sxList(data) {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}getSxList.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data.data;
	} else {
		return {
			code: '1',
			error
		}
	}
}
//获取族委会
async function organizationList(data) {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}getClanOrganizationList.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data.data;
	} else {
		return {
			code: '1',
			error
		}
	}
}

//获取宗亲详情
async function clanUserInfo(data) {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}getClanUserInfo.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data.data;
	} else {
		return {
			code: '1',
			error
		}
	}
}

//​更新宗亲个人信息
function addOrUpdateClanUserInfo(data) {
	return defaultRequest({
		url: `${baseUrl}addOrUpdateClanUserInfo.json`,
		method: 'POST',
		data,
	});
}

//获取族谱宗亲详情
async function getZpList(data) {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}getZpList.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data.data;
	} else {
		return {
			code: '1',
			error
		}
	}
}
//​绑定宗亲
function userRelClanMain(data) {
	return defaultRequest({
		url: `${baseUrl}userRelClanMain.json`,
		method: 'POST',
		data,
	});
}
//​宗亲添加家庭成员
function addOrUpdateClanUserRelByApp(data) {
	return defaultRequest({
		url: `${baseUrl}addOrUpdateClanUserRelByApp.json`,
		method: 'POST',
		data,
	});
}

//获取乐捐列表
async function projectList(data) {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}getGivingBaseList.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data;
	} else {
		return {
			code: '1',
			error
		}
	}

}

//获取乐捐详情
async function projectDetail(data) {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}getGivingBaseInfo.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data.data;
	} else {
		return {
			code: '1',
			error
		}
	}

}
//获取我的乐捐列表或者乐捐榜列表，根据传入的参数来区别（givingId，userId）
async function projectUserList(data) {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}getGivingUserRelList.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data;
	} else {
		return {
			code: '1',
			error
		}
	}

}
//发起乐捐
async function addOrUpdateGivingUserRel(data) {
	return defaultRequest({
		url: `${baseUrl}addOrUpdateGivingUserRel.json`,
		method: 'POST',
		data,
	});
}
//反馈 saveClanMsg.json
async function saveClanMsg(data) {
	return defaultRequest({
		url: `${baseUrl}saveClanMsg.json`,
		method: 'POST',
		data,
	});
}

//宗族圈列表
async function getCircleList(data) {
	return defaultRequest({
		url: `${baseUrl}getCircleList.json`,
		method: 'POST',
		data,
	});
}
//关注宗族圈
async function addOrUpdateCircleUserRel(data) {
	return defaultRequest({
		url: `${baseUrl}addOrUpdateCircleUserRel.json`,
		method: 'POST',
		data,
	});
}
//获取宗族圈文章
async function getCircleContentList(data) {
	var [error, res] = await asyncRequest({
		url: `${baseUrl}getCircleContentList.json`,
		method: 'POST',
		data
	});
	if (res) {
		return res.data;
	} else {
		return {
			code: '1',
			error
		}
	}
}
//发布宗族圈文章
function addOrUpdateCircleContentInfo(data) {
	return defaultRequest({
		url: `${baseUrl}addOrUpdateCircleContentInfo.json`,
		method: 'POST',
		data,
	});
}
//宗族圈内容点赞、评论、撤回评论、点赞、回复
function addOrUpdateCircleCommentInfo(data) {
	return defaultRequest({
		url: `${baseUrl}addOrUpdateCircleCommentInfo.json`,
		method: 'POST',
		data,
	});
}

export default  {
	//图片上传地址
	uploadAction,
	//获取域名和宗族的关系
	getDnsList,
	//获取宗族列表
	getClanList,
	//注册
	userRegistered,
	//用户登录
	userLogin,
	//获取用户信息
	getUserInfo,
	//获取openId
	getOAuth,
	//获取轮播图
	bannerList,
	//新闻列表
	newsList,
	//公告详情
	noticeList,
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
	//消息详情
	getMsgInfo,
	//宗亲详情
	clanUserInfo,
	//保存宗亲信息
	addOrUpdateClanUserInfo,
	//世系表
	sxList,
	//族委会
	organizationList,
	//乐捐列表
	projectList,
	//乐捐详情
	projectDetail,
	//新增乐捐
	addOrUpdateGivingUserRel,
	//乐捐榜
	projectUserList,
	//获取族谱中宗亲的详情
	getZpList,
	//获取我的审核列表
	userApproveList,
	//审核员查询审核宗亲消息列表
	getAuditMsgList,
	//宗亲添加家庭成员
	addOrUpdateClanUserRelByApp,
	//获取宗祠祖坟列表
	getAncestralHallList,
	//获取宗祠祖坟详情
	getAncestralHallInfo,
	//反馈
	saveClanMsg,
	//宗族圈列表
	getCircleList,
	//关注宗族圈
	addOrUpdateCircleUserRel,
	//发布宗族圈文章
	addOrUpdateCircleContentInfo,
	//查询宗族圈文章列表
	getCircleContentList,
	//宗族圈内容点赞、评论、撤回评论、点赞、回复
	addOrUpdateCircleCommentInfo,
	//审核
	auditUserUpdateMsg,
};
