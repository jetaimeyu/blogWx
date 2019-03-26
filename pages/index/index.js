//index.js
//获取应用实例
const app = getApp()
Page({
    data: {
        articles: [],
        isLoadingMore: false,
        currentPage: 1,
        info: ''
    },
    onLoad: function () {
      wx.showLoading({
        title: '文章加载中',
      })
      this.loadArticels();
       
    },

    //加载文章列表
    loadArticels:function(){
      var that = this;
      wx.request({
    
        url: "http://blog.test/api/v1/articles?page=${that.data.currentPage}",
        method:"get",
        success:function(res){
            if(res.data.message == "success"){
              console.log(res.data.articles)
              if(res.data.articles.length == 0){
                  that.setData({
                    isLoadingMore:false,
                    info:"没有更多文章了"
                  })
              }
              that.setData({
                articles: that.data.articles.concat(res.data.articles)
              })
            }else{
              that.setData({
                info:"加载文章失败， 请稍后再试"
              })
            }
            wx.hideLoading();
        }

      })
    },
    onReachBottom:function(){
      this.data.currentPage++;
      if(this.data.currentPage>20 && this.data.isLoading){
        //最多加载20页
        this.data.isLoading = false;
        this.data.info = "没有更多文章了";
        return;
      }
      this.data.isLoadingMore =true;
      this.loadArticels()
    },
    onShareAppMessage() {
      return {
        title: '哼哼哈嘿',
        path: '/pages/index'
      }
    },
    postDetail:function(e){
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id,
      })

    }

})
