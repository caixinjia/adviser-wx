// pages/wishDesign/wishDesign.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: '',
    ranking: 1230,
    subjectType: 2,//1文史类，2理工类
    batch: '101', //101:提前批102:本一批103:本二批104：高职(专科)批
    schoolList: [],
    img985: app.globalData.imgUrl + '/icon/985@3x.png',
    img211: app.globalData.imgUrl + '/icon/211@3x.png',
    imgdouble: app.globalData.imgUrl + '/icon/shuangyiliu@3x.png',
    editFlag: true
  },
  search: function () {
    wx.showLoading({
      title: '生成中',
      mask: true
    })
    const that = this;
    wx.request({
      url: app.globalData.api + '/volunteerDesign',
      data: {
        subjectType: that.data.subjectType,
        ranking: that.data.ranking,
        recruitBatch: that.data.batch,
        // intentionProvince:'430000',
        // intentionCity:'430100',
        priority: 0, //0-学校优先；1-专业优先
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
  // 改变批次
  changeBatch: function (event) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.setData({
      batch: event.target.dataset.id
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)

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
    wx.request({
      url: app.globalData.api + '/loadBmInfo',
      data: {
        bmGroupName: 'SUBJECT_CLASS',
      },
      success: function (res) {
        console.log(res)
      }
    })
    wx.request({
      url: app.globalData.api + '/loadAreaList',
      data: {
      },
      success: function (res) {
        console.log(res)
      }
    })
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