Page({
    data: {
      products: [], // 用来存储商品列表数据
    },
    onLoad: function () {
      // 调用云函数获取商品列表数据
      wx.cloud.callFunction({
        name: 'index',
        success: res => {
           // 将获取到的数据设置给data对象中的products属性
           this.setData({
             products: res.result.result.data
           });
           console.log(res.result.result.data)
        },
        fail: err => {
          console.error(err);
        }
      });
    }
  });
  