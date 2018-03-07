//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    userInfo: '',
    isLogin: false,
    loginPhone:'',
    loginPwd:'',
    mainSwiper: {
      imgUrls: [
        app.globalData.imgUrl + "/swiper/banner@3x.png",
        app.globalData.imgUrl + "/swiper/banner@3x.png",
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      circular: true,
    },
    entranceList: [
      {
        name: "院校信息",
        imgUrl: app.globalData.imgUrl + "/icon/yuanxiao@3x.png",
        isOpen: false
      },
      {
        name: "专业信息",
        imgUrl: app.globalData.imgUrl + "/icon/zhuanye@3x.png",
        url: '/pages/subjectInfo/subjectInfo',
        isOpen: true
      },
      {
        name: "历届录取信息",
        imgUrl: app.globalData.imgUrl + "/icon/luquxinxi@3x.png",
        url: '/pages/MatriculateHistory/MatriculateHistory',
        isOpen: true
      },
      {
        name: "心理测试",
        imgUrl: app.globalData.imgUrl + "/icon/xinliceshi@3x.png",
        isOpen: false
      },
      {
        name: "志愿设计",
        imgUrl: app.globalData.imgUrl + "/icon/zhiyuansheji@3x.png",
        url: '/pages/wishDesignList/wishDesignList',
        isOpen: true
      },
      {
        name: "专家咨询",
        imgUrl: app.globalData.imgUrl + "/icon/zhuanjia@3x.png",
        isOpen: false
      },
    ],
    schoolSwiper: {
      imgUrls: [
        app.globalData.imgUrl + "/swiper/xiada@3x.png",
        app.globalData.imgUrl + "/swiper/fuda@3x.png",
        app.globalData.imgUrl + "/swiper/shida@3x.png",
        app.globalData.imgUrl + "/swiper/nongda@3x.png",
      ],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      circular: true,
      previousMargin: '65rpx',
      nextMargin: '65rpx'
    },
  },
  // 未开放功能
  noOpen: function () {
    wx.showToast({
      title: '功能暂未开放',
      icon: 'none',
      duration: 2000
    })
  },
  changeInput: function (event){
    switch (event.currentTarget.dataset.typeid) {
      case "1":
        this.setData({
          loginPhone: event.detail.value
        }); break;
      case "2":
        this.setData({
          loginPwd: event.detail.value
        }); break;
    }
  },
  login:function(){
    let that =this;
    wx.request({
      url: app.globalData.api + '/login',
      data: {
        mobileNum: that.data.loginPhone,
        passwd: util.md5(that.data.loginPhone),
        verifiedType: '0'
      },
      success: function (res) {
        console.log(res)
        if (res.data.RESULTS == "SUCCESS"){
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            isLogin: true
          })
          that.getUser(res)
       
        }
      }
    })
  },
  getUser:function(info){
    wx.request({
      url: app.globalData.api + '/showUserInfo',
      data: {
        userId: info.USER_ID
      },
      success: function (res) {
        console.log(info)
        wx.setStorageSync('user', {
          role: info.data.ROLE,
          id: info.data.USER_ID,
          info: res.data
        })
        console.log(wx.getStorageSync('user'))
      }
    })
  },
  onLoad: function () {
    if (wx.getStorageSync('user')) {
      this.setData({
        isLogin: true
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
