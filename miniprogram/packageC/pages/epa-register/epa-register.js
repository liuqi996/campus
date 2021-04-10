// pages/epa-register/epa-register.js
let app = getApp();
const db = wx.cloud.database();
const userListDB = db.collection('admin-test');
let name = null;
let password = null;
let phone = null;
let banji=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  inputName(evnet) {
    name = evnet.detail.value;
   },
   //输入密码
   inputPassword(evnet) {
    password = evnet.detail.value;
   },
   //输入手机号
   inputPhone(evnet) {
    phone = evnet.detail.value;
   },
   //输入地址
   inputBjclass(evnet) {
    banji = evnet.detail.value;
   },
  
   //注册
   register() {
    if(name==null){
      wx.showToast({
        title: '请填写您的姓名',
        duration: 2000
      })
  }
    else if(password==null){
    wx.showToast({
      title: '请填写您的密码',
      duration: 2000
    })
  }
  else if(phone==null){
    wx.showToast({
    title: '请填写您的手机号',
    duration: 2000
  })
  }
  else if(banji==null){
        wx.showToast({
        title: '请填写您的班级',
        duration: 2000,
        icon:'none'
      })
  }
  
  else{
    let that = this;
    /*if (!app.checkNamePassword(name, password)) {
     return;
    }
    if (!app.checkPhoneAddress(phone, address)) {
     return;
    }*/
    //查询用户是否已经注册
    userListDB.where({
     _openid: this.openid // 填入当前用户 openid
    }).get({
     success: function(res) {
      let userInfos = res.data;
      console.log(res.data)
      if (userInfos && userInfos.length > 0) {
       let user = userInfos[0];
       if (user && user.name) {
        wx.showModal({
         title: '提示',
         content: '亲，您已经注册账号了哦！',
         /*content: '您已注册，确定要更新账号密码吗？',
         success: function(res) {
          if (res.confirm) {
           console.log('用户点击确定')
           that.saveuserinfo();
          }
         }*/
        })
       }
      } else {
       that.saveuserinfo();
      }
     }
    })
  }
   },
  
   saveuserinfo() {
    //let that = this;
    let id = this.openid;
    //userListDB.doc('_openid').set({
    userListDB.doc(id).set({
     data: {
      name: name,
      password: password,
      phone: phone,
      banji: banji
     }
    }).then(res => {
      wx.showToast({
        title: '已提交申请！',
      })
    })
   },
  
    /**
     * 生命周期函数--监听页面加载
     */
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