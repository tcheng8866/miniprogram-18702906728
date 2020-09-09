//app.js
App({
	onLaunch: function() {
		if (!wx.cloud) {
			console.error('请使用 2.2.3 或以上的基础库以使用云能力')
		} else {
			wx.cloud.init({
				env: 'cloud-6jtgy',
				traceUser: true
			})
		}
	},
	// 全局数据(onLaunch外边)
	globalData: {
		userInfo: null,
		today: new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate(),
		timestamp: new Date().getTime().toString().substr(0, 10),
		getUserInfoPromise: function() {
			return new Promise((resolve, reject) => {
				// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
				wx.getUserInfo({
					lang: 'zh_CN', // 显示用户信息的语言
					success: res => {
						resolve(res)
					},
					fail: err => {
						resolve(err)
					}
				})
			})
		}
	},
})
