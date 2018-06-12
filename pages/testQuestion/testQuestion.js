// pages/testQuestion/testQuestion.js
const app = getApp()
const wxCharts = require('../../utils/wxcharts-min.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    num: 0,
    answers: [],
    isComplete:false,
    userInfo:'',
    testResult:{}
  },
  answer(e) {
    let id = e.currentTarget.dataset.id;
    console.log(id)
    if (this.data.num == this.data.result.length - 1) {
      this.submit();
    }else{
      this.setData({
        num: this.data.num + 1,
        answer: this.data.answers.push(id)
      })
    }


  },
  submit() {
    let that = this;
    wx.request({
      url: app.globalData.api + '/reckonTestResult',
      data: {
        userId:wx.getStorageSync('userId'),
        testGroupId: '1001',
        testResult:that.data.answers.join(',')
      },
      success: function (res) {
        that.setData({
          testResult:res.data,
          isComplete:true
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
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
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
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this;
    wx.request({
      url: app.globalData.api + '/loadTestQuestions',
      data: {
        testGroupId: '1001'
      },
      success: function (res) {
        if (res.data != '\r\n') {
          that.setData({ result: res.data })

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