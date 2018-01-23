//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    mainSwiper:{
      imgUrls: [
        app.globalData.imgUrl+'/swiper/会员招募@2x.png',
        app.globalData.imgUrl+'/swiper/怀梦想 致远方@2x.png',
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      circular:true,
    },
    entranceList:[
      {
        name:"院校信息",
        imgUrl: app.globalData.imgUrl +"/icon/院校信息@2x.png"
      },
      {
        name: "专业信息",
        imgUrl: app.globalData.imgUrl +"/icon/专业信息@2x.png"
      },
      {
        name: "历届录取信息",
        imgUrl: app.globalData.imgUrl +"/icon/历届录取信息@2x.png"
      },
      {
        name: "心理测试",
        imgUrl: app.globalData.imgUrl +"/icon/心理测试@2x.png"
      },
      {
        name: "志愿设计",
        imgUrl: app.globalData.imgUrl +"/icon/志愿设计@2x.png"
      },
      {
        name: "专家咨询",
        imgUrl: app.globalData.imgUrl +"/icon/专家咨询@2x.png"
      },
    ],
    schoolSwiper: {
      imgUrls: [
        app.globalData.imgUrl +"/swiper/学校-厦大@2x.png",
        app.globalData.imgUrl +"/swiper/学校-福大@2x.png",
        app.globalData.imgUrl +"/swiper/学校-师大@2x.png",
        app.globalData.imgUrl +"/swiper/学校-农大@2x.png",
      ],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      circular: true,
    },
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
