// pages/schoolDetail/schoolDetail.js
const app = getApp()
const wxCharts = require('../../utils/wxcharts-min.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recruitId: '',
    result: '',
    img: [
      app.globalData.imgUrl + "/icon/zhuanye@3x.png",
      app.globalData.imgUrl + "/icon/luquxinxi@3x.png",
      app.globalData.imgUrl + "/icon/zhuanjia@3x.png"
    ],
    img985: app.globalData.imgUrl + '/icon/985@3x.png',
    img211: app.globalData.imgUrl + '/icon/211@3x.png',
    imgdouble: app.globalData.imgUrl + '/icon/shuangyiliu@3x.png',
    isLCanvas:true
  },
  // 跳转到所选学校历届录取信息
  toSchoolHistory() {
    let data = {
      schoolName: this.data.result.RECRUIT_NAME,
      subjectName: ''
    }
    console.log(data)
    wx.navigateTo({
      url: '/pages/MatriculateHistory/MatriculateHistory?data=' + JSON.stringify(data)
    })
  },
  // 跳转到所选学校专业信息
  toSubjectList() {
    let data = {
      schoolName: this.data.result.RECRUIT_NAME
    }
    wx.navigateTo({
      url: '/pages/subjectInfo/subjectInfo?data=' + JSON.stringify(data)
    })
  },
  changeTab(event){
    let tab = event.currentTarget.dataset.tab
    if(tab==1){
      this.setData({
        isLCanvas: true
      })
    }else{
      this.setData({
        isLCanvas: false
      })
    }
    
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
      recruitId: JSON.parse(options.recruitId)
    })
    let that = this;
    new Promise((resolve,reject)=>{
      
      wx.request({
        url: app.globalData.api + '/loadSchoolInfo',
        data: {
          recruitId: that.data.recruitId,
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            result: res.data
          })
          resolve();
        }
      })
      wx.hideLoading()
    }).then(res=>{
      new wxCharts({
        canvasId: 'wenCanvas',
        type: 'line',
        categories: ['2013', '2014', '2015', '2016', '2017'],
        series: [{
          name: '最低排名',
          data: [
            Number(this.data.result.LAST_5_MIN_RANKING_W),
            Number(this.data.result.LAST_4_MIN_RANKING_W),
            Number(this.data.result.LAST_3_MIN_RANKING_W),
            Number(this.data.result.LAST_2_MIN_RANKING_W),
            Number(this.data.result.LAST_1_MIN_RANKING_W)
            ],
          color: '#F7CE2C'
        }],
        width: 280,
        height: 180
      });

      new wxCharts({
        canvasId: 'liCanvas',
        type: 'line',
        categories: ['2013', '2014', '2015', '2016', '2017'],
        series: [{
          name: '最低排名',
          data: [
            Number(this.data.result.LAST_5_MIN_RANKING_L),
            Number(this.data.result.LAST_4_MIN_RANKING_L),
            Number(this.data.result.LAST_3_MIN_RANKING_L),
            Number(this.data.result.LAST_2_MIN_RANKING_L),
            Number(this.data.result.LAST_1_MIN_RANKING_L)
          ],
          color: '#F7CE2C'
        }],
        width: 280,
        height: 180
      });
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
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.shareTitle,
      path: '/pages/index/index'
    }
  },
})