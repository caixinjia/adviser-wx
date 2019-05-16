// pages/schoolDetail/schoolDetail.js
const app = getApp()
import * as echarts from '../../ec-canvas/echarts';

function setOption(chart, that) {
  const option = {
    title: {
      show: false
    },
    xAxis: {
      type: 'category',
      data: ['2014', '2015', '2016', '2017', '2018']
    },
    yAxis: {
      type: 'value',
      // inverse: true,
      scale: true
    },
    series: [{
      data: [that.data.minRanking[0], that.data.minRanking[1], that.data.minRanking[2], that.data.minRanking[3], that.data.minRanking[4]],
      type: 'line',
      label: {
        show: true,
        color: '#F7CE2C'
      },
      lineStyle: {
        color: '#F7CE2C'
      },
      itemStyle: {
        color: '#F7CE2C'
      }
    }]
  };
  chart.setOption(option);
}

function setOption2(chart, that) {
  const option = {
    title: {
      show: false
    },
    xAxis: {
      type: 'category',
      data: ['2014', '2015', '2016', '2017', '2018']
    },
    yAxis: {
      type: 'value',
      inverse: true,
      scale: true
    },
    series: [{
      data: [that.data.hisRanking[0], that.data.hisRanking[1], that.data.hisRanking[2], that.data.hisRanking[3], that.data.hisRanking[4]],
      type: 'line',
      label: {
        show: true,
        color: '#F7CE2C'
      },
      lineStyle: {
        color: '#F7CE2C'
      },
      itemStyle: {
        color: '#F7CE2C'
      }
    }]
  };
  chart.setOption(option);
}

