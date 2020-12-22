// pages/appraise/appraise.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    grade:[
      {name:"我报名的"},
      {name:"我评价的"},
      {name:"未评价的"},
      // {name:"大四"}
    ],
    TabCur: 1,
    scrollLeft:0
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
    console.log(this.data.TabCur)
  },

  swiperChange: function (e) {
    console.log(e);
    this.setData({
      TabCur: e.detail.current,
    })
    console.log(this.data.TabCur)

    // if (this.data.TabCur===1){
    //   wx.cloud.database().collection('activity_sign_up').where({
    //     _openid:this.openid,
    //     appraise_state:"1"
    //   }).get().then(ress => {
    //     this.setData({
    //       list2:ress.data
    //     })
    //   })
    // }
    // else if (this.data.TabCur===0){
    //   wx.cloud.database().collection('activity_sign_up').where({
    //     _openid:this.openid
    //   }).get().then(ress => {
    //     this.setData({
    //       list1:ress.data
    //     })
    //   })
    // }
    // else{
    //   wx.cloud.database().collection('activity_sign_up').where({
    //     _openid:this.openid,
    //     appraise_state:"0"
    //   }).get().then(ress => {
    //     this.setData({
    //       list3:ress.data
    //     })
    //   })
    // }
   
  },

  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
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

  pj:function(e){
    let activity_name = e.currentTarget.dataset.name;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:'/pages/appraise_detail/appraise_detail?activity_name='+ activity_name +'&id='+ id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log(this.openid = await getApp().getCloudOpenid());
    wx.cloud.database().collection('activity_sign_up').where({
      _openid:this.openid,
    }).get().then(ress => {
      this.setData({
        list1:ress.data
      })
    })
    wx.cloud.database().collection('activity_sign_up').where({
      _openid:this.openid,
      appraise_state:"1"
    }).get().then(ress => {
      this.setData({
        list2:ress.data
      })
    })
    wx.cloud.database().collection('activity_sign_up').where({
      _openid:this.openid,
      appraise_state:"0"
    }).get().then(ress => {
      this.setData({
        list3:ress.data
      })
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

  }
})