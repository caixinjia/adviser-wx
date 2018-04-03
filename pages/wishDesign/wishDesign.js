// pages/wishDesign/wishDesign.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: '',
    ranking: '',
    subjectType: '',//1文史类，2理工类
    subjectName: '',
    batch: '101', //101:提前批102:本一批103:本二批104：高职(专科)批
    priority: 0,//0-学校优先；1-专业优先
    schoolList: [],
    img985: app.globalData.imgUrl + '/icon/985@3x.png',
    img211: app.globalData.imgUrl + '/icon/211@3x.png',
    imgdouble: app.globalData.imgUrl + '/icon/shuangyiliu@3x.png',
    editFlag: false,
    imgchongji: app.globalData.imgUrl + '/icon/icon-chongji@3x.png',
    imgbaodi: app.globalData.imgUrl + '/icon/icon-baodi@3x.png',
    imgqiuwen: app.globalData.imgUrl + '/icon/icon-qiuwen@3x.png',
    subjectList: [],//专业列表
    dialogIsOpen: false,
    selectedSubject: [],
    selectedSubjectArray:[],
    region: [],
    customItem: '全部',
    province: '',
    city: '',
    wishType:1//本科专科
    
  },
  search: function () {
    wx.showLoading({
      title: '生成中',
      mask: true
    })
    let that = this;
    // 获取所选专业
    let list = that.data.subjectList;
    let selectedList = [];
    for (let i in list) {
      if (list[i].selected) {
        selectedList.push(list[i].id);
      }
    }
    // 获取所选城市
    let areaList = app.globalData.areaList;
    console.log(areaList)
    let province = '';
    let city = '';
    if (that.data.region[0] != '全部') {
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
    if (that.data.region[1] != '全部') {
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
      url: app.globalData.api + '/volunteerDesign',
      data: {
        userId: wx.getStorageSync('userId'),
        subjectType: that.data.subjectType,
        // ranking: that.data.ranking,
        recruitBatch: that.data.batch,
        intentionProvince: that.data.province,
        intentionCity: that.data.city,
        priority: that.data.priority, //0-学校优先；1-专业优先
        intentionSubject: selectedList.join(',')
      },
      success: function (res) {
        if (res.data != '\r\n') {
          that.setData({ schoolList: res.data, selectedSubjectArray: selectedList})
        } else {
          wx.showToast({
            title: '暂无数据',
            icon: 'none',
            duration: 2000
          })
          that.setData({ schoolList: [] ,})
        }
      }
    })
    wx.hideLoading()
  },
  // 改变批次
  changeBatch: function (event) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.setData({
      batch: event.target.dataset.id
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)

  },
  // 改变排名
  changeRank: function (event) {
    this.setData({
      ranking: event.detail.value
    })
  },
  //改变文理科
  changeWenli(event) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.setData({
      subjectType: event.target.dataset.id
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
  },
  //改变优先级
  changePriority(event) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.setData({
      priority: event.target.dataset.id
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
  },
  // 关闭弹窗
  closeDialog() {
    this.setData({
      dialogIsOpen: false,
      selectedSubject: this.data.subjectList,
    })
  },
  // 打开弹窗
  openDialog() {
    this.setData({
      dialogIsOpen: true
    })
  },
  // 选择专业
  clickSubject(event) {
    let list = this.data.selectedSubject;
    if (list[event.target.dataset.id].selected) {
      list[event.target.dataset.id].selected = false
    } else {
      list[event.target.dataset.id].selected = true

    }
    this.setData({
      selectedSubject: list
    })
  },
  // 专业确定
  submitSubject() {
    this.setData({
      subjectList: this.data.selectedSubject,
      dialogIsOpen: false
    })
  },
  // 改变省市区
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      region: e.detail.value
    })
  },
  // 跳转到所选学校专业列表
  toSchoolSubject(event){
    let data = {
      recruitId: event.currentTarget.dataset.id,
      subjectType: this.data.subjectType,
      ranking: this.data.ranking,
      recruitBatch: this.data.batch,
      priority: this.data.priority,
      intentionSubject: this.data.selectedSubjectArray,
      recommend_type: event.currentTarget.dataset.type,
    }
    console.log(data)
    wx.navigateTo({
      url: '/pages/schoolSubject/schoolSubject?data=' + JSON.stringify(data)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if (options.type && options.type == 'junior'){
      that.setData({
        batch:104,
        wishType:2
      })
    }
    that.setData({
      score: wx.getStorageSync('userInfo').SCORE,
      ranking: wx.getStorageSync('userInfo').RANKING,
      subjectType: wx.getStorageSync('userInfo').SUBJECT_TYPE,//1文史类，2理工类
      subjectName: wx.getStorageSync('userInfo').SUBJECT_TYPE_TEXT,
    })
    // 获取专业列表
    wx.request({
      url: app.globalData.api + '/loadBmInfo',
      data: {
        bmGroupName: 'SUBJECT_CLASS',
      },
      success: function (res) {
        let list = [];
        let temp = '';
        for (let key in res.data) {
          temp = {
            id: key,
            name: res.data[key],
            selected: false
          }
          list.push(temp)
        }
        that.setData({
          subjectList: list,
          selectedSubject: list
        })
      }
    })
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