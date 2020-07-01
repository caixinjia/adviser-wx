// pages/manual/manual.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      '用户如何注册、登录以及重置密码？',
      '新用户如何填写个人信息？',
      '用户如何成为VIP？',
      '首页功能介绍',
      '如何查询我能否报考某所学校？',
      '如何查询某个学校五年的录取最低线？',
      '如何查询某个学校去年的录取情况？',
      '如何查询某个学校生活和学习信息？',
      '如何查询某个学校某个专业情况？',
      '如何查询某个学校历届录取信息？',
      '如何实现一键推荐“冲稳保”学校？',
      '如何查找一定名次范围内某个专业的录取情况？',
      '怎么知道我适合学习什么专业？',
      '如何预约专家进行一对一咨询？',
    ]
  },
  toDetail(e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: `/pages/manual/manualDetail?id=${e.currentTarget.dataset.id}`,
    });
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