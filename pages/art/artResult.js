// pages/art/artResult.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedProvince: wx.getStorageSync('selectedProvince'),
    selectedSubject: wx.getStorageSync('selectedSubject'),
    list: [],
    imgNo: app.globalData.imgUrl + '/icon/zhiyuan-no@3x.png',
    imgYes: app.globalData.imgUrl + '/icon/zhiyuan-yes@3x.png',
  },
  // 获取用户艺考信息
  getData() {
    wx.request({
      url: app.globalData.api + '/loadArtsAnalysisResults',
      data: {
        userId: wx.getStorageSync('userId'),
        subjectClass: wx.getStorageSync('selectedSubject').join(','),
        province: wx.getStorageSync('selectedProvince').join(','),
        city: '',
        beginRow: 1,
        endRow: 99,
      },
      success: (res) => {
        if (res.data != '\r\n') {
          this.setData({
            list: res.data,
          })
        } else {
          wx.showToast({
            title: '暂无数据',
            icon: 'none',
            duration: 2000
          })
          this.setData({ list: [], })
        }
      }
    })
  },
  addSubject: function (event) {
    let index = event.currentTarget.dataset.index;
    let temp = this.data.list
    if (temp[index].IS_VOLUNTEER==0){
      temp[index].IS_VOLUNTEER = 1
    }else{
      temp[index].IS_VOLUNTEER = 0
    }
    this.setData({
      list:temp
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
    this.getData();
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