// pages/manual/manualDetail.js
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
    ],
    imgs: [
      [
        app.globalData.imgUrl + '/manual/说明-1@3x.png',
      ],
      [
        app.globalData.imgUrl + '/manual/说明-2@3x.png',
      ],
      [
        app.globalData.imgUrl + '/manual/说明-3.1@3x.png',
        app.globalData.imgUrl + '/manual/说明-3.2@3x.png',
      ],
      [
        app.globalData.imgUrl + '/manual/说明-4@3x.png',
      ],
      [
        app.globalData.imgUrl + '/manual/说明-5678.1@3x.png',
        app.globalData.imgUrl + '/manual/说明-5678.2@3x.png',
        app.globalData.imgUrl + '/manual/说明-5678.3@3x.png',
      ],
      [
        app.globalData.imgUrl + '/manual/说明-5678.1@3x.png',
        app.globalData.imgUrl + '/manual/说明-5678.2@3x.png',
        app.globalData.imgUrl + '/manual/说明-5678.3@3x.png',
      ],
      [
        app.globalData.imgUrl + '/manual/说明-5678.1@3x.png',
        app.globalData.imgUrl + '/manual/说明-5678.2@3x.png',
        app.globalData.imgUrl + '/manual/说明-5678.3@3x.png',
      ],
      [
        app.globalData.imgUrl + '/manual/说明-5678.1@3x.png',
        app.globalData.imgUrl + '/manual/说明-5678.2@3x.png',
        app.globalData.imgUrl + '/manual/说明-5678.3@3x.png',
      ],
      [
        app.globalData.imgUrl + '/manual/说明-9.1@3x.png',
        app.globalData.imgUrl + '/manual/说明-9.2@3x.png',
        app.globalData.imgUrl + '/manual/说明-9.3@3x.png',
      ],
      [
        app.globalData.imgUrl + '/manual/说明-10@3x.png',
      ],
      [
        app.globalData.imgUrl + '/manual/说明-11.1@3x.png',
        app.globalData.imgUrl + '/manual/说明-11.2@3x.png',
        app.globalData.imgUrl + '/manual/说明-11.3@3x.png',
        app.globalData.imgUrl + '/manual/说明-11.4@3x.png',
        app.globalData.imgUrl + '/manual/说明-11.5@3x.png',
      ],
      [
        app.globalData.imgUrl + '/manual/说明-12.1@3x.png',
        app.globalData.imgUrl + '/manual/说明-12.2@3x.png',
        app.globalData.imgUrl + '/manual/说明-12.3@3x.png',
        app.globalData.imgUrl + '/manual/说明-12.4@3x.png',
      ],
      [
        app.globalData.imgUrl + '/manual/说明-13.1@3x.png',
        app.globalData.imgUrl + '/manual/说明-13.2@3x.png',
      ],
      [
        app.globalData.imgUrl + '/manual/说明-14@3x.png',
      ],
    ],
    imgUrls: [],
    title: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    this.setData({
      imgUrls: this.data.imgs[options.id],
      title: this.data.list[options.id],
    })
  },
  previewImage() {
    wx.previewImage({
      urls: this.data.imgUrls,
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