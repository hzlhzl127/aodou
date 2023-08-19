// pages/myjoin/myjoin.js
Page({
	onShow() {
		let user = wx.getStorageSync('User');
		const db = wx.cloud.database();
    const activityCollection = db.collection('activity');
    activityCollection.where({
			number:user.name
		}).get().then(res => {
			// 将获取到的活动数据赋值给 activities 数组
			console.log('活动列表成功请求',res)
      this.setData({
        activities: res.data
      });
    }).catch(err => {
      console.error(err);
		});
		
	},
	
	goToPage(e) {
		console.log('成功拿到的数据是',e.currentTarget.dataset.id),
    wx.navigateTo({
			url: '../activity/activity?id='+e.currentTarget.dataset.id,
    })
	},
})