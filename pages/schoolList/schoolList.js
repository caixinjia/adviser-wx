// pages/schoolList/schoolList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolName: '',
    schoolLevel: '',
    schoolGrade: '',
    schoolNature: '',
    province: '',
    city: '',
    result: [],
    filterIsOpen: false,
    region:['不限','不限'],
    img985: app.globalData.imgUrl + '/icon/985@3x.png',
    img211: app.globalData.imgUrl + '/icon/211@3x.png',
    imgdouble: app.globalData.imgUrl + '/icon/shuangyiliu@3x.png',
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
  // 搜索
  search() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this;
    // 获取所选城市
    let areaList = app.globalData.areaList;
    console.log(areaList)
    let province = '';
    let city = '';
    if (that.data.region[0] != '不限') {
      for (let i in areaList) {
        if (areaList[i].NAME == that.data.region[0] && areaList[i].LEVEL == '1') {
          that.setData({
            province: areaList[i].CODE
          })
          break;
        }
      }
    } else {
      that.setData({
        province: ''
      })
    }
    if (that.data.region[1] != '不限') {
      for (let i in areaList) {
        if (areaList[i].NAME == that.data.region[1] && areaList[i].LEVEL == '2') {
          that.setData({
            city: areaList[i].CODE
          })
          break;
        }
      }
    } else {
      that.setData({
        city: ''
      })
    }
    wx.request({
      url: app.globalData.api + '/loadSchoolList',
      data: {
        schoolName: that.data.schoolName,
        schoolLevel: that.data.schoolLevel,
        schoolGrade: that.data.schoolGrade,
        schoolNature: that.data.schoolNature,
        province: that.data.province,
        city: that.data.city,
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
          schoolName: event.detail.value
        }); break;
      case "2":
        this.setData({
          region: event.detail.value
        }); break;
      case "3":
        this.setData({
          schoolGrade: event.currentTarget.dataset.id
        }); break;
      case "4":
        this.setData({
          schoolLevel: event.currentTarget.dataset.id
        }); break;
      case "5":
        this.setData({
          schoolNature: event.currentTarget.dataset.id
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
      schoolName: '',
      schoolLevel: '',
      schoolGrade: '',
      schoolNature: '',
      province: '',
      city: '',
      region: ['不限', '不限'],
    })
  },
  // 跳转到所选专业详情
  toSchoolDetail: function (event) {
    wx.navigateTo({
      url: '/pages/schoolDetail/schoolDetail?recruitId=' + event.currentTarget.dataset.id
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
    this.search()
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