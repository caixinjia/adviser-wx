// pages/MatriculateHistory/MatriculateHistory.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchSchoolName: '',
    result: [],
    filterIsOpen:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 搜索
  search(){
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
        schoolName: that.data.searchSchoolName,
        // subjectName: '电子',
        endRow: 100
      },
      success: function (res) {
        if (res.data != '\r\n') {
          that.setData({ result: res.data })
        } else {
          wx.showToast({
            title: '暂无数据',
            icon: 'none',
            duration: 2000
          })
          that.setData({ result: [], })
        }
      }
    })
    wx.hideLoading()
  },
  // 改变搜索条件
  changeSearch(event) {
    console.log(event)
    switch (event.currentTarget.dataset.typeid) {
      case "1":
        this.setData({
          searchSchoolName: event.detail.value
        }); break;
    }
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