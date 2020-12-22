// pages/epa-login/epa-login.js
let app = getApp();
const db = wx.cloud.database();
const userListDB = db.collection('admin_user');

let name = null;
let password = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //输入用户名
  inputName(evnet) {
  console.log(evnet.detail.value)
  name = evnet.detail.value;
},
 //输入密码
 inputPassword(evnet) {
  password = evnet.detail.value;
 },

 //登陆
 login() {
  let that = this;
  userListDB.where({
   _openid: this.openid
  }).get({
   success: function(res) {
    let userInfos = res.data;
    console.log(res.data)
    if (userInfos && userInfos.length > 0) {
     let user = userInfos[0];
     //if (user.name !== name) {
    if (user.phone !== name) {
      wx.showToast({
        title: '用户名为空或不匹配！',
        icon:"none"
      })
     } else if (user.password !== password) {
      wx.showToast({
        title: '密码为空或不匹配！',
        icon:"none"
      })
     } else {
       wx.showToast({
         title: '登录成功！',
       })
       wx.navigateTo({
         url: '/pages/epa-cantrol/epa-cantrol',
       })
     }
    } else {
     wx.showToast({
       title: '小可爱，不要调皮哦！你不是管理员呢！',
       icon:"none"
      })
    }
   }
  })
 },

 register:function(e){
   wx.navigateTo({
     url: '/pages/epa-register/epa-register',
   })
 },

  onLoad: async function () {
    console.log(this.openid = await getApp().getCloudOpenid());
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