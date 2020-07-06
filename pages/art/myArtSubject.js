// pages/art/myArtSubject.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
  },
  getData() {
    wx.request({
      url: app.globalData.api + '/loadArtsVolunteerList',
      data: {
        userId: wx.getStorageSync('userId'),
      },
      success: (res) => {
        if (res.data !='\r\n'){
          this.setData({
            result: res.data,
            editFlag: false,
          })
        }else{
          this.setData({
            result: [],
          })
        }
      }
    })
  },
  edit() {
    this.setData({
      editFlag: true
    })
  },
  deleteSubject(e) {
    const index = e.currentTarget.dataset.id;
    let array = [].concat(this.data.result);
    console.log(array);
    array.splice(index, 1)
    this.setData({
      result: array,
    })
  },
  toArtForm() {
    wx.navigateTo({
      url: '/pages/art/artForm',
    })
  },
  save(){
    let volunteerList = [];
    for (let item of this.data.result){
      let temp = {
        ID: item.SUBJECT_ID,
        RATE: item.RATE
      }
      volunteerList.push(temp)
    }
    wx.request({
      url: app.globalData.api + '/saveArtsVolunteerList',
      data: {
        userId: wx.getStorageSync('userId'),
        volunteerList: volunteerList
      },
      success: (res) => {
        if (res.data.RESULTS == 'SUCCESS') {
          wx.showToast({
            title: '修改志愿成功',
            icon: 'success'
          })
          this.getData();
        } else {
          wx.showToast({
            title: res.data.MSG,
            icon: 'none'
          })
        }
      }
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
    this.getData();
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