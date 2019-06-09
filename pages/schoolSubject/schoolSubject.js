// pages/schoolSubject/schoolSubject.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryData: '',
    result: '',
    imgNo: app.globalData.imgUrl + '/icon/zhiyuan-no@3x.png',
    imgYes: app.globalData.imgUrl + '/icon/zhiyuan-yes@3x.png',
    mineImg: app.globalData.imgUrl + '/icon/Group 5@3x.png',
    recommend_type:0,
    lastYear: 2018
  },
  addSubject: function (event) {
    let index = event.currentTarget.dataset.index;
    let temp = this.data.result
    if (temp[index].IS_IN_VOLUNTEER==0){
      temp[index].IS_IN_VOLUNTEER = 1
    }else{
      temp[index].IS_IN_VOLUNTEER = 0
    }
    this.setData({
      result:temp
    })

  },
  getLastYearTitle(){
    let that = this
    wx.request({
      url: app.globalData.api + '/getLastYearTitle',
      data: {},
      success: function(res) {
        console.log(res);
        that.setData({
          lastYear: Number(res.data.LAST_YEAR_TITLE)
        })
      }
    })
  },
  saveSubject(){
    let volunteerList = [];
    for (let item of this.data.result){
      if (item.IS_IN_VOLUNTEER == 1){
        let temp = {
          ID: item.SUBJECT_ID,
          RATE: item.ACCEPTANCE_RATE
        }
        volunteerList.push(temp)
      }
    }
    let that = this;
    wx.request({
      url: app.globalData.api + '/addToVolunteerList',
      data: {
        userId: wx.getStorageSync('userId'),
        recommendType: that.data.recommend_type,
        subjectList: volunteerList
      },
      success: function (res) {
        if (res.data.RESULTS == 'SUCCESS') {
          wx.showToast({
            title: '添加志愿成功',
            icon: 'success'
          })
        } else {
          wx.showToast({
            title: res.data.MSG,
            icon: 'none'
          })
        }
      }
    })
  },
  toMineSubject(){
    wx.navigateTo({
      url: '/pages/mySubject/mySubject',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.setData({
      queryData: JSON.parse(options.data)
    })
    this.getLastYearTitle()
    let that = this;
    wx.request({
      url: app.globalData.api + '/subjectDesign',
      data: {
        userId: wx.getStorageSync('userId'),
        recruitId: that.data.queryData.recruitId,
        // subjectType: that.data.queryData.subjectType,
        // ranking: that.data.queryData.ranking,
        recruitBatch: that.data.queryData.recruitBatch,
        priority: that.data.queryData.priority,
        intentionSubject: that.data.queryData.intentionSubject.join(','),
      },
      success: function (res) {
        that.setData({
          result: res.data,
          recommend_type: that.data.queryData.recommend_type
        })
      }
    })
    wx.hideLoading()
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
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.shareTitle,
      path: '/pages/index/index'
    }
  },
})
