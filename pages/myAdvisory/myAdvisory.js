// pages/myAdvisory/myAdvisory.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  formatTitle(time) {
    if (time != '') {
      let m = time.substr(4, 2);
      let d = time.substr(6, 2);
      return m + '月' + d + '日';
    } else {
      return ''
    }
  },
  getData(){
    let that = this;
    wx.request({
      url: app.globalData.api + '/mavinBespeakList',
      data: {
        userId: wx.getStorageSync('userId')
      },
      success: function (res) {
        if (res.data != '\r\n') {
          for(let item of res.data){
            item.date = that.formatTitle(item.BESPEAK_DATE)
          }
          that.setData({
            result: res.data,
          })
        } else {
          that.setData({ result: [], })
        }
      }
    })
  },
  toAdvisory(){
    wx.navigateTo({
      url: '/pages/mavinList/mavinList',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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