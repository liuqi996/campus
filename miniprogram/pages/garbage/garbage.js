// pages/garbage/garbage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ColorList: app.globalData.ColorList,
    garbagelist:[
      {title:"厨余垃圾", name: 'green',color: '#39b54a'},
      {title:"可回收物", name: 'blue',color: '#0081ff'},
      {title:"有害垃圾",name: 'red',color: '#e54d42'},
      {title:"其他垃圾",name: 'grey',color: '#8799a3'}
    ],
    searchvalue:'' ,
  },

  input(e) {
    this.setData({
      searchvalue: e.detail.value
    })
    console.log(e.detail.value)
  },

  bindchange: function(e) {
    console.log(e.detail.value);
    this.setData({
      searchvalue: e.detail.value
    })
  },
  
  search:function(){
    wx.navigateTo({
      url: '../garbagesearch/garbagesearch?searchvalue=' +this.data.searchvalue,
    })
  },

  kindsearch:function(e){
    let searchvalue=e.currentTarget.dataset.kind;
    //console.log(searchvalue)
    wx.navigateTo({
      url: '../garbagesearch/garbagesearch?searchvalue=' +searchvalue,
    })
  },

  detail:function(e){
    let kind=e.currentTarget.dataset.kind
    console.log(kind)
    wx.navigateTo({
      url: "/pages/kinddetail/kinddetail?kind=" + kind
    })
  },

  resume:function(){
    wx.navigateTo({
      url: '/pages/resume/resume',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      menus: ['shareAppMessagewx', 'shareTimeline'],
      withShareTicket:true
    });
  },

  onShareTimeline: function () {
    return {
        title: '赶紧来体验“垃圾分类知识”小程序吧！',
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