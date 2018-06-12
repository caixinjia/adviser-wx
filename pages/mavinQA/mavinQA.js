// pages/mavinQA/mavinQA.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    vipQuestion: '',
    isVip: false,
    isAddQuestionFlag: false,
    isFocus: false,
    myQuestion: ''
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
      },
      success: function (res) {
        if (res.data != '\r\n') {
          if (that.data.isVip) {
            that.setData({ result: res.data })
          } else {
            that.setData({ result: res.data.slice(0, 2) })
          }
          that.getVipQuestion();

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
    wx.hideLoading();

  },
  getVipQuestion() {
    let id = wx.getStorageSync('userId');
    for (let item of this.data.result) {
      if (item.QA_USER == id) {
        this.setData({
          vipQuestion: item
        })
        return;
      }
    }
  },
  changeQuestion(e) {
    if (e.detail.value!=''){
      this.setData({isFocus: true})
    }else{
      this.setData({isFocus: false})
    }
    this.setData({
      myQuestion: e.detail.value
    })
  },
  submitQuestion() {
    let that = this;
    if (that.data.myQuestion != '') {
      wx.request({
        url: app.globalData.api + '/saveMavinQA',
        data: {
          qaUser: wx.getStorageSync('userId'),
          qaTitle: '忽略标题',
          qaQuestion: that.data.myQuestion
        },
        success: function (res) {
          if (res.data.RESULTS == "SUCCESS") {
            wx.showToast({
              title: '提问成功',
              icon: 'success'
            })
            that.setData({
              isAddQuestionFlag: false
            })
            that.search()
          } else {
            wx.showToast({
              title: res.data.MSG,
              icon: 'none'
            })
          }
        }
      })
    }

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
    app.isLogin();
    this.search();
    this.setData({
      isVip: app.isVip()
    })
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