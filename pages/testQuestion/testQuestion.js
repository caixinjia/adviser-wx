// pages/testQuestion/testQuestion.js
const app = getApp()
const wxCharts = require('../../utils/wxcharts-min.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    num: 0,
    answers: [],
    isComplete:false,
    userInfo:'',
    testResult:{
      REFER_TO_SUBJECT:'教育学： 学前教育、艺术教育、装潢设计与工艺教育文学 汉语言文学、汉语言、对外汉语、中国少数民族语言、外国语言文学、新闻传播学类所有专业、艺术学类所有专业；↵历史学： 民族学、文物保护技术；↵管理学：旅游管理；↵理学：地理科学类所有专业；↵工学： 广播电视工程、土建类所有专业、测绘类所有专业、轻工纺织食品类所有专业、航空航天类所有专业、宝石及材料工艺学；↵农学 ： 园艺、园林；↵医学： 医学影像学。',
      TEST_RESULT_EXPLAIN: '【共同特点】 有创造力，乐于创造新颖、与众不同的成果，渴望表现自己的个性，实现自身的价值。做事理想化，追求完美，不重实际。具有一定的艺术才能和个性。善于表达，怀旧，心态较为复杂。↵【性格特点】 有创造性，非传统的，敏感，容易情绪化，较冲动，不服从指挥。↵ 【职业建议】 喜欢的工作要求具备艺术修养、创造力、表达能力和直觉，并将其用于语言、行为、声音、颜色和形式的审美、思索和感受，具备相应的能力。不善于事务性工作。如：艺术方面（演员、导演、艺术设计师、雕刻家、建筑师、摄影家、广告制作人） 音乐方面（歌唱家、作曲家。',
      TEST_SCORE: 'A：艺术型（Artistic）：9；C：传统型（Conventional）：7；I：研究型（Investigative）：6；E：企业型（Enterprise）：6；R：现实型（Realistic）（技能现实）：5；S：社会型（Social）：4；',
      TEST_SCORE_EXPLAIN: 'A：艺术型（Artistic）',
    }
  },
  answer(e) {
    let id = e.currentTarget.dataset.id;
    console.log(id)
    if (this.data.num == this.data.result.length - 1) {
      this.submit();
    }else{
      this.setData({
        num: this.data.num + 1,
        answer: this.data.answers.push(id)
      })
    }


  },
  submit() {
    let that = this;
    wx.request({
      url: app.globalData.api + '/reckonTestResult',
      data: {
        userId:wx.getStorageSync('userId'),
        testGroupId: '1001',
        testResult:that.data.answers.join(',')
      },
      success: function (res) {
        that.setData({
          testResult:res.data,
          isComplete:true
        })
        let array = res.data.TEST_SCORE.split('；');
        console.log(array)
        new wxCharts({
          canvasId: 'radarCanvas',
          type: 'radar',
          categories: [array[0].split('（')[0], array[1].split('（')[0], array[2].split('（')[0], array[3].split('（')[0], array[4].split('（')[0], array[5].split('（')[0]],
          series: [{
            data: [array[0].split('：')[2], array[1].split('：')[2], array[2].split('：')[2], array[3].split('：')[2], array[4].split('：')[2], array[5].split('：')[2]],
            color: 'rgba(255,240,130,0.70)'
          }],
          width: 320,
          height: 200,
          extra: {
            radar: {
              labelColor: '#252628',
              max: 10
            }
          }
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
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
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this;
    wx.request({
      url: app.globalData.api + '/loadTestQuestions',
      data: {
        testGroupId: '1001'
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