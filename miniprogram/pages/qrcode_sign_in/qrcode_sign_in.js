// pages/qrcode_sign_in/qrcode_sign_in.js
var common = require('../../utils/time.js')
const db = wx.cloud.database();
let app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log(this.openid = await getApp().getCloudOpenid());
    this.setData({
      openid:this.openid
    })
    const scene = decodeURIComponent(options.scene)
    console.log(scene)
    this.setData({
      scene:scene,
      activity_id:scene
    })
    let that=this;
    db.collection('activity').where({
      act_id: this.data.activity_id
    })
    .get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          message:res.data
        })
      }
    })
  },
  qiandao:function(){
    var code = this.data.yzmcode;
    let nowDate= common.formatDate(new Date())
    this.setData({
      nowDate: common.formatDate(new Date())
    })
    let id=this.data.activity_id;
    let that=this;
    db.collection("activity_sign_up").where({
      activity_id:that.data.activity_id,
      _openid:that.openid
    }).get({
      success: function(res) {
    console.log(res.data)
  db.collection("activity_sign_up").doc(res.data[0]._id).update({
    data: {
      sign_in_state:"1",
      sign_in_time:nowDate,
    },
    success: res => {
      wx.showToast({
        title: '签到成功！',
      });
      wx.navigateTo({
      url: '/pages/act_sign_in_result/act_sign_in_result?activity_name='+ that.data.message[0].activity_name +'&act_id='+ that.data.activity_id +'&time='+nowDate,
       })
    },
    fail: err => {
      wx.showToast({
        title: '签到失败，请刷新重试！',
      })
    }
  })
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

  }

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})