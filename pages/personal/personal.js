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
    expiringDate: '2019年06月01日',
    userInfo: '',
    addressImg: app.globalData.imgUrl + "/icon/address@3x.png",
    schoolImg: app.globalData.imgUrl + "/icon/school@3x.png",
    wenliImg: app.globalData.imgUrl + "/icon/wenli@3x.png",
    rightImg: app.globalData.imgUrl + "/icon/right@3x.png",
    scoreEdit: false,
    rankEdit: false,
    userId: wx.getStorageSync('userId'),
    subjectArray: ['文史类', '理工类'],
    entrances: [
      {
        img: app.globalData.imgUrl + "/icon/wodeyuyue@3x.png",
        name: '我的预约',
        url: '/pages/myAdvisory/myAdvisory'
      },
      {
        img: app.globalData.imgUrl + "/icon/wodetiwen@3x.png",
        name: '我的提问',
        url:'/pages/myQuestion/myQuestion'
      },
      {
        img: app.globalData.imgUrl + "/icon/wodezhiyuan@3x.png",
        name: '我的志愿',
        url: '/pages/mySubject/mySubject'
      },
      {
        img: app.globalData.imgUrl + "/icon/wodeceshi@3x.png",
        name: '我的测试',
        url: '/pages/myTest/myTest'
      }
    ],
    isVip:false,
    istemporaryVip:false,
    region:["福建省", "福州市", "鼓楼区"],
    otherSchool:false,
    area:'',
    areaName:''

  },
  // 重新渲染用户数据
  freshData() {
    app.getUser(wx.getStorageSync('userId')).then((res) => {
      this.setData({
        user: wx.getStorageSync('userInfo')
      })
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
      case "6":
        this.changeOtherSchool(event.detail.value);
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
  applyvip(){
    wx.navigateTo({
      url: '/pages/applyVIP/applyVIP',
    })
  },
  // 确认修改分数
  changeScore: function () {
    let that = this;
    if (that.data.scoreInput == '') {
      return false;
    } else {
      wx.showModal({
        title: '提示',
        content: '是否确认修改分数',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: app.globalData.api + '/modifyScore',
              data: {
                userId: that.data.userId,
                score: that.data.scoreInput,
              },
              success: function (res) {
                if (res.data.RESULTS == "SUCCESS") {
                  wx.showToast({
                    title: '填写成绩成功',
                    icon: 'success'
                  })
                  that.freshData();
                  that.setData({
                    scoreEdit: false
                  })
                } else {
                  wx.showToast({
                    title: res.data.MSG,
                    icon: 'none'
                  })
                }
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
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
      wx.showModal({
        title: '提示',
        content: '是否确认修改排名',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: app.globalData.api + '/modifyScore',
              data: {
                userId: that.data.userId,
                ranking: that.data.rankInput,
              },
              success: function (res) {
                if (res.data.RESULTS == "SUCCESS") {
                  wx.showToast({
                    title: '填写排名成功',
                    icon: 'success'
                  })
                  that.freshData();
                  that.setData({
                    rankEdit: false
                  })
                } else {
                  wx.showToast({
                    title: res.data.MSG,
                    icon: 'none'
                  })
                }
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
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
    let area = '';
    for (let i in areaList) {
      if (areaList[i].NAME == region[2] && areaList[i].LEVEL == '3') {
        if (areaList[i].NAME == '鼓楼区' && areaList[i].PROVINCE!='35'){
          continue;
        }
        area = areaList[i].CODE;
        break;
      }
    }
    this.setData({
      area: area,
      areaName: region
    })
    this.getSchoolList(area)
    // wx.request({
    //   url: app.globalData.api + '/modifyScore',
    //   data: {
    //     userId: that.data.userId,
    //     area: area,
    //   },
    //   success: function (res) {
    //     if (res.data.RESULTS == "SUCCESS") {
    //       wx.showToast({
    //         title: '填写地区成功',
    //         icon: 'success'
    //       })
    //       that.getSchoolList(area)
    //       that.freshData();
    //     } else {
    //       wx.showToast({
    //         title: res.data.MSG,
    //         icon: 'none'
    //       })
    //     }
    //   }
    // })
  },
  // 选择学校
  changeSchool: function (index) {
    
    let that = this;
    wx.request({
      url: app.globalData.api + '/modifyScore',
      data: {
        userId: that.data.userId,
        area: that.data.area,
      },
      success: function (res) {
        if (res.data.RESULTS == "SUCCESS") {
          wx.showToast({
            title: '填写地区成功',
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
    if (that.data.schoolList[index].SCHOOL_ID == 0 && that.data.otherSchool==false){
      that.setData({
        otherSchool:true
      })
      return
    }
    wx.request({
      url: app.globalData.api + '/modifyScore',
      data: {
        userId: that.data.userId,
        SchoolId: that.data.schoolList[index].SCHOOL_ID,
        school: that.data.schoolList[index].SCHOOL_NAME,
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
  // 自填学校
  changeOtherSchool: function (value) {
    let that = this;
    wx.request({
      url: app.globalData.api + '/modifyScore',
      data: {
        userId: that.data.userId,
        SchoolId: 0,
        school: value,
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
    typeId = parseInt(typeId)+1
    wx.request({
      url: app.globalData.api + '/modifyScore',
      data: {
        userId: that.data.userId,
        subject: typeId,
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
  // 注销
  loginOut: function () {
    new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.api + '/logout',
        success: function (res) {
          wx.clearStorageSync();
          wx.showToast({
            title: '注销成功',
            icon: 'none'
          })
          wx.switchTab({
            url: '/pages/index/index'
          })
          resolve();
        }
      })
    })
  },
  getSchoolList(area){
    let that = this;
    wx.request({
      url: app.globalData.api + '/loadHighSchoolList',
      data: {
        areaId:area
      },
      success: function (res) {
        res.data.push({
          SCHOOL_ID:0,
          SCHOOL_NAME:'其他'
        })
        that.setData({
          schoolList:res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.freshData();
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
      userInfo: wx.getStorageSync('wxUserInfo'),
      userName: wx.getStorageSync('wxUserInfo').nickName,
      user: wx.getStorageSync('userInfo'),
      userId: wx.getStorageSync('userId'),
      isVip: app.isVip(),
      istemporaryVip: app.istemporaryVip()
    })
    if (this.data.user.GRADUATE_AREA!=''){
      this.getSchoolList(this.data.user.GRADUATE_AREA)
    }
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