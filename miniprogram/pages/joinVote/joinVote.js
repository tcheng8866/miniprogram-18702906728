import * as echarts from '../../component/ec-canvas/echarts';

function setOption(chart, objArr) {
	const option = {
		backgroundColor: "#ffffff",
		color: ["#37A2DA", "#FFDB5C", "#FF9F7F", "#32C5E9", "#67E0E3", "#91F2DE"],
		series: [{
			label: {
				normal: {
					fontSize: 14
				}
			},
			type: 'pie',
			center: ['50%', '50%'],
			radius: ['40%', '60%'],
			data: objArr
		}]
	};
	chart.setOption(option);
}

var app = getApp()
Page({
	data: {
		item: {},
		objArr: [],
		total: 0,
		curIndex: -1,
		canvasFlag: false,
		ec: {
			// 将 lazyLoad 设为 true 后，需要手动初始化图表
			lazyLoad: true
		}
	},
	onLoad: function(options) {
		wx.showToast({
			title: '数据加载中...',
			icon: 'loading',
			duration: 500,
			mask: true
		})
		this.getInfoByIdWrap(options._id).then(res => {
			this.initChart(this.data.objArr)
		})
	},
	onReady() {
		this.ecComponent = this.selectComponent('#mychart');
	},
	// 点击按钮后初始化图表
	initChart(objArr) {
		this.ecComponent.init((canvas, width, height, dpr) => {
			// 获取组件的 canvas、width、height 后的回调函数
			// 在这里初始化图表
			const chart = echarts.init(canvas, null, {
				width: width,
				height: height,
				devicePixelRatio: dpr // new
			});
			setOption(chart, objArr);
			// 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
			this.chart = chart;
			// 注意这里一定要返回 chart 实例，否则会影响事件处理等
			return chart;
		});
	},
	// 包装一层
	async getInfoByIdWrap(_id) {
		await this.getInfoById(_id).then(res => {
			let item = res.data[0]
			let optionNew = item.option.map((obj, index) => {
				if (index == 0) {
					obj.pre = "A"
				}
				if (index == 1) {
					obj.pre = "B"
				}
				if (index == 2) {
					obj.pre = "C"
				}
				if (index == 3) {
					obj.pre = "D"
				}
				if (index == 4) {
					obj.pre = "E"
				}
				if (index == 5) {
					obj.pre = "F"
				}
				return obj
			})
			this.setData({
				item,
				objArr: optionNew
			})
			console.log(optionNew)
		})
	},
	getInfoById(_id) {
		return new Promise((resolve, reject) => {
			const db = wx.cloud.database()
			db.collection("voteList").where({
				_id: _id
			}).get().then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	},
	clickItem(e) {
		let index = e.currentTarget.dataset.index
		this.setData({
			curIndex: index
		})
	},
	submit() {
		const userInfo = app.globalData.userInfo
		if (!this.data.item._id) {
			wx.showToast({
				title: '请选择选项',
				icon: 'none',
				duration: 1000,
				mask: true
			})
			return
		}
		const _id = this.data.item._id
		const index = this.data.curIndex
		wx.cloud.callFunction({
			name: 'joinVote',
			data: {
				_id: _id,
				index: index
			}
		}).then(res => {
			// 参与后要再查一把、更新数据
			this.getInfoByIdWrap(_id).then(res => {
				// 加载echart
				this.initChart(this.data.objArr)
				wx.showToast({
					title: '参与成功',
					icon: 'succes',
					duration: 1000,
					mask: true
				})
				this.setData({
					canvasFlag: true
				})
			})

		}).catch(err => {
			console.log(err)
		})
	},
	onShareAppMessage: function(res) {}
})
