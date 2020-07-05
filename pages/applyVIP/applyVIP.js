// pages/applyVIP/applyVIP.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleImg: app.globalData.imgUrl + "/background/viphy2@3x.png",
    isLoading: false,
    code: '',
    discountCode: '',
  },
  pay() {
    if (this.data.isLoading == true) return;
    let that = this;
    new Promise((resolve, reject) => {
      that.setData({
        isLoading: true
      })
      wx.request({
        url: app.globalData.api + '/buyVIP',
        data: {
          openId: app.globalData.openId,
          userId: wx.getStorageSync('userId')
        },
        success: function(res) {
          wx.requestPayment({
            'timeStamp': res.data.timeStamp,
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': 'MD5',
            'paySign': res.data.paySign,
            'success': function(res) {
              wx.showToast({
                title: '支付成功',
                icon: 'success'
              })
              that.setData({
                isLoading: false
              })
              setTimeout(() => {
                wx.clearStorageSync()
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }, 1000)
            },
            'fail': function(res) {
              wx.showToast({
                title: 'iphone不支持小程序微信支付，请用安卓手机支付',
                icon: 'none',
                duration: 3000
              })
              that.setData({
                isLoading: false
              })
            }
          })
        }
      })
    })
  },
  // 体验
  temporary() {
    const that = this;
    wx.request({
      url: app.globalData.api + '/setExperience',
      data: {
        userId: wx.getStorageSync('userId'),
      },
      success: function(res) {
        wx.showToast({
          title: res.data.MSG,
          icon: 'none'
        })
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }, 1500)
      }
    })

  },
  useCodeVip() {
    if (this.data.isLoading == true) return;
    let that = this;
    new Promise((resolve, reject) => {
      that.setData({
        isLoading: true
      })
      wx.request({
        url: app.globalData.api + '/buyVIP',
        data: {
          openId: app.globalData.openId,
          userId: wx.getStorageSync('userId'),
          discountCode: that.data.discountCode,
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
              that.setData({
                isLoading: false
              })
              setTimeout(() => {
                wx.clearStorageSync()
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }, 1000)
            },
            'fail': function (res) {
              console.log(res)
              wx.showToast({
                title: '无效的优惠码！',
                icon: 'none',
                duration: 3000
              })
              that.setData({
                isLoading: false
              })
            }
          })
        }
      })
    })
  },
  activationCodeVip: function() {
    const that = this;
    wx.request({
      url: app.globalData.api + '/activationCodeVip',
      data: {
        userId: wx.getStorageSync('userId'),
        code: that.data.code
      },
      success: function(res) {
        if (res.data.RESULTS == 'FAILED') {
          wx.showToast({
            title: res.data.MSG,
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: res.data.MSG,
            icon: 'none'
          })
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }, 1500)
        }
      }
    })
  },
  changeCode: function(event) {
    this.setData({
      code: event.detail.value
    })
  },
  changeDiscountCode: function(event) {
    this.setData({
      discountCode: event.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    app.isLogin()
    wx.getSystemInfo({
      success(res) {
        if (res.platform == 'ios'){
          wx.showToast({
            title: '请到公众号网页版或使用安卓手机操作',
            icon: 'none'
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    return {
      title: app.globalData.shareTitle,
      path: '/pages/index/index'
    }
  },
})