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
    scoreEdit: false,
    rankEdit: false,
    subjectArray: ['文史类', '理工类'],
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
  // 重新渲染用户数据
  freshData() {
    app.getUser(wx.getStorageSync('userId'))
    this.setData({
      user: wx.getStorageSync('userInfo')
    })
  },
  // 改变input的值
  changeInput: function (event) {
    switch (event.currentTarget.dataset.id) {
      case "1":
        this.setData({
          scoreInput: event.detail.value
        }); break;
      case "2":
        this.setData({
          rankInput: event.detail.value
        }); break;
      case "3":
        this.changeCity(event.detail.value);
        break;
      case "4":
        this.changeSchool(event.detail.value);
        break;
      case "5":
        this.changeType(event.detail.value);
        break;
    }
  },
  cancelScore: function () {
    this.setData({
      scoreEdit: false
    })
  },
  openScore: function () {
    this.setData({
      scoreEdit: true
    })
  },
  cancelRank: function () {
    this.setData({
      rankEdit: false
    })
  },
  openRank: function () {
    this.setData({
      rankEdit: true
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
          if (res.data.RESULTS == "SUCCESS") {
            wx.showToast({
              title: '填写成绩成功',
              icon: 'success'
            })
            that.freshData();
          } else {
            wx.showToast({
              title: res.data.MSG,
              icon: 'none'
            })
          }
        }
      })
    }
  },
  // 确认修改排名
  changeRank: function () {
    let that = this;
    if (that.data.rankInput == '') {
      return false;
    } else {
      wx.request({
        url: app.globalData.api + '/modifyScore',
        data: {
          userId: that.data.user.id,
          ranking: that.data.rankInput,
        },
        success: function (res) {
          if (res.data.RESULTS == "SUCCESS") {
            wx.showToast({
              title: '填写排名成功',
              icon: 'success'
            })
            that.freshData();
          } else {
            wx.showToast({
              title: res.data.MSG,
              icon: 'none'
            })
          }
        }
      })
    }
  },
  // 修改城市
  changeCity: function (region) {
    console.log(region)
    let that = this;
    let areaList = app.globalData.areaList;
    let city = '';
    for (let i in areaList) {
      if (areaList[i].NAME == region[1] && areaList[i].LEVEL == '2') {
        city = areaList[i].CODE;
        break;
      }
    }
    wx.request({
      url: app.globalData.api + '/modifyScore',
      data: {
        userId: wx.getStorageSync('userId'),
        city: city,
      },
      success: function (res) {
        if (res.data.RESULTS == "SUCCESS") {
          wx.showToast({
            title: '填写城市成功',
            icon: 'success'
          })
          that.freshData();
        } else {
          wx.showToast({
            title: res.data.MSG,
            icon: 'none'
          })
        }
      }
    })
  },
  // 修改学校
  changeSchool: function (school) {
    let that = this;
    wx.request({
      url: app.globalData.api + '/modifyScore',
      data: {
        userId: wx.getStorageSync('userId'),
        school: school,
      },
      success: function (res) {
        if (res.data.RESULTS == "SUCCESS") {
          wx.showToast({
            title: '填写中学名成功',
            icon: 'success'
          })
          that.freshData();
        } else {
          wx.showToast({
            title: res.data.MSG,
            icon: 'none'
          })
        }
      }
    })
  },
  // 修改学科
  changeType: function (typeId) {
    let that = this;
    wx.request({
      url: app.globalData.api + '/modifyScore',
      data: {
        userId: wx.getStorageSync('userId'),
        subject: 2,
      },
      success: function (res) {
        if (res.data.RESULTS == "SUCCESS") {
          wx.showToast({
            title: '填写学科成功',
            icon: 'success'
          })
          that.freshData();
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

    // 获取地址列表
    wx.request({
      url: app.globalData.api + '/loadAreaList',
      data: {
      },
      success: function (res) {
        console.log(res)
        app.globalData.areaList = res.data;
      }
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
    app.isLogin();
    this.setData({
      userInfo: app.globalData.userInfo,
      userName: app.globalData.userInfo.nickName,
      user: wx.getStorageSync('userInfo')
    })
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