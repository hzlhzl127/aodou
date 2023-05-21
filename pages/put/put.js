// pages/put/put.js
Page({

	chooseImg(){

		let that = this

		wx.chooseMedia({
			mediaType:Image,
			sourceType: ['album'],
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
wx.cloud.uploadFile({
	cloudPath:'用户头像.jpg',
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
		let user = wx.getStorageSync('User')
		console.log('缓存的信息',user.account)
		if(!item.place||!item.starTime||!item.endTime||!item.name||!item.contact||!item.actext){
			wx.showToast({
				icon:"error",
				title: '请将信息填写完整',
			})
			return 
		}
		
		wx.cloud.database().collection('activity').add({

			data:{
				place:item.place,
				name:item.name,
				starTime:item.starTime,
				endTime:item.endTime,
				contact:item.contact,
				actext:item.actext,
				avatarUrl: this.data.avatarUrl,
				number:[user.account],
			}
			
		}).then(res=>{
			if (!this.data.avatarUrl) {
				wx.showToast({
					icon:"error",
					title: '缺少活动图片',
				});
				return;
			}
			wx.showToast({
				title: '活动发布成功',
			});
			setTimeout(function() {
				wx.switchTab({
				url: '../index/index',
			})
		},700),
			console.log('活动结果',res)
		}).catch(res=>{
	
			console.log('活动失败',res)
		})
	}
})