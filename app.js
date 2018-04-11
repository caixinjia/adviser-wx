//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this; 
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            withCredentials: true,
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getUser: function (id) {
    let that = this;
    return new Promise((resolve,reject)=>{
      wx.request({
        url: that.globalData.api + '/showUserInfo',
        data: {
          userId: id
        },
        success: function (res) {
          wx.setStorageSync('userInfo', res.data)
          resolve();
        }
      })
    })

  },
  // 是否填完信息
  isInfoComplete:function(){
    let info = wx.getStorageSync('userInfo');
    if (info.RANKING == '' || info.SCORE==''||info.SUBJECT_TYPE==''){
      return false;
    }else{
      return true;
    }
  },
  // 是否是VIP
  isVip:function(){
    return true;
    // let info = wx.getStorageSync('userRole');
    // if (info == 'role_vip'){
    //   return true;
    // }else{
    //   return false;
    // }
  },
  // 判断是否登录
  isLogin: function () {
    if (!wx.getStorageSync('userInfo')) {
      wx.switchTab({
        url: '/pages/index/index'
      })
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },
  globalData: {
    AppID: 'wx8e5b52999b5be030',
    AppSecret: 'a9fedfba71feea3b1d56dc2cf48f2c48',
    openId:'',
    userInfo: null,
    imgUrl: "https://fjgz360.cn/chuxian/webPage/images",
    api: 'https://fjgz360.cn/chuxian',
    areaList: []
  }
})
