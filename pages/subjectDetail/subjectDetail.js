// pages/subjectDetail/subjectDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjectId: '',
    result: '',
    img:[
      app.globalData.imgUrl + "/icon/yuanxiao@3x.png",
      app.globalData.imgUrl + "/icon/luquxinxi@3x.png",
      app.globalData.imgUrl + "/icon/zhuanjia@3x.png"
    ]
  },
  // 跳转到所选学校历届录取信息
  toSchoolHistory() {
    let data = {
      schoolName: this.data.result.RECRUIT_NAME,
      subjectName: this.data.result.SUBJECT_NAME
    }
    wx.navigateTo({
      url: '/pages/MatriculateHistory/MatriculateHistory?data=' + JSON.stringify(data)
    })
  },
  // 跳转到所选学校历届录取信息
  toSchoolDetail() {
    wx.navigateTo({
      url: '/pages/schoolDetail/schoolDetail?recruitId=' + this.data.result.RECRUIT_ID
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.setData({
      subjectId: JSON.parse(options.subjectId)
    })
    let that = this;
    wx.request({
      url: app.globalData.api + '/loadSubjectInfo',
      data: {
        subjectId: that.data.subjectId,
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