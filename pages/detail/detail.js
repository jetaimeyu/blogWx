// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {},
    info: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options={}) {
    this.data.article.id = options.id || "1";
    this.loadArticle()

  },

  //加载文章
  loadArticle:function(){
      var that = this;
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: `https://blog.jetaime.top/api/v1/article/${that.data.article.id}`,
        success:function(res){
          console.log('dd', res)
            that.setData({
              article:{
                title:res.data.data.title,
                image:res.data.data.image,
                author:res.data.data.author,
                content:res.data.data.content,
                posted_at:res.data.data.posted_at,
                views:res.data.data.views,
                votes:res.data.data.votes,
              }
            })
          // 引入 wxParse 组件处理文章正文
          var wxParse = require('../components/wxParse/wxParse.js')
          wxParse.wxParse('article_content', 'html', that.data.article.content, that, 1)
        },
        fail: function () {
          that.data.info = '获取文章详情数据失败'
        },
        complete: function () {
          wx.hideLoading()
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
    let id = this.data.article.id
    let title = this.data.article.title
    return {
      title: ` ${title}`,
      path: `/pages/detail/detail?id=${id}`
    }
  },
})