// index.js
// 获取应用实例
Page({
  // 点击登录按钮触发的事件
  onLoad() {
		const db = wx.cloud.database();
    const activityCollection = db.collection('activity');
    activityCollection.get().then(res => {
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

	data: {
    imageUrls: [
			'../../picture/QQ截图20220814161528.png',
			'../../picture/QQ截图20220910145858 (1).png'
    ]
  }
	
});