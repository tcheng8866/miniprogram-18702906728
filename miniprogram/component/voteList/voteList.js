Component({
	properties: {},
	data: {
		list: []
	},
	ready() {
		// this.getList()
	},
	methods: {
		/* 列表 */
		async getList() {
			const db = wx.cloud.database()
			await db.collection("voteList").get().then(res => {
				const list = res.data
				this.setData({
					list: list
				})
			}).catch(err => {
				console.log(err)
			})
		},
		// 详情
		clickItem(e) {
			const _id = e.currentTarget.dataset._id
			wx.navigateTo({
				url: `/pages/joinVote/joinVote?_id=${_id}`
			})
		}
	}
})
