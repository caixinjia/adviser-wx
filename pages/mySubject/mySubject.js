// pages/mySubject/mySubject.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result_0: [],
    result_1: [],
    result_2: []
  },
  towishDesign() {
    wx.navigateTo({
      url: '/pages/wishDesignList/wishDesignList',
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
    let that = this;
    wx.request({
      url: app.globalData.api + '/loadVolunteerList',
      data: {
        userId: wx.getStorageSync('userId'),
      },
      success: function (res) {
        let temp0 = [];
          let temp1 = [];
          let temp2 = [];
        for (let item of res.data) {
          if (item.RECOMMEND_TYPE=='0'){
            temp0.push(item)
          } else if (item.RECOMMEND_TYPE == '1'){
            temp1.push(item)
          } else if (item.RECOMMEND_TYPE == '2') {
            temp2.push(item)
          }
        }
        that.setData({
          result:res.data,
          result_0: temp0,
          result_1: temp1,
          result_2: temp2
        })
      }
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
  onShareAppMessage: function () {

  }
})