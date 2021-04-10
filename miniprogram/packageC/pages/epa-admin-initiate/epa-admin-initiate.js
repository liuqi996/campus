// pages/epa-admin-initiate/epa-admin-initiate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onGetQrcode: function() {
    let that = this;
    wx.showModal({
      title: '确定开始签到吗？',
      mask:true,
      content: '您确定现在生成签到码吗？建议不要重复生成同一活动的签到码！',
      success(res) {
        if (res.confirm) {
          console.log('用户点确定了')
          // 调用云函数
          wx.cloud.callFunction({
            name: 'qrcode',
            data: {
              page:'pages/qrcode_sign_in/qrcode_sign_in',
              scene:that.data.activity_id
            },
            success: res => {
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
            }
          })
        }
        else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    /*
    let that = this;
    // 调用云函数
    wx.cloud.callFunction({
      name: 'qrcode',
      data: {
        page:'pages/qrcode_sign_in/qrcode_sign_in',
        scene:that.data.activity_id
      },
      success: res => {
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
      }
    })
    */
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