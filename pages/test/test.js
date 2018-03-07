// pages/test/test.js
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {

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
        passwd: util.md5(123456),
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
        passwd: util.md5(123456),
        verifiedCode: '934316'
      },
      success: function (res) {
   
      }
    })
  },
  onLoad(){
    console.log(util.md5('123456'))
  }
})