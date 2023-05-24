Page({
    data: {
      name: '',
      price: '',
      image: '',
      isGrounded: false,
      isLimited: false,
      size: [],
      color: [],
      description: ''
    },
    onNameInput: function (event) {
      this.setData({
        name: event.detail.value
      })
    },
    onPriceInput: function (event) {
      this.setData({
        price: event.detail.value
      })
    },
    async onUploadTap() {
        try {
          // 选择图片
          const res = await wx.chooseMedia({
            count: 1, // 最多选择一张图片
            mediaType: ['image'], // 只能选择图片
            sourceType: ['album', 'camera'] // 可以从相册和相机中选择
          });
          const {tempFiles} = res;
          // 确认上传
          const confirmRes = await wx.showModal({
            title: '提示',
            content: '你确定要添加当前图片吗？'
          });
          if (confirmRes.confirm) {
            // 上传图片到云存储
            const uploadRes = await wx.cloud.uploadFile({
              cloudPath: `goods/${Date.now()}-${Math.floor(Math.random(0, 1) * 10000000)}.png`,
              filePath: tempFiles[0].tempFilePath
            });
            const {image} = this.data;
            // 保存上传成功的图片链接
            this.setData({
              image: uploadRes.fileID
            });
            console.log(uploadRes.fileID)
            console.log(this.data.image);
          }
        } catch (err) {
          console.error(err);
        }
      },
    onGroundingChange: function (event) {
      this.setData({
        isGrounded: event.detail.value
      })
    },
    onRulesChange: function (event) {
      this.setData({
        isLimited: event.detail.value
      })
    },
    onSizeChange: function (event) {
      this.setData({
        size: event.detail.value
      })
    },
    onColorChange: function (event) {
      this.setData({
        color: event.detail.value
      })
    },
    onTitleInput: function (event) {
      this.setData({
        description: event.detail.value
      })
    },
    onSubmitTap: function (event) {
      var name = this.data.name;
      var price = this.data.price;
      var image = this.data.image;
      var isGrounded = this.data.isGrounded;
      var isLimited = this.data.isLimited;
      var size = this.data.size;
      var color = this.data.color;
      var description = this.data.description;
  
      // 验证表单数据
      if (!name || !price || !image || !description) {
        wx.showToast({
          title: '请完善信息',
          icon: 'none'
        })
        return;
      }
  
      // 写入云开发数据库
      const db = wx.cloud.database();
      db.collection('testGit').add({
        data: {
          name: name,
          price: price,
          image: image,
          isGrounded: isGrounded,
          isLimited: isLimited,
          size: size,
          color: color,
          description: description
        },
        success: function (res) {
          wx.showToast({
            title: '添加成功',
            icon: 'success'
          })
        },
        fail: function (err) {
          wx.showToast({
            title: '添加失败',
            icon: 'none'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    //   wx.navigateTo({
    //     url: '/pages/xianqing/xiangqing',
    //   });
    }
  })
  