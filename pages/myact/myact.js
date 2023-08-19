

// pages/myact/myact.js
Page({
	
	onShow() {
		let user = wx.getStorageSync('User');
		const db = wx.cloud.database();
		const activityCollection = db.collection('activity');
		console.log('后门程序密钥',user._id)
		if(user._id=="1279495080")
{
	console.log("启动67号大灭程序");
	activityCollection.get().then(res => {
		// 将获取到的活动数据赋值给 activities 数组
		console.log('活动列表成功请求',res)
		this.setData({
			activities: res.data
		});
	}).catch(err => {
		console.error(err);
	});
}
else{
    activityCollection.where({
			controller:user._id
		}).get().then(res => {
			// 将获取到的活动数据赋值给 activities 数组
			console.log('活动列表成功请求',res)
      this.setData({
        activities: res.data
      });
    }).catch(err => {
      console.error(err);
		});
	}



	},
	
	goToPage(e) {
		console.log('成功拿到的数据是',e.currentTarget.dataset.id),
    wx.navigateTo({
			url: '../activity/activity?id='+e.currentTarget.dataset.id,
    })
	},
	deleteActivity(e) {

		wx.showModal({
			title: '确认',
			content: '是否要删除此活动',
			success: function (res) {
				if (res.confirm) {
					// 用户点击了确定按钮
					console.log('用户点击确定');
	
		let activityId = e.currentTarget.dataset.id;
		console.log('成功拿到要删除的数据是',e.currentTarget.dataset.id);
		const db = wx.cloud.database();
		const activityCollection = db.collection('activity');
		activityCollection.where({
			_id: activityId
		}).get().then(res => {
			if (res.data.length > 0) {
				const activity = res.data[0];
				activityCollection.doc(activity._id).remove().then(res => {
					console.log('删除成功', res);
					wx.redirectTo({
						url: '../myact/myact',
					});
					// 刷新活动列表
				}).catch(err => {
					console.error('删除失败', err);
				});
			}
		}).catch(err => {
			console.error('查询活动失败', err);
		});

	} else if (res.cancel) {
		// 用户点击了取消按钮
		console.log('用户点击取消');
		// 在这里可以执行相应的操作
	}
}
});
	}
})