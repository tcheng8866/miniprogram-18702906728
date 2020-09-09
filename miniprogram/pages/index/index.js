var app = getApp()
Page({
	data: {},
	onLoad: function(options) {},
	onShow() {
		console.log("index", app.globalData.userInfo)
		wx.showToast({
			title: '数据加载中...',
			icon: 'loading',
			duration: 500,
			mask: true
		})
		this.selectComponent("#voteList").getList();
	},
	onShareAppMessage: function(res) {}
})
