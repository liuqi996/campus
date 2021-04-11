// pages/act_bm_list/act_bm_list.js
var util = require('../../utils/bm_list_time.js')
// var util = require('../../utils/time1.js')
var common = require('../../utils/time.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    to: null,
    list: [],
    list_nums:0,
    fu:0,
    searchvalue:'' ,
  },

  more: function () {
    console.log("调用more事件")
    //var that = this
    //let key = that.data.searchvalue;
    const db = wx.cloud.database();
    const _ = db.command
    wx.showLoading({
      title: '正在刷新中…',
      duration: 500
    })
    let x = this.data.list_nums + 20
    console.log(x)
    let old_data = this.data.list
    
    db.collection('activity').skip(x).orderBy('activity_date', 'desc').orderBy('start_time', 'asc')
       // 限制返回数量为 20 条
      .get()
      .then(res => {
        if(res.data==null || res.data==0 || res.data==" "){
          console.log("为空")
          this.setData({
            fu:1
          })
        }
        else{
        this.setData({
          list: old_data.concat(res.data),
          list_nums: x
        })
          console.log(res.data)}
      })
      .catch(err => {
        console.error(err)
      })
    console.log('circle 下一页');
  },

  signup:function(e){
    let activity_name = e.currentTarget.dataset.activity_name;
    let act_id = e.currentTarget.dataset.act_id;
    let id=e.currentTarget.dataset.id;
    console.log(activity_name)
    console.log(act_id)
    wx.navigateTo({
      url: '/pages/act_detail/act_detail?name='+ activity_name +'&act_id='+ act_id + '&id='+ id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();  
    db.collection('activity').orderBy('activity_date', 'desc').orderBy('start_time', 'asc').get({
      success: res => {
        console.log(res.data)  
        this.setData({
          list: res.data,
          // act_time:res.data.activity_date
        })
      },
      fail:err=>{
        console.log(err)
      }
    })
    var xinDate = util.formatTime(new Date()).substr(0,10);
    var kktime=xinDate;
    console.log(kktime)
    this.setData({
      kktime:kktime
    })
    this.setData({
      to: new Date().getTime(),
      ntime:new Date().getTime(),
    })
    console.log(new Date().getTime(),)
    console.log(this.data.ntime)
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