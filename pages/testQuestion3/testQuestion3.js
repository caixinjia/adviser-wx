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
    testResult:{},
    canSee: 1,
    isLoading: false,
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
        testGroupId: '1002',
        testResult:that.data.answers.join(',')
      },
      success: function (res) {
        that.setData({
          testResult:res.data,
          isComplete:true
        })
        let array = res.data.TEST_SCORE.split(';');
        console.log(array)
        new wxCharts({
          canvasId: 'radarCanvas',
          type: 'radar',
          categories: [array[0].split('：')[1], array[1].split('：')[1], array[2].split('：')[1], array[3].split('：')[1], array[4].split('：')[1], array[5].split('：')[1], array[6].split('：')[1], array[7].split('：')[1]],
          series: [{
            data: [array[0].split('：')[2], array[1].split('：')[2], array[2].split('：')[2], array[3].split('：')[2], array[4].split('：')[2], array[5].split('：')[2], array[6].split('：')[2], array[7].split('：')[2]],
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
  isExplicitResult() {
    wx.request({
      url: app.globalData.api + '/isExplicitResult',
      data: {
        userId: wx.getStorageSync('userId'),
      },
      success: (res) => {
        this.setData({
          canSee: res.data.IS_EXPLICIT_RESULT,
        })
      },
    })
  },
  applyvip() {
    wx.navigateTo({
      url: '/pages/applyVIP/applyVIP',
    })
  },
  // 购买测试资格
  buy() {
    if (this.data.isLoading == true) return;
    this.setData({
      isLoading: true
    })
    wx.request({
      url: app.globalData.api + '/buyExplicitResult',
      data: {
        openId: app.globalData.openId,
        userId: wx.getStorageSync('userId')
      },
      success: (res) => {
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': 'MD5',
          'paySign': res.data.paySign,
          'success': (res1) => {
            wx.showToast({
              title: '支付成功',
              icon: 'success'
            })
            this.setData({
              isLoading: false
            })
            setTimeout(() => {
              this.submit()
              this.isExplicitResult();
            }, 500)
          },
          'fail': (res2) => {
            wx.showToast({
              title: 'iphone不支持小程序微信支付，请用安卓手机支付',
              icon: 'none',
              duration: 3000
            })
            this.setData({
              isLoading: false
            })
          }
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: wx.getStorageSync('wxUserInfo'),
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
        testGroupId: '1002'
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
    // this.isExplicitResult();
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