//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  onShow:function(){
    console.log('onShow',this);
    console.log(wx.getStorageSync('todo'))
    console.log(wx.getStorageSync('todone'))
    this.globalData.todo = wx.getStorageSync('todo');
  },
  onHide:function(){
    console.log('onHide',this);
    // wx.setStorage('toDoList':)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    todo:null
  }
})
