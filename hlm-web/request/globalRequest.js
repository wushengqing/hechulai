//clanId如果有传就不能为空
function checkClanId(requestInfo){
	if(requestInfo.data.hasOwnProperty('clanId') && !requestInfo.data.clanId){
		console.log(uni)
		uni.reLaunch({
			url:'/'
		})
	}
}

export function defaultRequest(requestInfo) {
	checkClanId(requestInfo);
	return new Promise((resolve, reject) => {
		uni.request({
			...requestInfo,
			success: (res) => {
				resolve(res.data)
			},
			fail: () => {
				reject("")
			}

		})
	})
}
export async function asyncRequest(requestInfo) {
	checkClanId(requestInfo);
	let [error, res] = await uni.request(requestInfo);
	return [error, res];
}
export default {
	defaultRequest,
	asyncRequest,
}

