// pages/garbagedetail/garbagedetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {}

  },

  city:function(){
    wx.navigateTo({
      url: '/pages/city/city',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      name:options.name,
      kind:options.kind,
      property:options.property
    })
    console.log(this.data.name)
    var that=this;
    setTimeout(function() {
      that.setData({
        animation: ''
      })
    }, 1000)
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
    wx.setNavigationBarTitle({
      title: this.data.name
    })

    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation
    var next = true;
    //连续动画关键步骤
    setInterval(function () {
      if (next) {
        this.animation.scale(0.8).step()   
        next = !next;
      } else {
        this.animation.scale(1).step()
        next = !next;
      }
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 500)
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
    /*if (res.from === 'button') {
      // 来自页面内转发按钮
    }*/
    return {
      title: this.data.name + '是' + this.data.kind+'，你知道吗？',
      //title: '垃圾分类知识',
      desc: '垃圾分类怕分错？点我一查就知道！',
      path: "/pages/garbagedetail/garbagedetail?name=" + this.data.name + '&kind=' + this.data.kind + '&property=' + this.data.property
     }
  }
})