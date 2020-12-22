// pages/epa-admin-initiate/epa-admin-initiate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onGetQrcode: function() {
    let that = this;
    // 调用云函数
    wx.cloud.callFunction({
      name: 'qrcode',
      data: {
        //page:'pages/garbage/garbage',
        page:'pages/qrcode_sign_in/qrcode_sign_in',
        //page:'pages/epa-admin-initiate/epa-admin-initiate',
        //page:'pages/index/index',
        //scene:'id=this.data.activity_id'
        //id=
        scene:that.data.activity_id
      },
      success: res => {
        //console.log('[云函数] [qrcode]: ', res)
        wx.showLoading({
          title: '正在生成签到码',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
        wx.previewImage({
          urls: [res.result.fileID],
      })
      },
      fail: err => {
        console.error('[云函数] [qrcode] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      activity_id:options.id
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