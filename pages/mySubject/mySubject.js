// pages/mySubject/mySubject.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editFlag: false,
    result_0: [],
    result_1: [],
    result_2: [],
    result_3: []
  },
  towishDesign() {
    wx.navigateTo({
      url: '/pages/wishDesignList/wishDesignList',
    })
  },
  sort(){
    let that = this;
    wx.request({
      url: app.globalData.api + '/reorderVolunteerList',
      data: {
        userId: wx.getStorageSync('userId'),
      },
      success: function (res) {
        if (res.data != '\r\n') {
          let temp0 = [];
          let temp1 = [];
          let temp2 = [];
          let temp3 = [];
          for (let item of res.data) {
            if (item.RECOMMEND_TYPE === '0') {
              temp0.push(item)
            } else if (item.RECOMMEND_TYPE === '1') {
              temp1.push(item)
            } else if (item.RECOMMEND_TYPE === '2') {
              temp2.push(item)
            } else if (item.RECOMMEND_TYPE === '') {
              temp43.push(item)
            }
          }
          that.setData({
            result: res.data,
            result_0: temp0,
            result_1: temp1,
            result_2: temp2,
            result_3: temp3,
            editFlag: false
          })
        } else {
          that.setData({
            result: [],
          })
        }

      }
    })
  },
  getData() {
    let that = this;
    wx.request({
      url: app.globalData.api + '/loadVolunteerList',
      data: {
        userId: wx.getStorageSync('userId'),
      },
      success: function (res) {
        if (res.data !='\r\n'){
          let temp0 = [];
          let temp1 = [];
          let temp2 = [];
          let temp3 = [];
          for (let item of res.data) {
            if (item.RECOMMEND_TYPE === '0') {
              temp0.push(item)
            } else if (item.RECOMMEND_TYPE === '1') {
              temp1.push(item)
            } else if (item.RECOMMEND_TYPE === '2') {
              temp2.push(item)
            } else if (item.RECOMMEND_TYPE === '') {
              temp3.push(item)
            }
          }
          that.setData({
            result: res.data,
            result_0: temp0,
            result_1: temp1,
            result_2: temp2,
            result_3: temp3,
            editFlag: false
          })
        }else{
          that.setData({
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
  save() {
    let temp = [];
    for (let item of this.data.result_0) {
      temp.push(item)
    }
    for (let item of this.data.result_1) {
      temp.push(item)
    }
    for (let item of this.data.result_2) {
      temp.push(item)
    }
    for (let item of this.data.result_3) {
      temp.push(item)
    }
    let that = this;
    wx.request({
      url: app.globalData.api + '/saveVolunteerList',
      data: {
        userId: wx.getStorageSync('userId'),
        volunteerList: temp
      },
      success: function (res) {
        if (res.data.RESULTS == 'SUCCESS') {
          wx.showToast({
            title: res.data.MSG,
            icon: 'success'
          })
          that.getData();
        } else {
          wx.showToast({
            title: res.data.MSG,
          })
        }

      }
    })
  },
  deleteSchool0(event) {
    let id = event.currentTarget.dataset.id;
    let temp0 = this.data.result_0;
    for (let i in temp0) {
      if (temp0[i].SCHOOL_ID == id) {
        temp0.splice(i, 1)
        this.setData({ result_0: temp0 })
      }
    }
  },
  deleteSchool1(event) {
    let id = event.currentTarget.dataset.id;
    let temp1 = this.data.result_1;
    for (let i in temp1) {
      if (temp1[i].SCHOOL_ID == id) {
        temp1.splice(i, 1)
        this.setData({ result_1: temp1 })
      }
    }
  },
  deleteSchool2(event) {
    let id = event.currentTarget.dataset.id;
    let temp2 = this.data.result_2;
    for (let i in temp2) {
      if (temp2[i].SCHOOL_ID == id) {
        temp2.splice(i, 1)
        this.setData({ result_2: temp2 })
      }
    }
  },
  deleteSchool3(event) {
    let id = event.currentTarget.dataset.id;
    let temp3 = this.data.result_3;
    for (let i in temp3) {
      if (temp3[i].SCHOOL_ID == id) {
        temp3.splice(i, 1)
        this.setData({ result_3: temp3 })
      }
    }
  },
  deleteSubject0(event) {
    let sid = event.currentTarget.dataset.sid;
    let id = event.currentTarget.dataset.id;
    let index = event.currentTarget.dataset.index;
    let temp0 = this.data.result_0;
    for (let i in temp0) {
      if (temp0[i].SCHOOL_ID == sid) {
        switch (index) {
          case "1": temp0[i].SUBJECT_ID1='';break;
          case "2": temp0[i].SUBJECT_ID2 = ''; break;
          case "3": temp0[i].SUBJECT_ID3 = ''; break;
          case "4": temp0[i].SUBJECT_ID4 = ''; break;
          case "5": temp0[i].SUBJECT_ID5 = ''; break;
          case "6": temp0[i].SUBJECT_ID6 = ''; break;
          case "7": temp0[i].SUBJECT_ID7 = ''; break;
          case "8": temp0[i].SUBJECT_ID8 = ''; break;
          case "9": temp0[i].SUBJECT_ID9 = ''; break;
          case "10": temp0[i].SUBJECT_ID10 = ''; break;
        }
        this.setData({ result_0: temp0 })
      }
    }
  },
  deleteSubject1(event) {
    let sid = event.currentTarget.dataset.sid;
    let id = event.currentTarget.dataset.id;
    let index = event.currentTarget.dataset.index;
    let temp1 = this.data.result_1;
    for (let i in temp1) {
      if (temp1[i].SCHOOL_ID == sid) {
        switch (index) {
          case "1": temp1[i].SUBJECT_ID1 = ''; break;
          case "2": temp1[i].SUBJECT_ID2 = ''; break;
          case "3": temp1[i].SUBJECT_ID3 = ''; break;
          case "4": temp1[i].SUBJECT_ID4 = ''; break;
          case "5": temp1[i].SUBJECT_ID5 = ''; break;
          case "6": temp1[i].SUBJECT_ID6 = ''; break;
          case "7": temp1[i].SUBJECT_ID7 = ''; break;
          case "8": temp1[i].SUBJECT_ID8 = ''; break;
          case "9": temp1[i].SUBJECT_ID9 = ''; break;
          case "10": temp1[i].SUBJECT_ID10 = ''; break;
        }
        this.setData({ result_1: temp1 })
      }
    }
  },
  deleteSubject2(event) {
    let sid = event.currentTarget.dataset.sid;
    let id = event.currentTarget.dataset.id;
    let index = event.currentTarget.dataset.index;
    let temp2 = this.data.result_2;
    for (let i in temp2) {
      if (temp2[i].SCHOOL_ID == sid) {
        switch (index) {
          case "1": temp2[i].SUBJECT_ID1 = ''; break;
          case "2": temp2[i].SUBJECT_ID2 = ''; break;
          case "3": temp2[i].SUBJECT_ID3 = ''; break;
          case "4": temp2[i].SUBJECT_ID4 = ''; break;
          case "5": temp2[i].SUBJECT_ID5 = ''; break;
          case "6": temp2[i].SUBJECT_ID6 = ''; break;
          case "7": temp2[i].SUBJECT_ID7 = ''; break;
          case "8": temp2[i].SUBJECT_ID8 = ''; break;
          case "9": temp2[i].SUBJECT_ID9 = ''; break;
          case "10": temp2[i].SUBJECT_ID10 = ''; break;
        }
        this.setData({ result_2: temp2 })
      }
    }
  },
  deleteSubject3(event) {
    let sid = event.currentTarget.dataset.sid;
    let id = event.currentTarget.dataset.id;
    let index = event.currentTarget.dataset.index;
    let temp3 = this.data.result_3;
    for (let i in temp3) {
      if (temp3[i].SCHOOL_ID == sid) {
        switch (index) {
          case "1": temp3[i].SUBJECT_ID1 = ''; break;
          case "2": temp3[i].SUBJECT_ID2 = ''; break;
          case "3": temp3[i].SUBJECT_ID3 = ''; break;
          case "4": temp3[i].SUBJECT_ID4 = ''; break;
          case "5": temp3[i].SUBJECT_ID5 = ''; break;
          case "6": temp3[i].SUBJECT_ID6 = ''; break;
          case "7": temp3[i].SUBJECT_ID7 = ''; break;
          case "8": temp3[i].SUBJECT_ID8 = ''; break;
          case "9": temp3[i].SUBJECT_ID9 = ''; break;
          case "10": temp3[i].SUBJECT_ID10 = ''; break;
        }
        this.setData({ result_3: temp3 })
      }
    }
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
    this.getData()
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