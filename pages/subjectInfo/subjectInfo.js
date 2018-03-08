// pages/subjectInfo/subjectInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchSchoolName: '',
    searchSubjectName: '',
    subjectType: '',
    subjectClass:'',
    recruitBatch: '',
    result: [],
    filterIsOpen: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 获取专业列表
    wx.request({
      url: app.globalData.api + '/loadBmInfo',
      data: {
        bmGroupName: 'SUBJECT_CLASS',
      },
      success: function (res) {
        that.setData({
          subjectList: res.data
        })
      }
    })
  },
  // 搜索
  search() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this;
    wx.request({
      url: app.globalData.api + '/loadSubjectList',
      data: {
        subjectType: that.data.subjectType,
        subjectClass: that.data.subjectClass,
        recruitBatch: that.data.recruitBatch,
        recruitName: that.data.searchSchoolName,
        subjectName: that.data.searchSubjectName,
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
          searchSchoolName: event.detail.value
        }); break;
      case "2":
        this.setData({
          searchSubjectName: event.detail.value
        }); break;
      case "3":
        this.setData({
          subjectType: event.currentTarget.dataset.id
        }); break;
      case "4":
        this.setData({
          recruitBatch: event.currentTarget.dataset.id
        }); break;
      case "5":
        this.setData({
          subjectClass: event.currentTarget.dataset.id
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
      searchSchoolName: '',
      searchSubjectName: '',
      subjectType: '',
      recruitBatch: '',
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