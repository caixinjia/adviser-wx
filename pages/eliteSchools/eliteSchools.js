// pages/eliteSchools/eliteSchools.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: wx.getStorageSync('userInfo').SCORE,
    ranking: wx.getStorageSync('userInfo').RANKING,
    subjectType: wx.getStorageSync('userInfo').SUBJECT_TYPE,//1文史类，2理工类
    subjectName: wx.getStorageSync('userInfo').SUBJECT_TYPE_TEXT,
    schoolList: [],
    img985: app.globalData.imgUrl + '/icon/985@3x.png',
    img211: app.globalData.imgUrl + '/icon/211@3x.png',
    imgdouble: app.globalData.imgUrl + '/icon/shuangyiliu@3x.png',
    editFlag: false
  },
  search: function () {
    wx.showLoading({
      title: '生成中',
      mask: true
    })
    const that = this;
    wx.request({
      url: app.globalData.api + '/loadMySchool',
      data: {
        // userId: wx.getStorageSync('userId'),
        subjectType: that.data.subjectType,
        ranking: that.data.ranking,
        recruitBatch: '',
        endRow: 100 //默认显示100行
      },
      success: function (res) {
        if (res.data != '\r\n') {
          that.setData({ schoolList: res.data })
        } else {
          wx.showToast({
            title: '暂无数据',
            icon: 'none',
            duration: 2000
          })
          that.setData({ schoolList: [] })
        }
      }
    })
    wx.hideLoading()
  },
  // 改变排名
  changeRank: function (event) {
    this.setData({
      ranking: event.detail.value
    })
  },
  //改变文理科
  changeWenli(event) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.setData({
      subjectType: event.target.dataset.id
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
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