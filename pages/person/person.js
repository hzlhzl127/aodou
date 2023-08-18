// pages/person/person.js
Page ({
 data:{
			user:{
			},
				buttonClass1: 'item',
				buttonClass2: 'item',
				buttonClass3: 'item',
				buttonClass4: 'item',
				buttonClass5: 'item', // 初始类名
		
 },
 	onShow: function(){
		this.setData({
			buttonClass1: 'item',
			buttonClass2: 'item',
			buttonClass3: 'item',
			buttonClass4: 'item',
			buttonClass5: 'item', 
    });
		let user = wx.getStorageSync('User')
		console.log('缓存的',user)
		this.setData({
			user:user
		})
	 },
	 login(){
		wx.navigateTo({
			url: '../login/login',
		})
	 },

	 loginOut(){
		 wx.removeStorage({
			 key: 'User',
		 })
		 this.setData({
			 user:{

			 }
		 })
	 },

	 myact:function () {
		 wx.navigateTo({
			 url: '../myact/myact',
		 });
		 this.setData({
			buttonClass1: 'item',
			buttonClass2: 'item',
			buttonClass3: 'item',
			buttonClass4: 'item',
			buttonClass5: 'item', 
    });
	 },
	 myeva:function () {
		wx.navigateTo({
			url: '../myeva/myeva',
		});
		this.setData({
			buttonClass1: 'item',
			buttonClass2: 'item',
			buttonClass3: 'item',
			buttonClass4: 'item',
			buttonClass5: 'item', 
    });
	},
	 myjoin:function () {
		wx.navigateTo({
			url: '../myjoin/myjoin',
		});
		this.setData({
			buttonClass1: 'item',
			buttonClass2: 'item',
			buttonClass3: 'item',
			buttonClass4: 'item',
			buttonClass5: 'item', 
    });
	},
	myadv:function () {
		this.setData({
			buttonClass1: 'item',
			buttonClass2: 'item',
			buttonClass3: 'item',
			buttonClass4: 'item',
			buttonClass5: 'item', 
    });
	},
	mybot:function () {
		this.setData({
			buttonClass1: 'item',
			buttonClass2: 'item',
			buttonClass3: 'item',
			buttonClass4: 'item',
			buttonClass5: 'item', 
    });
	},
	touch:function (event) {
		const buttonId = event.currentTarget.id;
		this.setData({
			['buttonClass'+buttonId]:'check-item',
		});
		console.log(buttonId);
	},
});