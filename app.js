//app.js
App({
  onLaunch: function () {
    this.checkUpdate();
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        wx.request({
          url: that.globalData.api + '/getWxUserOpenId',
          data: {
            jsCode: res.code
          },
          success: function (res) {
            that.globalData.openId=res.data.OPENID
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // wx.getUserInfo({
          //   withCredentials: true,
          //   success: res => {
          //     // 可以将 res 发送给后台解码出 unionId
          //     this.globalData.userInfo = res.userInfo
          //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //     // 所以此处加入 callback 以防止这种情况
          //     if (this.userInfoReadyCallback) {
          //       this.userInfoReadyCallback(res)
          //     }
          //   }
          // })
        }
      }
    })
    wx.showShareMenu({
      withShareTicket: true
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
          wx.setStorageSync('userRole', res.data.ROLE)
          resolve();
        }
      })
    })

  },
  // 是否填完信息
  isInfoComplete:function(){
    let info = wx.getStorageSync('userInfo');
    if (info.RANKING == '' || info.SCORE == '' || info.SUBJECT_TYPE == ''){

      return false;
    }else{
      return true;
    }
  },
  // 是否是VIP
  isVip:function(){
    let info = wx.getStorageSync('userRole');
    console.log(info)
    // let temporaryVip = wx.getStorageSync('temporaryVip');
    if (info == 'role_vip' || info == 'ROLE_VIP'){
      return true;
    }else{
      return false;
    }
  },
  toApplyVip:function(){
    if (!this.isVip()) {
      wx.showToast({
        title: '请开通会员',
        icon: 'none'
      })
      wx.navigateTo({
        url: '/pages/applyVIP/applyVIP',
      })
      return true;
    }else{
      return false;
    }
  },
  // 是否是临时
  istemporaryVip: function () {
    let info = wx.getStorageSync('userRole');
    if ( info != 'role_vip') {
      return true;
    } else {
      return false;
    }
  },
  // 判断是否登录
  isLogin: function () {
    if (!wx.getStorageSync('userId')) {
      wx.switchTab({
        url: '/pages/index/index'
      })
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },
  // 从接口获取体验时间
  getTemporary: function (id) {
    let that = this;
    return new Promise((resolve, reject) => {
      wx.request({
        url: that.globalData.api + '/getExperienceState',
        data: {
          userId: id
        },
        success: function (res) {
          let time = 1529596800000;
          if (res.data.EXPERIENCE_STATE == '1' && new Date().getTime() < time){
            wx.setStorageSync('temporaryVip',true);
          }else{
            wx.setStorageSync('temporaryVip', false);
          }
          resolve();
        }
      })
    })

  },
  // 获取功能收费情况
  loadVipEnable(){
    let that = this;
    return new Promise((resolve, reject) => {
      wx.request({
        url: that.globalData.api + '/loadVipEnable',
        data: {
        },
        success: function (res) {
          resolve(res);
        }
      })
    })
  },
  checkUpdate(){
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  globalData: {
    AppID: 'wx8e5b52999b5be030',
    openId:'',
    userInfo: null,
    imgUrl: "https://fjgz360.cn/chuxian/webPage/images",
    api: 'https://fjgz360.cn/chuxian',
    areaList: [],
    shareTitle:'戳我，带你见识高考志愿神器！'
  }
})
