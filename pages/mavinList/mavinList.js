// pages/mavinList/mavinList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mavinName:'',
    mavinCategory:'',
    result:[],
    filterIsOpen: false,
  },
  // 搜索
  search() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this;
    wx.request({
      url: app.globalData.api + '/loadMavinList',
      data: {
        mavinName: that.data.mavinName,
        mavinCategory: that.data.mavinCategory,
        endRow: 100
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
    this.hideFilter();
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 1000
    })
  },
  // 改变搜索条件
  changeSearch(event) {
    switch (event.currentTarget.dataset.typeid) {
      case "1":
        this.setData({
          mavinName: event.detail.value
        }); break;
      case "2":
        this.setData({
          mavinCategory: event.currentTarget.dataset.id
        }); break;
    }
  },
  showFilter() {
    this.setData({
      filterIsOpen: true
    });
  },
  hideFilter() {
    this.setData({
      filterIsOpen: false
    });
  },
  noBubble() {
    console.log('阻止冒泡')
  },
  resetFilter() {
    this.setData({
      mavinName: '',
      mavinCategory: '',
    })
  },
  // 跳转到咨询问题列表
  toMavinQA: function () {
    wx.navigateTo({
      url: '/pages/mavinQA/mavinQA'
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
    this.search();
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