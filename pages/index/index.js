//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({
  data: {
    userInfo: '',
    isLogin: false,
    registerShow: false,
    loginPhone: '',
    loginPwd: '',
    registerPhone: '',
    registerPwd: '',
    verifiedCode: '',
    codeFlag: true,
    lastTime: 60,
    mainSwiper: {
      imgUrls: [{
          src: app.globalData.imgUrl + "/swiper/banner@3x.png",
          url: ''
        }

      ],
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      circular: true,
    },
    entranceList: [
      {
        name: "高考生专业测试",
        imgUrl: app.globalData.imgUrl + "/icon/xinliceshi1@3x.png",
        url: '/pages/testQuestionList/testQuestionList',
        isOpen: true,
        isvip: false
      },
      
      {
        name: "专业信息",
        imgUrl: app.globalData.imgUrl + "/icon/zhuanye@3x.png",
        url: '/pages/subjectInfo/subjectInfo',
        isOpen: true,
        isvip: false
      },
      {
        name: "历届录取信息",
        imgUrl: app.globalData.imgUrl + "/icon/luquxinxi@3x.png",
        url: '/pages/MatriculateHistory/MatriculateHistory',
        isOpen: true,
        isvip: false
      },
      {
        name: "院校报考助手",
        imgUrl: app.globalData.imgUrl + "/icon/yuanxiao@3x.png",
        url: '/pages/schoolList/schoolList',
        isOpen: true,
        isvip: true,
      },
      {
        name: "志愿设计",
        imgUrl: app.globalData.imgUrl + "/icon/zhiyuansheji@3x.png",
        url: '/pages/wishDesignList/wishDesignList',
        isOpen: true,
        isvip: true
      },
      {
        name: "艺考志愿",
        imgUrl: app.globalData.imgUrl + "/icon/04小程序／专家咨询@2x.png",
        url: '/pages/art/artForm',
        isOpen: true,
        isvip: true
      },
    ],
    schoolSwiper: {
      imgUrls: [{
          img: app.globalData.imgUrl + "/swiper/xiada@3x.png",
          url: '/pages/schoolDetail/schoolDetail?recruitId=1'
        },
        {
          img: app.globalData.imgUrl + "/swiper/fuda@3x.png",
          url: '/pages/schoolDetail/schoolDetail?recruitId=190'
        },
        {
          img: app.globalData.imgUrl + "/swiper/shida@3x.png",
          url: '/pages/schoolDetail/schoolDetail?recruitId=199'
        },
        {
          img: app.globalData.imgUrl + "/swiper/nongda@3x.png",
          url: '/pages/schoolDetail/schoolDetail?recruitId=183'
        }
      ],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000,
      circular: true,
      previousMargin: '65rpx',
      nextMargin: '65rpx',
    },
    forgetShow: false,
    isHideDialog: true,
    firstFlag: true,
    mianfeiUrl: app.globalData.imgUrl + "/icon/mianfei-icon1@3x.png",
    vipUrl: app.globalData.imgUrl + "/icon/VIP-icon1@3x.png",
    isVipEnable: []
  },
  // 未开放功能
  toEntrance: function(event) {
    if (!app.isInfoComplete()) {
      wx.switchTab({
        url: '/pages/personal/personal',
      })
    } else {
      // 是否限制vip
      if (this.data.isVipEnable[event.currentTarget.dataset.index] == 1 && !app.isVip()) {
        wx.showToast({
          title: '请开通会员',
          icon: 'none'
        })
        wx.navigateTo({
          url: '/pages/applyVIP/applyVIP',
        })
      } else {
        wx.navigateTo({
          url: event.currentTarget.dataset.url,
        })
      }
    }
  },
  changeInput: function(event) {
    switch (event.currentTarget.dataset.typeid) {
      case "1":
        this.setData({
          loginPhone: event.detail.value
        });
        break;
      case "2":
        this.setData({
          loginPwd: event.detail.value
        });
        break;
      case "3":
        this.setData({
          registerPhone: event.detail.value
        });
        break;
      case "4":
        this.setData({
          verifiedCode: event.detail.value
        });
        break;
      case "5":
        this.setData({
          registerPwd: event.detail.value
        });
        break;
    }
  },
  toLogin: function() {
    this.setData({
      registerShow: false,
      forgetShow: false
    });
  },
  toForget() {
    this.setData({
      forgetShow: true
    });
  },
  onShareAppMessage: function(res) {
    return {
      title: app.globalData.shareTitle,
      path: '/pages/index/index'
    }
  },
  // 登录
  login: function() {
    let that = this;
    wx.request({
      url: app.globalData.api + '/login',
      data: {
        mobileNum: that.data.loginPhone,
        passwd: util.md5(that.data.loginPwd),
        verifiedType: '0'
      },
      success: function(res) {
        if (res.data.RESULTS == "SUCCESS") {
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          })
          that.setData({
            isLogin: true
          })
          wx.setStorageSync('userId', res.data.USER_ID)
          // wx.setStorageSync('userRole', res.data.ROLE)
          app.getUser(res.data.USER_ID)
        } else {
          wx.showToast({
            title: res.data.MSG,
            icon: 'none'
          })
        }
      }
    })
  },
  // 获取验证码
  getVerifiedCode: function(event) {
    let type = event.currentTarget.dataset.type;
    let vType = "";
    if (type == 1) {
      vType = 'Register';
    } else if (type == 2) {
      vType = 'ResetPwd';
    }
    let that = this;
    if (that.data.codeFlag) {
      wx.request({
        url: app.globalData.api + '/sendMobileVerifide',
        data: {
          mobileNum: that.data.registerPhone,
          verifideType: vType
        },
        success: function(res) {
          if (res.data.RESULTS == "SUCCESS") {
            that.codeTime();
            wx.showToast({
              title: '获取验证码成功',
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
    }
  },
  // 验证码倒计时
  codeTime: function() {
    let that = this;
    let time = that.data.lastTime;
    this.setData({
      codeFlag: false
    })
    let interval = setInterval(function() {
      if (time == 0) {
        clearInterval(interval)
        that.setData({
          lastTime: 60,
          codeFlag: true
        })
      } else {
        time = time - 1;
        that.setData({
          lastTime: time
        })
      }
    }, 1000)
  },
  toRegister: function(e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      wx.setStorageSync('wxUserInfo', e.detail.userInfo)
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
        registerShow: true
      })
    }
  },
  register: function() {
    let that = this;
    wx.request({
      url: app.globalData.api + '/register',
      data: {
        mobileNum: that.data.registerPhone,
        passwd: util.md5(that.data.registerPwd),
        verifiedCode: that.data.verifiedCode,
        references: wx.getStorageSync('references') || '',
      },
      success: function(res) {
        if (res.data.RESULTS == "SUCCESS") {
          wx.showToast({
            title: '注册成功',
            icon: 'success'
          })
          that.setData({
            registerShow: false
          })
        } else {
          wx.showToast({
            title: res.data.MSG,
            icon: 'none'
          })
        }
      }
    })
  },
  reset() {
    let that = this;
    wx.request({
      url: app.globalData.api + '/resetPwd',
      data: {
        mobileNum: that.data.registerPhone,
        passwd: util.md5(that.data.registerPwd),
        verifiedCode: that.data.verifiedCode,
      },
      success: function(res) {
        if (res.data.RESULTS == "SUCCESS") {
          wx.showToast({
            title: '密码重置成功',
            icon: 'success'
          })
          that.setData({
            forgetShow: false
          })
        } else {
          wx.showToast({
            title: res.data.MSG,
            icon: 'none'
          })
        }
      }
    })
  },
  hideDialog() {
    this.setData({
      isHideDialog: true
    })
  },
  noBubble() {
    console.log('阻止冒泡')
  },
  onShow: function() {
    if (!this.data.firstFlag) {
      this.setData({
        isHideDialog: false
      })
    } else {
      this.setData({
        firstFlag: false
      })
    }
    if (wx.getStorageSync('userId')) {
      app.getUser(wx.getStorageSync('userId'));
      app.getTemporary(wx.getStorageSync('userId'))
      this.setData({
        isLogin: true
      })
    } else {
      this.setData({
        isLogin: false,
      })
    }
    // 获取授权
    // if (wx.getStorageSync('wxUserInfo')) {
    //   this.setData({
    //     userInfo: wx.getStorageSync('wxUserInfo'),
    //     hasUserInfo: true
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: '/pages/authority/authority'
    //   })
    // }
    app.loadVipEnable().then(res => {
      let temp = [
        res.data.ENABLE_VIP_TEST,
        res.data.ENABLE_VIP_SUBJICE,
        res.data.ENABLE_VIP_HISTORY,
        res.data.ENABLE_VIP_SCHOOL,
        res.data.ENABLE_VIP_VOLUNTEER,
        res.data.ENABLE_VIP_ARTS,
      ]
      this.setData({
        isVipEnable: temp
      })
    })
  },
  onLoad: function(options) {
    if (options.references) {
      wx.setStorageSync('references', options.references);
    }
  },
  getUserInfo: function(e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      wx.setStorageSync('wxUserInfo', e.detail.userInfo)
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      let that = this;
      wx.request({
        url: app.globalData.api + '/login',
        data: {
          mobileNum: that.data.loginPhone,
          passwd: util.md5(that.data.loginPwd),
          verifiedType: '0'
        },
        success: function (res) {
          if (res.data.RESULTS == "SUCCESS") {
            wx.showToast({
              title: '登录成功',
              icon: 'success'
            })
            that.setData({
              isLogin: true
            })
            wx.setStorageSync('userId', res.data.USER_ID)
            // wx.setStorageSync('userRole', res.data.ROLE)
            app.getUser(res.data.USER_ID)
          } else {
            wx.showToast({
              title: res.data.MSG,
              icon: 'none'
            })
          }
        }
      })
    }
  }
})