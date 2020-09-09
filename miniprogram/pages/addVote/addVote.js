var app = getApp()
Page({
	data: {
		title: '',
		desc: '',
		endDate: '',
		total: 0,
		option: [
			{
				name: '',
				value: 0,
			},
			{
				name: '',
				value: 0,
			},
			{
				name: '',
				value: 0,
			},
			{
				name: '',
				value: 0,
			},
			{
				name: '',
				value: 0,
			},
			{
				name: '',
				value: 0,
			}			
		]
	},
	onLoad: function(options) {
		const date = new Date()
		const endDate = (date.getFullYear() + 1) + '-' +
			((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' +
			(date.getDate() > 9 ? date.getDate() : '0' + date.getDate())
		this.setData({
			endDate: endDate
		})
	},
	titleChange: function(e) {
		this.setData({
			title: e.detail.value
		})
	},
	descChange: function(e) {
		this.setData({
			desc: e.detail.value
		})
	},
	endDateChange: function(e) {
		this.setData({
			endDate: e.detail.value
		})
	},
	itemChange(e) {
		const value = e.detail.value
		const index = e.currentTarget.dataset.index
		const option = this.data.option
		const optionNew = option.map((item, i) => {
			if (i == index) {
				item.name = value
			}
			return item
		})
		this.setData({
			option: optionNew
		})
	},
	submit() {	
		const userInfo = app.globalData.userInfo
		console.log("userInfo", userInfo)
		if (!userInfo) {
			wx.showToast({
				title: '请先在个人中心点击头像授权',
				icon: 'none',
				duration: 1000,
				mask:true
			})
			 return			
		}
		
		const avatarUrl = userInfo.avatarUrl
		const nickName = userInfo.nickName

		const endDate = new Date(this.data.endDate).getTime()
		const option = this.data.option
		const optionNew = option.filter(item => {
			return item.name != ''
		})
		
		if (!this.data.title) {
			wx.showToast({
				title: '请输入标题',
				icon: 'none',
				duration: 1000,
				mask:true
			})
			 return
		}
		if (optionNew.length != 4 && optionNew.length != 6) {
			wx.showToast({
				title: '选项只能为4项或6项',
				icon: 'none',
				duration: 1000,
				mask:true
			})			
			 return
		}			
		const obj = {
			title: this.data.title,
			desc: this.data.desc,
			endDate: endDate,
			option: optionNew,
			total: this.data.total,
			avatarUrl: avatarUrl,
			nickName: nickName
		}
		console.log(obj)
		const db = wx.cloud.database()
		db.collection("voteList").add({
			data: obj
		}).then(res => {
			console.log(res)
			wx.showToast({
				title: '成功',
				icon: 'succes',
				duration: 1000,
				mask: true
			})
			setTimeout(() => {
				wx.navigateBack();
			}, 2000)
		})
	},
	onShareAppMessage: function(res) {}
})
