// pages/mavinAdvisory/mavinAdvisory.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedTime: '',
    selectedDay: '',
    selectedTitle: ''
  },
  formatDate(time) {
    if (time != '') {
      let m = time.substr(4, 2);
      let d = time.substr(6, 2);
      return m + '/' + d;
    } else {
      return ''
    }

  },
  formatTitle(time) {
    if (time != '') {
      let m = time.substr(4, 2);
      let d = time.substr(6, 2);
      return m + '月' + d + '日';
    } else {
      return ''
    }

  },
  select(event) {
    if (event.currentTarget.dataset.item.BESPEAK_ID == '') {
      this.setData({
        selectedTime: event.currentTarget.dataset.item.SCHEDULING_ID,
        selectedDay: event.currentTarget.dataset.item.BESPEAK_DATE,
        selectedTitle: '已选择' + this.formatTitle(event.currentTarget.dataset.item.BESPEAK_DATE) + ' ' + event.currentTarget.dataset.item.SCHEDULING_TITLE
      })
    } else {
      return
    }
  },
  submitAdvisory(){
    if (this.data.selectedDay!=''){
      let that = this;
      wx.request({
        url: app.globalData.api + '/setBespeakState',
        data: {
          mavinId: that.data.mavinId,
          bespeakDate: that.data.selectedDay,
          schedulingId: that.data.selectedTime,
          bespeakUser: wx.getStorageSync('userId'),
          openId: app.globalData.openId,
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
          //     setTimeout(res => {
          //       that.getData()
          //     }, 1000)
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
    }else{
      return
    }

  },
  getData(){
    let that = this;
    wx.request({
      url: app.globalData.api + '/loadMavinInfo',
      data: {
        mavinId: that.data.mavinId,
      },
      success: function (res) {
        that.setData({
          mavinDetail: res.data
        })
      }
    })
    new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.api + '/loadMavinBespeakList',
        data: {
          mavinId: that.data.mavinId,
        },
        success: function (res) {
          that.setData({
            advisoryDetail: res.data,
            advisoryDetail1: res.data.slice(0, 7),
            advisoryDetail2: res.data.slice(7, 14),
            advisoryDetail3: res.data.slice(14, 21),
            advisoryDetail4: res.data.slice(21, 28),
            advisoryDetail5: res.data.slice(28, 35),
            advisoryDetail6: res.data.slice(35, 42),
            advisoryDetail7: res.data.slice(42, 49),
            day1: that.formatDate(res.data[0].BESPEAK_DATE),
            day2: that.formatDate(res.data[7].BESPEAK_DATE),
            day3: that.formatDate(res.data[14].BESPEAK_DATE),
            day4: that.formatDate(res.data[21].BESPEAK_DATE),
            day5: that.formatDate(res.data[28].BESPEAK_DATE),
            day6: that.formatDate(res.data[35].BESPEAK_DATE),
            day7: that.formatDate(res.data[42].BESPEAK_DATE),
            selectedTime:'',
            selectedDay:'',
            selectedTitle:''
          })
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mavinId: JSON.parse(options.mavinId)
    })
    this.getData()
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
    app.isLogin();
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