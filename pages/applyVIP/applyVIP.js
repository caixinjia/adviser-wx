// pages/applyVIP/applyVIP.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleImg: app.globalData.imgUrl + "/background/viphy@3x.png",
  },
  pay() {
    let that = this;
    new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.api + '/buyVIP',
        data: {
          openId: app.globalData.openId,
          userId:wx.getStorageSync('userId')
        },
        success: function (res) {
          wx.requestPayment({
            'timeStamp': res.data.timeStamp,
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': 'MD5',
            'paySign': res.data.paySign,
            'success': function (res) {
              wx.showToast({
                title: '支付成功',
                icon: 'success'
              })
              setTimeout(()=>{
                wx.clearStorageSync()
                wx.switchTab({
                  url: '/pages/index/index',
                })
              },1000)
            },
            'fail': function (res) {
              wx.showToast({
                title: '支付失败',
                icon: 'none'
              })
            }
          })
        }
      })
    })
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
  onShareAppMessage: function () {
  
  }
})