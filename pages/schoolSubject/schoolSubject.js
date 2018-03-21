// pages/schoolSubject/schoolSubject.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryData:'',
    result:'',
    imgNo: app.globalData.imgUrl + '/icon/zhiyuan-no@3x.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.setData({
      queryData: JSON.parse(options.data)
    })
    let that = this;
    wx.request({
      url: app.globalData.api + '/subjectDesign',
      data: {
        userId: wx.getStorageSync('userId'),
        recruitId: that.data.queryData.recruitId,
        subjectType: that.data.queryData.subjectType,
        // ranking: that.data.queryData.ranking,
        recruitBatch: that.data.queryData.recruitBatch,
        priority: that.data.queryData.priority,
        intentionSubject: that.data.queryData.intentionSubject.join(','),
      },
      success: function (res) {
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