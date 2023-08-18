// pages/found/found.js
Page({
	data:{
			buttonClass1: 'item',
			buttonClass2: 'item',
			buttonClass3: 'item',
			buttonClass4: 'item',
			buttonClass5: 'item',
			buttonClass6: 'item',
			buttonClass7: 'item', // 初始类名
			videoHide:false,
},
onLoad(){

	var that = this;
	var targetDate = new Date('2023-07-29T06:00:00'); // 设置目标日期和时间
	var currentTime = new Date(); // 获取当前日期和时间
	if (currentTime >= targetDate) {
		that.setData({
			videoHide: true,
		});
	}
},
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
	no:function () {
		
		wx.showToast({
			icon:'error',
			title: '此功能仅供会员',
		});
		this.setData({
			buttonClass1: 'item',
			buttonClass2: 'item',
			buttonClass3: 'item',
			buttonClass4: 'item',
			buttonClass5: 'item',
			buttonClass6: 'item',
			buttonClass7: 'item',
		});
	},
	touch:function (event) {
		const buttonId = event.currentTarget.id;
		this.setData({
			['buttonClass'+buttonId]:'item-check',
		});
		console.log(buttonId);
	},
	star:function () {
		wx.navigateTo({
			url: '../star/star',
		});
		this.setData({
			buttonClass1: 'item',
			buttonClass2: 'item',
			buttonClass3: 'item',
			buttonClass4: 'item',
			buttonClass5: 'item',
			buttonClass6: 'item',
			buttonClass7: 'item',
		});
	},
	course:function () {
		wx.navigateTo({
			url: '../course/course',
		});
		this.setData({
			buttonClass1: 'item',
			buttonClass2: 'item',
			buttonClass3: 'item',
			buttonClass4: 'item',
			buttonClass5: 'item',
			buttonClass6: 'item',
			buttonClass7: 'item',
		});
	},
	vip:function () {
		wx.navigateTo({
			url: '../vip/vip',
		});
		this.setData({
			buttonClass1: 'item',
			buttonClass2: 'item',
			buttonClass3: 'item',
			buttonClass4: 'item',
			buttonClass5: 'item',
			buttonClass6: 'item',
			buttonClass7: 'item',
		});
	},
	xi:function () {
		wx.navigateTo({
			url: '../xi/xi',
		});
		this.setData({
			buttonClass1: 'item',
			buttonClass2: 'item',
			buttonClass3: 'item',
			buttonClass4: 'item',
			buttonClass5: 'item',
			buttonClass6: 'item',
			buttonClass7: 'item',
		});
	},
	
})