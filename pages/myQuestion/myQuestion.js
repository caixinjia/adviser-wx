// pages/myQuestion/myQuestion.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    qTime:'',
    aTime:''

  },
  // 搜索
  search() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this;
    wx.request({
      url: app.globalData.api + '/loadMavinQAList',
      data: {
        qaUser: wx.getStorageSync('userId')
      },
      success: function (res) {
        if (res.data != '\r\n') {
          that.setData({
            result: res.data,
            qTime: that.formatDate(res.data[0].QUESTION_TIME),
            aTime: that.formatDate(res.data[0].ANSWER_TIME)
          })
        } else {
          that.setData({ result: [], })
        }
      }
    })
    wx.hideLoading();

  },
  formatDate(time) {
    if (time != '') {
      let y = time.substr(0, 4);
      let m = time.substr(4, 2);
      let d = time.substr(6, 2);
      let h = time.substr(8, 2);
      let s = time.substr(10, 2);
      return y + '-' + m + '-' + d + ' ' + h + ':' + s;
    } else {
      return ''
    }

  },
  toMavinList(){
    wx.navigateTo({
      url: '/pages/mavinList/mavinList',
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
    this.search();
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