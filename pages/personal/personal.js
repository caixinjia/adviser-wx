// pages/personal/personal.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vipImg: app.globalData.imgUrl + "/icon/vip@3x.png",
    remindImg: app.globalData.imgUrl + "/icon/xitongxiaoxi@3x.png",
    userName: '游客',
    expiringDate: '2018年09月01日',
    userInfo: '',
    addressImg: app.globalData.imgUrl + "/icon/address@3x.png",
    schoolImg: app.globalData.imgUrl + "/icon/school@3x.png",
    wenliImg: app.globalData.imgUrl + "/icon/wenli@3x.png",
    rightImg: app.globalData.imgUrl + "/icon/right@3x.png",
    scoreEdit: true,
    entrances: [
      {
        img: app.globalData.imgUrl + "/icon/wodeyuyue@3x.png",
        name: '我的预约'
      },
      {
        img: app.globalData.imgUrl + "/icon/wodetiwen@3x.png",
        name: '我的提问'
      },
      {
        img: app.globalData.imgUrl + "/icon/wodezhiyuan@3x.png",
        name: '我的志愿'
      },
      {
        img: app.globalData.imgUrl + "/icon/wodeceshi@3x.png",
        name: '我的测试'
      }
    ]
  },
  // 改变input的值
  changeInput: function (event) {
    switch (event.currentTarget.dataset.id) {
      case "1":
        this.setData({
          scoreInput: event.detail.value
        }); break;
    }
  },
  cancelScore:function(){
      this.setData({
        scoreEdit:false
      })
  },
  openScore: function () {
    this.setData({
      scoreEdit: true
    })
  },
  // 确认修改分数
  changeScore: function () {
    let that = this;
    if (that.data.scoreInput == '') {
      return false;
    } else {
      wx.request({
        url: app.globalData.api + '/modifyScore',
        data: {
          userId: that.data.user.id,
          score: that.data.scoreInput,
        },
        success: function (res) {
          wx.showToast({
            title: '修改成功',
            icon: 'success'
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      userName: app.globalData.userInfo.nickName,
      user: wx.getStorageSync('user')
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