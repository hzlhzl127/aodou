// index.js
// 获取应用实例
Page({
	// 点击登录按钮触发的事件
	data:{
		tabClass1:'tab_list',
		tabClass2:'tab_list',
		tabClass3:'tab_list',
		show:false,
		account:''
	},

  onPageScroll(event) {
    const scrollTop = event.scrollTop;
    const showBackToTop = scrollTop > 200;  // 当滚动距离大于200px时显示返回顶部按钮
    this.setData({
      showBackToTop
    });
  },
  scrollToTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    });
  },


  onShow() {
		const db = wx.cloud.database();
		const activityCollection = db.collection('activity');
		this.setData({
			tabClass1:'tab_list',
			tabClass2:'tab_list',
			tabClass3:'tab_list',
		})
    activityCollection.get().then(res => {
			// 将获取到的活动数据赋值给 activities 数组
			console.log('活动列表成功请求',res)
      this.setData({
        activities: res.data
      });
    }).catch(err => {
      console.error(err);
		});
		
		


		var that = this;
	
		let user = wx.getStorageSync('User');
		console.log('程序密钥',user._id)

		const dd = wx.cloud.database();
		const ac = dd.collection('admin');
		ac.get().then(res => {
			console.log('管理得到', res);
			this.setData({
				account: res.data
			});
			console.log(this.data.account);
	
			// 遍历account数组，查找是否有匹配的_id字段
			that.setData({
				show: false,
			});
			this.data.account.forEach(item => {
				if (item.account === user._id) {
					that.setData({
						show: true,
					});
				}
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
		show:false,
		showBackToTop: false,
		showElement: true, // 初始状态为显示元素
		keyword:'',
    imageUrls: [
			'../../picture/www.yalijuda.com_img_20230530_110037_O6gywGNoVB.jpg',
			'../../picture/www.yalijuda.com_img_20230530_110127_ANmLQblcJU.jpg',
			'../../picture/www.yalijuda.com_img_20230530_110149_dZglhz6KA_.jpg'
    ]
  },
	
	tab: function () {
		console.log('开始此时值为',this.data.showElement);
		this.setData({
			showElement: !this.data.showElement, // 切换显示状态
			tabClass1:'tab_list',
			tabClass2:'tab_list',
			tabClass3:'tab_list',
		});

		setTimeout(() => {
			this.setData({
				showElement: !this.data.showElement, // 切换显示状态
			});
			console.log('延迟后此时值为', this.data.showElement);
		}, 
		300);

	
		console.log('此时值为',this.data.showElement);
	},


	handleInput(event) {
    const keyword = event.detail.value;  // 获取用户输入的关键字
    this.setData({
      keyword: keyword  // 将关键字保存在页面数据的 keyword 中
    });
  },

	sear: function () {
		const keyword = this.data.keyword;  // 获取用户输入的关键字
		const db = wx.cloud.database();  // 获取数据库实例
		console.log("得到的输入是",keyword)
		db.collection('activity')
    .where({
      name: db.RegExp({
        regexp: keyword,
        options: 'i'  // 忽略大小写
      })
    })
    .get()
    .then(res => {
      const activities = res.data;  // 获取搜索结果
      if (activities.length > 0) {
        const activityId = activities[0]._id;  // 假设获取第一个匹配的活动ID
        wx.navigateTo({
          url: '../activity/activity?id=' + activityId,
        });
      } else {
				// 没有匹配的数据处理逻辑
				wx.showToast({
					icon:'error',
					title: '未查询到结果',
				})
      }
    })
    .catch(err => {
			console.error('搜索失败：', err);
    });
	},

	put: function () {

		let hasMatch = false;
		var that = this;
	
		let user = wx.getStorageSync('User');
		console.log('程序密钥',user._id)

		const db = wx.cloud.database();
		const ac = db.collection('admin');
		ac.get().then(res => {
			console.log('管理得到', res);
			this.setData({
				account: res.data
			});
			console.log(this.data.account);
	
			// 遍历account数组，查找是否有匹配的_id字段
			this.data.account.forEach(item => {
				if (item.account === user._id) {
					hasMatch = true;
				}
			});

			if (!hasMatch) {
				wx.switchTab({
					url: '../person/person',
				});
			}else{
				wx.navigateTo({
					url: '../put/put',
				})
			}

		}).catch(err => {
			console.error(err);
		});

	},
	tabTouch:function (event) {
		const buttonId = event.currentTarget.id;
		this.setData({
			['tabClass'+buttonId]:'checkTab',
		});
		console.log(buttonId);
	},

});