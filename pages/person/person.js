// pages/person/person.js
Page ({
 data:{
			user:{
			
			}
 },
 	onShow: function(){
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
		 this.setData({
			 user:{

			 }
		 })
	 }
});