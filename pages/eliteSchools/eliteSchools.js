// pages/eliteSchools/eliteSchools.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score:666,
    ranking:12300,
    schoolList:[],
    img985:app.globalData.imgUrl+'/icon/985@3x.png',
    img211: app.globalData.imgUrl + '/icon/211@3x.png',
    imgdouble: app.globalData.imgUrl + '/icon/shuangyiliu@3x.png',
  },
  search: function () {
    wx.showLoading({
      title:'生成中',
      mask:true
    })
    const that = this;
    wx.request({
      method:'POST',
      url: app.globalData.api + '/loadMySchool',
      data: {
        subjectType: 2,
        ranking: that.data.ranking,
        recruitBatch:''
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=gbk',
      },
      success: function (res) {
        console.log(res)
        that.setData({ schoolList: res.data})
        wx.hideLoading()
      }
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