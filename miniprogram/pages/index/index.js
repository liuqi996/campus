// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: false,
    showViews: false,
    showViewz:false,
    scrollTop: 0
  },

  adminlogin:function(){
    wx.navigateTo({
      url: '../../packageC/pages/epa-login/epa-login',
    })
  },

  change: function () {
    var that = this;
    that.setData({
    showView: (!that.data.showView)
  })
},

  openhuanxie:function(){
    wx.navigateTo({
      url:"/pages/epa-introduction/epa-introduction"
    })
  },

  sign_up:function(){
    wx.navigateTo({
      url: '/pages/act_bm_list/act_bm_list',
    })
  },

  epa_project:function(){
    wx.navigateTo({
      url: '../../packageA/pages/epa-project/epa-project',
    })
  },

  epa_team:function(){
    wx.navigateTo({
      url: '../../packageA/pages/epa-team/epa-team',
    })
  },

  history_honor:function(){
    wx.navigateTo({
      url: '../../packageA/pages/epa-introduction/epa-introduction',
    })
  },

  register:function(){
    wx.navigateTo({
      url: '/pages/act_sign_in_intro/act_sign_in_intro',
    })
  },

  appraise:function(){
    wx.navigateTo({
      url: '/pages/appraise/appraise',
    })
  },

  prize:function(){
    wx.navigateTo({
      url: '/pages/prize/prize',
    })
  },

  allactivity:function(){
    wx.navigateTo({
      url: '/pages/act_bm_list/act_bm_list',
    })
  },

  scroll(e) {
    console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },

  tap() {
    for (let i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },

  tapMove() {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      menus: ['shareAppMessage', 'shareTimeline'],
      success(res) {
        console.log(res)
      },
      fail(e) {
        console.log(e)
      }
    })
    const db = wx.cloud.database();  
    db.collection('index_swiper').get({
      success: res => {
        console.log(res.data)  
        this.setData({
          index_swiper: res.data,
          // act_time:res.data.activity_date
        })
      },
      fail:err=>{
        console.log(err)
      }
    })
  },

  onShareTimeline: function () {
    return {
      title: '赶紧来体验“科院最富朝气和科技感社团”的微信小程序吧！',
      imageUrl:'',
      query: '',
    }
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