// pages/schoolDetail/schoolDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recruitId: '',
    result: '',
    img: [
      app.globalData.imgUrl + "/icon/zhuanye@3x.png",
      app.globalData.imgUrl + "/icon/luquxinxi@3x.png",
      app.globalData.imgUrl + "/icon/zhuanjia@3x.png"
    ],
    img985: app.globalData.imgUrl + '/icon/985@3x.png',
    img211: app.globalData.imgUrl + '/icon/211@3x.png',
    imgdouble: app.globalData.imgUrl + '/icon/shuangyiliu@3x.png',
  },
  // 跳转到所选学校专业列表
  toSchoolHistory() {
    let data = {
      schoolName: this.data.result.RECRUIT_NAME,
      subjectName: ''
    }
    console.log(data)
    wx.navigateTo({
      url: '/pages/MatriculateHistory/MatriculateHistory?data=' + JSON.stringify(data)
    })
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
      recruitId: JSON.parse(options.recruitId)
    })
    let that = this;
    wx.request({
      url: app.globalData.api + '/loadSchoolInfo',
      data: {
        recruitId: that.data.recruitId,
      },
      success: function (res) {
        that.setData({
          result: res.data
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