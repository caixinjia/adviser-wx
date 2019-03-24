// pages/wishDesignList/wishDesignList.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    functions: [
      // {
      //   link: '/pages/eliteSchools/eliteSchools',
      //   imgUrl: app.globalData.imgUrl + "/swiper/zhiyuan/1@3x.png",
      //   vipFlag: false
      // },
      // {
      //   link: '/pages/goSchools/goSchools',
      //   imgUrl: app.globalData.imgUrl + "/swiper/zhiyuan/2@3x.png",
      //   vipFlag: false
      // },
      {
        link: '/pages/wishDesign/wishDesign',
        imgUrl: app.globalData.imgUrl + "/swiper/zhiyuan/3@3x.png",
        vipFlag: true
      },
      {
        link: '/pages/wishDesign/wishDesign?type=junior',
        imgUrl: app.globalData.imgUrl + "/swiper/zhiyuan/4@3x.png",
        vipFlag: true
      },
    ],
    vipImg: app.globalData.imgUrl + "/icon/zhiyuanshejiVIP@3x.png",
    isComplete: app.isInfoComplete(),
    isVip:app.isVip()
  },
  toWishDesign:function(event){
    if (!this.data.isComplete) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      })
    }else{
      wx.navigateTo({
        url: event.currentTarget.dataset.url,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.isLogin();
      this.setData({
        isComplete: app.isInfoComplete(),
        isVip: app.isVip()
      })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.shareTitle,
      path: '/pages/index/index'
    }
  },
})