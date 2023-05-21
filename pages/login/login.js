// pages/login/login.js
Page({

	data:{
		account:'',
		password:''
	},

	//去注册页
register(){
	wx.navigateTo({
		url: '../register/register',
	})
},
	//获取登录信息
	getAccount(e){
		console.log('账号获取成功')
		console.log(e.detail.value);
		this.setData({
			account:e.detail.value
		})
	},
	getPs(e){
		this.setData({
			password:e.detail.value
		})
	},
//点击登录
	login(){
		let account = this.data.account
		let password = this.data.password

		if(!account||!password){
			wx.showToast({
				icon:"error",
				title: '请输入账号密码',
			})
			return
		}
		console.log('account=',account)
		console.log('password=',password)

		wx.cloud.database().collection('User').where({
			account,
			password
		}).get().then(res=>{
			console.log('登录结果',res)
			if(res.data && res.data.length > 0){
				wx.setStorageSync('User', res.data[0])
				wx.showToast({
					title: '登录成功',
				}),
				setTimeout(function() {
					wx.navigateBack({
						delta:0
					})
				},700)
			}
			else{
				wx.showToast({
					icon:"error",
					title: '账号密码错误',
				})
			}
		})
	},
})