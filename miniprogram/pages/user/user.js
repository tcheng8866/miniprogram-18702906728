var app = getApp()
Page({
	data: {
		userInfo: {
			nickName: '点击获取图像',
			avatarUrl: '/images/user.jpg',
			gender: 1, // 1 男; 2 女
			country: '中华人民共和国共和国',
			province: '陕西省',
			city: '商洛市'			
		},
	},
	// 没有授权是可以操作数据库、云函数的、有openid
	onLoad: function(options) {
		// 有授权：更新全局用户信息; 只是获取不到用户用户信息（微信号、头像）而已
		wx.getSetting({
			success: res => {
				console.log("authSetting", res.authSetting)
				if (res.authSetting['scope.userInfo']) {
					app.globalData.getUserInfoPromise()
					.then(res=> {
						app.globalData.userInfo = res.userInfo
						this.setData({
							userInfo: res.userInfo
						})
						console.log("初始化更新", app.globalData.userInfo)
					}).catch(e => {
						console.log("promise fail", e)
					})
				}
			}
		})
	},
	// 点击按钮：获得用户信息
	getUserInfoFun() {
		const userInfo = app.globalData.userInfo
		if (userInfo) return
		wx.getUserInfo({
			lang: 'zh_CN', // 显示用户信息的语言:简体中文,默认英语
			success: res => {
				app.globalData.userInfo = res.userInfo
				this.setData({
					userInfo: res.userInfo
				})
				console.log("点击更新", this.data.userInfo)
			}
		})
	},
  onShareAppMessage: function (res) {}
})
