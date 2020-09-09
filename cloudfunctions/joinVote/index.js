// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()
	const _id = event._id
	const index = event.index
	const resGet = await db.collection('voteList').where({_id: _id}).get()
	const total = resGet.data[0].total
    const option = resGet.data[0].option
	option[index].value = option[index].value + 1
	const resUpd = await db.collection('voteList').where({_id: _id}).update({
		data: {
			['option.'+[index]]: option[index],
			'total': total + 1
		}
	})
	return {
		resUpd,
		option,
		openid: wxContext.OPENID,
		appid: wxContext.APPID,
		unionid: wxContext.UNIONID,
		env: wxContext.ENV,
	}
}
