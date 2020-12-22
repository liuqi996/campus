// pages/act_detail/act_detail.js
var util = require('../../utils/time1.js')
var common = require('../../utils/time.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  signup:function(e){
    let activity_name = e.currentTarget.dataset.activity_name;
    let act_id = e.currentTarget.dataset.act_id;
    let acttime=e.currentTarget.dataset.acttime;
    console.log(activity_name)
    console.log(act_id)
    wx.navigateTo({
      url: '/pages/act_sign_up/act_sign_up?name='+ activity_name +'&act_id='+ act_id +'&acttime='+ acttime,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //'id'
  onLoad: function (options) {
    let that=this;
    let id=options.id;
    var db=wx.cloud.database();
    db.collection('activity').where({
      _id: id
    })
    .get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          list:res.data
        })
      }
    })
    var xinDate = util.formatTime(new Date()).substr(0,10);
    var kktime=xinDate;
    this.setData({
      kktime:kktime
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