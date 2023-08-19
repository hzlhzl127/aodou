// pages/activity/activity.js
Page({
	onShow(){
		let user = wx.getStorageSync('User');
		if (!user) {
			wx.showToast({
				icon:'error',
				title: '请登录',
			}),
			setTimeout(function() {
				wx.switchTab({
					url: '../person/person',
				})
			},400)
			return;
		}

	},
	data: {
		activities: [], // 初始化为空数组
		number:[]
  },

	onLoad(options) {
		
		const db = wx.cloud.database();
    const activityCollection = db.collection('activity');
    activityCollection.doc(options.id).get().then(res => {
			// 将获取到的活动数据赋值给 activities 数组
			console.log('活动详情列表请求成功',res)
      this.setData({
        activities: res.data
      });
    }).catch(err => {
      console.error(err);
		});
		

	},
	handleButtonClick: function () {
		const that = this; // 保存页面实例的引用，以便在回调函数中使用
		wx.showModal({
			title: '确认',
			content: '是否要参与此活动',
			success: function (res) {
				if (res.confirm) {
					// 用户点击了确定按钮
					console.log('用户点击确定');
	
					// 获取当前用户的信息（假设用户标识信息存储在缓存中）
					let user = wx.getStorageSync('User');
					console.log('获得的用户信息',user)
					// 使用云开发数据库记录用户参与活动
					const db = wx.cloud.database();
					const activityCollection = db.collection('activity');
					const options = that.options; // 获取页面参数
					
					wx.cloud.database().collection('activity').where({
						number: user.name,
						_id: options.id,
					}).get().then(res => {
						if (res.data.length > 0) {
							// 用户已经参加了该活动，不能重复参加
							console.log("已经参加了活动",res)
							wx.showToast({
								icon: "error",
								title: '您已参加该活动',
							})
							return;
						}
					
				

					activityCollection.doc(options.id).update({
						data: {
							number: db.command.push(user.name) // 将当前用户标识添加到参与用户列表中
						},
						success: function (res) {
							console.log('记录用户参与活动成功', res);
							// 进行其他操作或页面刷新
							wx.showToast({
								title: '参加成功',
							})
							wx.redirectTo({
								url: '../activity/activity?id='+options.id,
							})
						},
						fail: function (err) {
							console.error('记录用户参与活动失败', err);
						}
					});
				})
				} else if (res.cancel) {
					// 用户点击了取消按钮
					console.log('用户点击取消');
					// 在这里可以执行相应的操作
				}
			}
		});
	
	
	},
	

	
	
})