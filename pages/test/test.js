// pages/test/test.js
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    wxconfig:''
  },
  sendMobileVerifide() {
    wx.request({
      url: app.globalData.api + '/sendMobileVerifide',
      data: {
        mobileNum: '15280094430',
        verifideType: 'ResetPwd'
      },
      success: function (res) {
        console.log(res)
      }
    })
  },
  zhuce() {
    wx.request({
      url: app.globalData.api + '/register',
      data: {
        mobileNum: '15280094430',
        passwd: '123456',
        verifiedCode: '487028',
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
        }
      }
    })
  },
  login() {
    wx.request({
      url: app.globalData.api + '/login',
      data: {
        mobileNum: '15280094430',
        passwd: util.md5('123456'),
        verifiedType:'0'
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
        }
      }
    })
  },
  resetPwd(){
    wx.request({
      url: app.globalData.api + '/resetPwd',
      data: {
        mobileNum: '15280094430',
        passwd: util.md5('123456'),
        verifiedCode: '370868'
      },
      success: function (res) {
   
      }
    })
  },
  pay(){
    let that = this;
    new Promise((resolve,reject)=>{
      wx.request({
        url: app.globalData.api + '/wxPayUnifiedOrder',
        data: {
          openId: app.globalData.openId,
          tradeName: '测试',
          payMoney: 1
        },
        success: function (res) {
          // wx.requestPayment({
          //   'timeStamp': res.data.timeStamp,
          //   'nonceStr': res.data.nonceStr,
          //   'package': res.data.package,
          //   'signType': 'MD5',
          //   'paySign': res.data.paySign,
          //   'success': function (res) {
          //     wx.showToast({
          //       title: '支付成功',
          //       icon: 'success'
          //     })
          //   },
          //   'fail': function (res) {
          //     wx.showToast({
          //       title: '支付失败',
          //       icon: 'none'
          //     })
          //   }
          // })
        }
      })
    })
  },
  onLoad(){
    wx.request({
      url: app.globalData.api + '/loadTestQuestions',
      data: {
        testGroupId:'1001'
      },
      success: function (res) {
      }
    })
  }
})