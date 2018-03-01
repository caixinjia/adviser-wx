// pages/MatriculateHistory/MatriculateHistory.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchData:{
      schoolName:'',
    },
    result:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this;
    wx.request({
      url: app.globalData.api + '/loadHistoryScoreList',
      data: {
        subjectType: '2',
        // recruitBatch: '102',
        // subjectClass: '10012',
        schoolName: '清华',
        // subjectName: '电子',
        beginRow:1,
        endRow:10
      },
      success: function (res) {
        console.log(res)
        that.setData({
          result:res.data
        })
      }
    })
    wx.hideLoading()
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