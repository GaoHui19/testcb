// app.js
App({
    onLaunch() {
      if(!wx.cloud){
          console.log('版本太低')
      }else{
          wx.cloud.init({
              env:'gw1123wmxag1314-6g1nx0z05bf98341',
              traceUser:true
          })
      }
    },
    globalData: {
      userInfo: null
    }
  })
  