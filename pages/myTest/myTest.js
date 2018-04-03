// pages/myTest/myTest.js
const app = getApp()
const wxCharts = require('../../utils/wxcharts-min.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHas:false
  },
  submit() {
    let that = this;
    wx.request({
      url: app.globalData.api + '/mentalityTestsResults',
      data: {
        userId: wx.getStorageSync('userId'),
      },
      success: function (res) {
        if (res.data !='\r\n') {
          that.setData({
            testResult: res.data,
            isComplete: true,
            isHas: true
          })
          let array = res.data.TEST_SCORE.split('；');
          console.log(array)
          new wxCharts({
            canvasId: 'radarCanvas',
            type: 'radar',
            categories: [array[0].split('（')[0], array[1].split('（')[0], array[2].split('（')[0], array[3].split('（')[0], array[4].split('（')[0], array[5].split('（')[0]],
            series: [{
              data: [array[0].split('：')[2], array[1].split('：')[2], array[2].split('：')[2], array[3].split('：')[2], array[4].split('：')[2], array[5].split('：')[2]],
              color: 'rgba(255,240,130,0.70)'
            }],
            width: 320,
            height: 200,
            extra: {
              radar: {
                labelColor: '#252628',
                max: 10
              }
            }
          });
        }else{
          that.setData({
            isHas:false
          })
        }

      }
    })
  },
  toTest(){
    wx.navigateTo({
      url: '/pages/testQuestion/testQuestion',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
    })
    this.submit()
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