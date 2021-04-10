// pages/appraise_detail/appraise_detail.js
var util = require('../../utils/time1.js')
var common = require('../../utils/time.js')
let randomLen=4
Page({

  /**
   * 页面的初始数据
   */
  data: {

    items: [{
      id: '001',
      text: 'Face',
      value: 1,
  },
  {
      id: '002',
      text: 'Eye',
      value: 2,
  }],
  slider: 0,
  value: 3,
},
sliderChange(e) {
  this.setData({
      slider: e.detail.value,
  })
},

  onChange(e) {
    this.setData({
      value: e.detail.value,
    })
    console.log(e)
    console.log(e.detail.value)
    console.log(this.data.value)
    this.setData({
      star:this.data.value
    })
  },

  formSubmit:function(res){
    let appraise_text=res.detail.value.pji;
    let nowDate= common.formatDate(new Date())
    this.setData({
      nowDate: common.formatDate(new Date())
    })
    var xinDate = util.formatTime(new Date());
    this.setData({
      xinDate: util.formatTime(new Date())
    });
    var str = xinDate;
    let ctime=str.replace(/[^0-9]/gi, "")
    console.log(str.replace(/[^0-9]/gi, ""));
    var random_no = "";
    for (var i = 0; i < randomLen; i++)
    {
      random_no += Math.floor(Math.random() * 10);
    }
    random_no = ctime + "-" + random_no;

    wx.cloud.database().collection("activity_sign_up").doc(this.data.id).update({
      //db.collection("order").doc(orderid).update({
        data: {
          appraise_text:appraise_text,
          appraise_state:"1",
          appraise_time:nowDate,
          appraise_star:this.data.star
        },success: res => {
          wx.showToast({
            title: '评价成功！',
          });
        }
      })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      activity_name:options.activity_name,
      id:options.id
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
    wx.setNavigationBarTitle({
      title: this.data.activity_name+"活动评价"
    })
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