function setOption3(chart, that) {
  const option = {
    title: {
      show: false
    },
    animation:false,
    xAxis: {
          type : 'value',
          boundaryGap : [0, 0.1],
          scale: true
    },
    yAxis: {
         type : 'category',
         show:false,
         data : that.data.subRankingX,
         inverse: true,
         scale: true
    },
    series: [{
      data: that.data.subRankingY,
      type: 'bar',
      label: {
        show: true,
        color: '#333',
        position:'insideLeft',
        formatter :function(param){
          return that.data.subRankingY[param.dataIndex] + '/' + that.data.subRankingX[param.dataIndex]
        }
      },
      lineStyle: {
        color: '#F7CE2C'
      },
      itemStyle: {
        color: function(param){
          return param.name == '我的排名'?'#FF5577':'#F7CE2C'
        },
        opacity:0.7
      }
    }]
  };
  chart.setOption(option);
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recruitId: '',
    result: '',
    img: [
      app.globalData.imgUrl + "/icon/zhuanye@3x.png",
      app.globalData.imgUrl + "/icon/luquxinxi@3x.png",
      app.globalData.imgUrl + "/icon/zhuanjia@3x.png"
    ],
    img985: app.globalData.imgUrl + '/icon/985@3x.png',
    img211: app.globalData.imgUrl + '/icon/211@3x.png',
    imgdouble: app.globalData.imgUrl + '/icon/shuangyiliu@3x.png',
    ec: {
      lazyLoad: true
    },
    minRanking: [0, 1000, 200, 300, 400],
    ec2: {
      lazyLoad: true
    },
    hisRanking: [0, 1000, 200, 300, 400],
    hisRankingArray: [],
    hisTitle: [],
    hisTitleIndex: 0,
    ec3: {
      lazyLoad: true
    },
    subRankingX: [],
    subRankingY: [],
    subRankingArray: [],
    subTitle: [],
    subTitleIndex: 0,
    barheight:500
  },
  // 跳转到所选学校历届录取信息
  toSchoolHistory() {
    let data = {
      schoolName: this.data.result.RECRUIT_NAME,
      subjectName: ''
    }
    console.log(data)
    wx.navigateTo({
      url: '/pages/MatriculateHistory/MatriculateHistory?data=' + JSON.stringify(data)
    })
  },
  // 跳转到所选学校专业信息
  toSubjectList() {
    let data = {
      schoolName: this.data.result.RECRUIT_NAME
    }
    wx.navigateTo({
      url: '/pages/subjectInfo/subjectInfo?data=' + JSON.stringify(data)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    this.setData({
      recruitId: JSON.parse(options.recruitId)
    })
    let that = this;
    // 获取组件
    this.ecComponent1 = this.selectComponent('#mychart-dom-line');
    this.ecComponent2 = this.selectComponent('#mychart-dom-line2');
    this.ecComponent3 = this.selectComponent('#mychart-dom-line3');
    // 历年最低录取
    new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.api + '/loadSchoolInfo',
        data: {
          recruitId: that.data.recruitId,
        },
        success: function(res) {
          that.setData({
            result: res.data
          })
          if (wx.getStorageSync('userInfo').SUBJECT_TYPE == 2) {
            that.setData({
              minRanking: [
                Number(res.data.LAST_5_MIN_RANKING_L),
                Number(res.data.LAST_4_MIN_RANKING_L),
                Number(res.data.LAST_3_MIN_RANKING_L),
                Number(res.data.LAST_2_MIN_RANKING_L),
                Number(res.data.LAST_1_MIN_RANKING_L),
              ]
            })
          } else {
            that.setData({
              minRanking: [
                Number(res.data.LAST_5_MIN_RANKING_W),
                Number(res.data.LAST_4_MIN_RANKING_W),
                Number(res.data.LAST_3_MIN_RANKING_W),
                Number(res.data.LAST_2_MIN_RANKING_W),
                Number(res.data.LAST_1_MIN_RANKING_W),
              ]
            })
          }
          resolve();
        }
      })
      wx.hideLoading()
    }).then(res => {
      that.init1()
    })
    // 院校录取排名（近五年)
    new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.api + '/loadSchoolHisRanking',
        data: {
          recruitId: that.data.recruitId,
          subjectType: wx.getStorageSync('userInfo').SUBJECT_TYPE
        },
        success: function(res) {
          let hisTitle = []
          for (let i in res.data) {
            hisTitle.push({
              batch: res.data[i].RECRUIT_BATCH,
              name: that.formatBatch(res.data[i].RECRUIT_BATCH)
            })
          }
          that.setData({
            hisTitleIndex: 0,
            hisTitle: hisTitle,
            hisRankingArray: res.data,
            hisRanking: [
              Number(res.data[0].LAST_5_MIN_RANKING),
              Number(res.data[0].LAST_4_MIN_RANKING),
              Number(res.data[0].LAST_3_MIN_RANKING),
              Number(res.data[0].LAST_2_MIN_RANKING),
              Number(res.data[0].LAST_1_MIN_RANKING),
            ]
          })
          resolve();
        }
      })
      wx.hideLoading()
    }).then(res => {
      this.init2()
    })
    //院校各专业去年录取排名
    new Promise((resolve, reject) => {
      wx.request({
        url: app.globalData.api + '/loadSubjectHisRanking',
        data: {
          recruitId: that.data.recruitId,
          subjectType: wx.getStorageSync('userInfo').SUBJECT_TYPE
        },
        success: function(res) {
          let subTitle = []
          for (let i in res.data) {
            subTitle.push({
              batch: res.data[i].RECRUIT_BATCH,
              name: that.formatBatch(res.data[i].RECRUIT_BATCH)
            })
          }
          let item = res.data[0].DATA
          let X = []
          let Y = []
          for (let i in item) {
            X.push(item[i].SUBJECT_NAME)
            Y.push(item[i].LAST_1_MIN_RANKING)
          }
          // 插入自己的排名
          let rank =  wx.getStorageSync('userInfo').RANKING
          let tempX = []
          let tempY = []
          let isInsert = false
          for(let i in Y){
            if(i == 0 && rank <= Number(Y[i]) && !isInsert){
              tempX.push('我的排名')
              tempY.push(rank)
              tempX.push(X[i])
              tempY.push(Y[i])
              isInsert = true
            }else if( rank>Number(Y[i-1]) && rank< Number(Y[i]) && !isInsert){
              tempX.push('我的排名')
              tempY.push(rank)
              tempX.push(X[i])
              tempY.push(Y[i])
              isInsert = true
            }else {
              tempX.push(X[i])
              tempY.push(Y[i])
            }
          }
          if(Y.length == tempY.length){
            tempX.push('我的排名')
            tempY.push(rank)
          }
          that.setData({
            subTitleIndex: 0,
            subTitle: subTitle,
            subRankingArray: res.data,
            subRankingY: tempY,
            subRankingX: tempX,
            barheight: Y.length * 26 + 500
          })
          that.init3()
          resolve();
        }
      })
      wx.hideLoading()
    })
  },
  // 点击按钮后初始化图表1
  init1() {
    const that = this
    this.ecComponent1.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption(chart, that);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;


      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  // 点击按钮后初始化图表2
  init2() {
    const that = this
    this.ecComponent2.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption2(chart, that);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  // 点击按钮后初始化图表3
  init3() {
    const that = this
    this.ecComponent3.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption3(chart, that);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  formatBatch(batch) {
    if (batch == '101') {
      return '提前批'
    }
    if (batch == '102') {
      return '本一批'
    }
    if (batch == '103') {
      return '本二批'
    }
    if (batch == '104') {
      return '大专批'
    }
  },
  changeHis(event) {
    const that = this
    let index = event.currentTarget.dataset.index
    this.setData({
      hisTitleIndex: index,
      hisRanking: [
        Number(that.data.hisRankingArray[index].LAST_5_MIN_RANKING),
        Number(that.data.hisRankingArray[index].LAST_4_MIN_RANKING),
        Number(that.data.hisRankingArray[index].LAST_3_MIN_RANKING),
        Number(that.data.hisRankingArray[index].LAST_2_MIN_RANKING),
        Number(that.data.hisRankingArray[index].LAST_1_MIN_RANKING),
      ]
    })
    this.init2()
  },
  changeSub(event) {
    const that = this
    let index = event.currentTarget.dataset.index
    let item = that.data.subRankingArray[index].DATA
    let X = []
    let Y = []
    for (let i in item) {
      X.push(item[i].SUBJECT_NAME)
      Y.push(item[i].LAST_1_MIN_RANKING)
    }
    // 插入自己的排名
    let rank =  wx.getStorageSync('userInfo').RANKING
    let tempX = []
    let tempY = []
    let isInsert = false
    for(let i in Y){
      if(i == 0 && rank <= Number(Y[i]) && !isInsert){
        tempX.push('我的排名')
        tempY.push(rank)
        tempX.push(X[i])
        tempY.push(Y[i])
        isInsert = true
      }else if( rank>Number(Y[i-1]) && rank< Number(Y[i]) && !isInsert){
        tempX.push('我的排名')
        tempY.push(rank)
        tempX.push(X[i])
        tempY.push(Y[i])
        isInsert = true
      }else {
        tempX.push(X[i])
        tempY.push(Y[i])
      }
    }
    if(Y.length == tempY.length){
      tempX.push('我的排名')
      tempY.push(rank)
    }
    this.setData({
      subTitleIndex: index,
      subRankingY: tempY,
      subRankingX: tempX,
      barheight: Y.length * 26 + 500
    })
    this.init3()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    return {
      title: app.globalData.shareTitle,
      path: '/pages/index/index'
    }
  },
})
