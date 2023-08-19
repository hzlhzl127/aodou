// pages/put/put.js
Page({
	data:{
		starTime: "",
		endTime:"",
	},

	DateChange: function (event) {
		const dateId = event.currentTarget.id;
		const selectedDate = event.detail.value;
	
		if (dateId === "1") {
			this.setData({
				starTime: selectedDate,
			});
		} else if (dateId === "2") {
			this.setData({
				endTime: selectedDate,
			});
		}
	
		console.log("日期修改成功");
		console.log(selectedDate);
	},

	onShow(){
		
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
			}

		}).catch(err => {
			console.error(err);
		});


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


	chooseImg(){

		let that = this

		wx.chooseMedia({
			mediaType:'image',
			sourceType: ['album'|| "camera"],
			count:1,
			sizeType:['compressed'],
			success(res) {
				wx.showToast({
					title: '图片上传成功',
				})
				console.log(res)
				that.uploadImg(res.tempFiles[0].tempFilePath)
			}
		})
	},
uploadImg(temFile){
	console.log("要上传图片的临时路径",temFile)
	const randomNum = Math.floor(Math.random() * 1000000);
	const cloudPath = `活动图片/${randomNum}.jpg`;
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
		let user = wx.getStorageSync('User')
		console.log('缓存的信息',user.account)
		if(!item.place||!item.starTime||!item.endTime||!item.name||!item.contact||!item.actext){
			wx.showToast({
				icon:"error",
				title: '请将信息填写完整',
			})
			return 
		}
		// if (!this.data.avatarUrl) {
		// 	wx.showToast({
		// 		icon:"error",
		// 		title: '缺少活动图片',
		// 	});
		// 	return;
		// }
		wx.cloud.database().collection('activity').add({

			data:{
				place:item.place,
				name:item.name,
				starTime:item.starTime,
				endTime:item.endTime,
				contact:item.contact,
				actext:item.actext,
				avatarUrl: this.data.avatarUrl,
				controller:user.account,
				number:[user.name],
			}
			
		}).then(res=>{
		
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
	},


})