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
    codeIsOpen:false
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
  toAdvisory:function(event){
    wx.navigateTo({
      url: '/pages/mavinAdvisory/mavinAdvisory?mavinId=' + event.currentTarget.dataset.id
    })
  },
  submitAdvisory: function(event) {
    let that = this;
    let mavinId = event.currentTarget.dataset.id
    wx.request({
      url: app.globalData.api + '/setBespeakState',
      data: {
        mavinId: mavinId,
        bespeakUser: wx.getStorageSync('userId'),
        openId: app.globalData.openId,
        openIdType: 1,
      },
      success: function (res) {
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': 'MD5',
          'paySign': res.data.paySign,
          'success': function (res) {
            wx.showToast({
              title: '支付成功',
              icon: 'success'
            })
          },
          'fail': function (res) {
            wx.showToast({
              title: '支付失败',
              icon: 'none'
            })
          }
        })

      }
    })
  },
  showCodeImg(){
    this.setData({
      codeIsOpen: true
    });
  },
  hideCodeImg() {
    this.setData({
      codeIsOpen: false
    });
  },
  /**
  *  图片预览方法
  *  此处注意的一点就是，调用 "wx.previewImage"时，第二个参数要求为数组形式哦
  *  当然，做过图片上传功能的应该会注意到，如果涉及到多张图片预览，图片链接数组集合即为参数 urls！
  */
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: [current]
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
    app.isLogin();
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
  onShareAppMessage: function (res) {
    return {
      title: app.globalData.shareTitle,
      path: '/pages/index/index'
    }
  },
})