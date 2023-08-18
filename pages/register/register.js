// pages/register/register.js
Page({

	chooseImg(){

		let that = this

		wx.chooseMedia({
			mediaType:'image',
			sourceType: ['album'||'camera'],
			count:1,
			sizeType:['compressed'],
			success(res) {
				wx.showToast({
					title: '头像上传成功',
				})
				console.log(res)
				that.uploadImg(res.tempFiles[0].tempFilePath)
			}
		})
	},
uploadImg(temFile){
	console.log("要上传图片的临时路径",temFile)
	const randomNum = Math.floor(Math.random() * 1000000);
	const cloudPath = `用户头像/${randomNum}.jpg`;
wx.cloud.uploadFile({
	cloudPath:cloudPath,
	filePath:temFile,
	success: res=>{
		console.log('上传成功',res)
		this.setData({
			avatarUrl: res.fileID // 保存文件 ID 到 avatarUrl
		})
	},
	fail(err){
		console.log('上传失败',err)
	}
})
},

	register(e){
		console.log('捕获到点击注册',e)
		let item = e.detail.value
		
		if(!item.account||!item.password||!item.name){
			wx.showToast({
				icon:"error",
				title: '请将信息填写完整',
			})
			return 
		}
		
		wx.cloud.database().collection('User').add({
			data:{
				account:item.account,
				_id:item.account,
				password:item.password,
				name:item.name,
				avatarUrl:this.data.avatarUrl,
			}
			
		}).then(res=>{
			if (item.account.length < 5 ) {
				wx.showToast({
					icon: "error",
					title: '需要账号长度>5',
				});
				return;
			}
			if (item.password.length < 5) {
				wx.showToast({
					icon: 'error',
					title: '需要密码长度>5',
				});
				return;
			}
			wx.showToast({
				title: '注册成功',
			});
			setTimeout(function() {
			wx.navigateBack({
				delta:0
			})
		},700),
			console.log('注册结果',res)
		}).catch(res=>{
			console.log('注册失败',res)
			wx.showToast({
				icon:'error',
				title: '此账号已被注册',
			})
		})

	}
})