// pages/epa-admin-sign-up-data/epa-admin-sign-up-data.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    th:[
      "序号","姓名","性别","学院班级","联系方式","报名时间","报名编号"
    ],
    list: [],
    list_nums:0,
    fu:0,
    searchvalue:'' ,
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

  phone:function(e){
    let tel=e.currentTarget.dataset.phone;
    let phone=tel.toString()
    wx.makePhoneCall({
      phoneNumber: phone
    })
    // let phone = e.currentTarget.dataset.phone;
    // wx.makePhoneCall({
    //   phoneNumber: Number(phone) //仅为示例，并非真实的电话号码
    // })
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
    
    db.collection('activity_sign_up').skip(x).orderBy('signuptime', 'asc')
       // 限制返回数量为 20 条
      .get()
      .then(res => {
        if(res.data==null || res.data==0 || res.data==" "){
          console.log("为空")
          // this.setData({
          //   fu:1
          // })
          this.setData({
            fu:2
          })
        }
        else{
        // this.setData({
        //   list: old_data.concat(res.data),
        //   list_nums: x
        // })
        // if(res.data.length<=20){
          if(res.data.length<20){
          this.setData({
            list: old_data.concat(res.data),
            list_nums: x,
            fu:1
          })
        }
        else{
          this.setData({
            list: old_data.concat(res.data),
            list_nums: x
          })
        }
          console.log(res.data)}
      })
      .catch(err => {
        console.error(err)
      })
    console.log('circle 下一页');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let activity_id=options.id;
    let activity_name=options.activity_name;
    const db = wx.cloud.database();
    db.collection('activity_sign_up').where({
      activity_id:activity_id
    }).orderBy('signuptime', 'asc').get({
      success: res => {
        console.log(res.data)  
        this.setData({
          list: res.data,
        })
        // if(list.length<=20){
        //   this.setData({
        //     fu:1
        //   })
        // }
      },
      fail:err=>{
        console.log(err)
      }
    })
    this.setData({
      activity_name:activity_name
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
      title: this.data.activity_name+"报名数据"
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