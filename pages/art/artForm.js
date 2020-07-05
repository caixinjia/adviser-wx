// pages/art/artForm.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasInfo: true, // 是否填写成绩和排名
    artCategory: [], // 艺术类别列表
    artsScore: '',
    artsRanking: '',
    gaokaoRanking2: '',
    selectedCategory: '',
    isShow: false,
    userArtInfo: {},
    artSubjectClass: [],
    selectedSubject: [],
    provinceList: [
      {code: '110000', name: '北京市'},
      {code: '120000', name: '天津市'},
      {code: '130000', name: '河北省'},
      {code: '140000', name: '山西省'},
      {code: '150000', name: '内蒙古自治区'},
      {code: '210000', name: '辽宁省'},
      {code: '220000', name: '吉林省'},
      {code: '230000', name: '黑龙江省'},
      {code: '310000', name: '上海市'},
      {code: '320000', name: '江苏省'},
      {code: '330000', name: '浙江省'},
      {code: '340000', name: '安徽省'},
      {code: '350000', name: '福建省'},
      {code: '360000', name: '江西省'},
      {code: '370000', name: '山东省'},
      {code: '410000', name: '河南省'},
      {code: '420000', name: '湖北省'},
      {code: '430000', name: '湖南省'},
      {code: '440000', name: '广东省'},
      {code: '450000', name: '广西壮族自治区'},
      {code: '460000', name: '海南省'},
      {code: '500000', name: '重庆市'},
      {code: '510000', name: '四川省'},
      {code: '520000', name: '贵州省'},
      {code: '530000', name: '云南省'},
      {code: '540000', name: '西藏自治区'},
      {code: '610000', name: '陕西省'},
      {code: '620000', name: '甘肃省'},
      {code: '630000', name: '青海省'},
      {code: '640000', name: '宁夏回族自治区'},
      {code: '650000', name: '新疆维吾尔自治区'},
    ],
    selectedProvince: [],
    isAllSubject: false,
    isAllProvince: false,

  },
  // 获取用户艺考信息
  loadUserArtsInfo() {
    wx.request({
      url: app.globalData.api + '/loadUserArtsInfo',
      data: {
        userId: wx.getStorageSync('userId'),
      },
      success: (res) => {
        if (res.data.RESULTS == 'FAILED') {
          this.setData({
            hasInfo: false,
          })
        } else {
          this.setData({
            userArtInfo: res.data,
            hasInfo: true,
          })
          this.loadArtsSubjectClass();
        }
      }
    })
  },
  // 获取艺术类别列表
  loadArtsCategory() {
    wx.request({
      url: app.globalData.api + '/loadArtsCategory',
      data: {
        subjectType: wx.getStorageSync('userInfo').SUBJECT_TYPE,
      },
      success: (res) => {
        this.setData({
          artCategory: res.data,
        })
      }
    })
  },
  // 改变input的值
  changeInput: function (event) {
    switch (event.currentTarget.dataset.id) {
      case "1":
        this.setData({
          artsScore: event.detail.value
        }); break;
      case "2":
        this.setData({
          gaokaoRanking2: event.detail.value
        }); break;
      case "3":
        this.setData({
          artsRanking: event.detail.value
        }); break;
    }
  },
  // 选择艺术类别
  selectCategory(event) {
    this.setData({
      selectedCategory: event.currentTarget.dataset.code
    })
  },
  selectSubJect(event) {
    const code = event.currentTarget.dataset.code;
    let array = [].concat(this.data.selectedSubject);
    if (array.indexOf(code) > -1) {
      const index = array.indexOf(code);
      array.splice(index, 1);
      this.setData({
        selectedSubject: array,
      })
    } else {
      this.setData({
        selectedSubject: array.concat([code]),
      }) 
    }
  },
  selectProvince(event) {
    const code = event.currentTarget.dataset.code;
    let array = [].concat(this.data.selectedProvince);
    if (array.indexOf(code) > -1) {
      const index = array.indexOf(code);
      array.splice(index, 1);
      this.setData({
        selectedProvince: array,
      })
    } else {
      this.setData({
        selectedProvince: array.concat([code]),
      }) 
    }
  },
  returnTrue() {
    return true;
  },
  toggleDialog() {
    if (this.data.selectedCategory == '') {
      wx.showToast({
        title: '请选择艺考类别',
        icon: 'none'
      })
      return;
    }
    if (this.data.artsScore == '') {
      wx.showToast({
        title: '请填写省考专业分',
        icon: 'none'
      })
      return;
    }
    if (this.data.gaokaoRanking2 == '') {
      wx.showToast({
        title: '请填写文化分排名2',
        icon: 'none'
      })
      return;
    }
    this.setData({
      isShow: !this.data.isShow,
    })
  },
  // 保存用户艺考信息
  saveUserArtsInfo() {
    wx.request({
      url: app.globalData.api + '/saveUserArtsInfo',
      data: {
        userId: wx.getStorageSync('userId'),
        artsCategory: this.data.selectedCategory,
        artsScore: this.data.artsScore,
        artsRanking: this.data.artsRanking,
        gaokaoRanking2: this.data.gaokaoRanking2,
      },
      success: (res) => {
        this.loadUserArtsInfo();
      }
    })
  },
  // 获取艺术类别列表
  loadArtsSubjectClass() {
    wx.request({
      url: app.globalData.api + '/loadArtsSubjectClass',
      data: {
        artsCategory: this.data.userArtInfo.ARTS_CATEGORY,
      },
      success: (res) => {
        this.setData({
          artSubjectClass: res.data
        })
      }
    })
  },
  toResult() {
    if (this.data.selectedSubject.length == 0 && !this.data.isAllSubject) {
      wx.showToast({
        title: '请选择艺考类别',
        icon: 'none'
      })
      return;
    }
    if (this.data.selectedProvince.length == 0 && !this.data.isAllProvince) {
      wx.showToast({
        title: '请选择意向省份',
        icon: 'none'
      })
      return;
    }
    wx.setStorageSync('selectedProvince', this.data.selectedProvince);
    wx.setStorageSync('selectedSubject', this.data.selectedSubject);
    wx.navigateTo({
      url: '/pages/art/artResult',
    })
  },
  selectAllSubject() {
    this.setData({
      isAllSubject: !this.data.isAllSubject,
      selectedSubject: [],
    })
  },
  selectAllProvince() {
    this.setData({
      isAllProvince: !this.data.isAllProvince,
      selectedProvince: [],
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
    this.loadUserArtsInfo();
    this.loadArtsCategory();
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