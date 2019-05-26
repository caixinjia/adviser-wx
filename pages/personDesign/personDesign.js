// pages/personDesign/personDesign.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    recruitId:'',
    recruitName: '',
    subjectType: wx.getStorageSync('userInfo').SUBJECT_TYPE,
    recruitBatch: '101',
    schoolLevel: '',
    province: '',
    city: '',
    beginRanking:1000,
    endRanking:1000,
    filterType:'1',
    result: [],
    myRanking:Number(wx.getStorageSync('userInfo').RANKING),
    filterIsOpen: false,
    region:['不限','不限'],
    recruitText:'最低分专业'
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
    if(this.data.filterType == 1) {
      this.getData()
      this.setData({
        recruitText:'最低分专业'
      })
    }else if (this.data.filterType == 2) {
      this.getData2()
      this.setData({
        recruitText:'专业'
      })
    }
    wx.hideLoading();
    this.hideFilter();
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 1000
    })
  },
  getData(){
    let that = this;
    wx.request({
      url: app.globalData.api + '/loadMinRankingSubjectList',
      data: {
        recruitName: that.data.name,
        subjectType: that.data.subjectType,
        recruitBatch: that.data.recruitBatch,
        schoolLevel: that.data.schoolLevel,
        province: that.data.province,
        city: that.data.city,
        beginRanking: Number(wx.getStorageSync('userInfo').RANKING) - that.data.beginRanking,
        endRanking: Number(wx.getStorageSync('userInfo').RANKING) + that.data.endRanking,
        userId:wx.getStorageSync('userId')
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
  },
  getData1(){
    let that = this;
    wx.request({
      url: app.globalData.api + '/loadSubjectListBySchool',
      data: {
        recruitId: that.data.recruitId,
        subjectType: that.data.subjectType,
        recruitBatch: that.data.recruitBatch,
        userId:wx.getStorageSync('userId')
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
        that.setData({
          recruitText:'专业'
        })
      }
    })
  },
  getData2(){
    let that = this;
    wx.request({
      url: app.globalData.api + '/loadSubjectListBySubjectName',
      data: {
        subjectName: that.data.name,
        subjectType: that.data.subjectType,
        recruitBatch: that.data.recruitBatch,
        schoolLevel: that.data.schoolLevel,
        province: that.data.province,
        city: that.data.city,
        beginRanking: Number(wx.getStorageSync('userInfo').RANKING) - that.data.beginRanking,
        endRanking: Number(wx.getStorageSync('userInfo').RANKING) + that.data.endRanking,
        userId:wx.getStorageSync('userId')
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
  },
  searchSubject(event){
    console.log(event)
    this.setData({
      filterType:'2',
      name:event.currentTarget.dataset.id
    })
    this.search()
  },
  searchSchool(event){
    console.log(event)
    this.setData({
      filterType:'1',
      recruitId:event.currentTarget.dataset.id
    })
    this.getData1()
  },
  // 改变搜索条件
  changeSearch(event) {
    switch (event.currentTarget.dataset.typeid) {
      case "1":
        this.setData({
          name: event.detail.value
        }); break;
      case "2":
        this.setData({
          region: event.detail.value
        }); break;
      case "3":
        this.setData({
          recruitBatch: event.currentTarget.dataset.id
        }); break;
      case "4":
        this.setData({
          schoolLevel: event.currentTarget.dataset.id
        }); break;
      case "5":
        this.setData({
          filterType: event.currentTarget.dataset.id
        }); break;
      case "6":
        this.setData({
          beginRanking: event.detail.value
        }); break;
      case "7":
        this.setData({
          endRanking: event.detail.value
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
