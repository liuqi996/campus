// pages/search/search.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    lists: [],
    lists_nums:0,
    fu:0,
    searchvalue:'' ,
  },
  
  searchinput:function(e){
    this.setData({
      searchvalue: e.detail.value
    })
  },
  bindchange(e) {
    this.setData({
      swiperIdx: e.detail.current
    })
  },
  input(e) {
    this.setData({
      searchvalue: e.detail.value
    })
    console.log(e.detail.value)
  },
  clear: function () {
    this.setData({
      searchvalue: ""
    })
  },
  search:function () {
    console.log("调用ssearch事件")
    this.setData({
      lists_nums:0,
       fu:0,
    })
    wx: wx.showLoading({
      title: '努力查找中...',
      mask: true,
    })
    setTimeout(function(){
      wx.hideLoading()
    },500)
    this.setData({'lists':[]})
       var that = this
       let key = that.data.searchvalue;
       console.log("查询的内容", key)
       const db = wx.cloud.database();
       const _ = db.command
       db.collection('garbage').where(_.or([{
         name: db.RegExp({
           regexp: '.*' + key,
           options: 'i',
         })
       },
       {
         kind: db.RegExp({
           regexp: '.*' + key,
           options: 'i',
         })
       },
       ])).get({
         success: res => {
           console.log(res)
           that.setData({
             lists: res.data
           })
         },
         fail: err => {
           console.log(err)
         }
       })
     },
     
     more: function () {
      console.log("调用more事件")
      var that = this
      let key = that.data.searchvalue;
      const db = wx.cloud.database();
      const _ = db.command
      wx.showLoading({
        title: '正在刷新中…',
        duration: 500
      })
      let x = this.data.lists_nums + 20
      console.log(x)
      let old_data = this.data.lists
      
      db.collection('garbage').skip(x)
        .where(_.or([{
          name: db.RegExp({
            regexp: '.*' + key,
            options: 'i',
          })
        },
        {
         kind: db.RegExp({
           regexp: '.*' + key,
           options: 'i',
         })
       },
        ])).orderBy('name', 'asc')
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
            lists: old_data.concat(res.data),
            lists_nums: x
          })
            console.log(res.data)}
        })
        .catch(err => {
          console.error(err)
        })
      console.log('circle 下一页');
    },

    detail:function(e){
      let name = e.currentTarget.dataset.name;
      let kind = e.currentTarget.dataset.kind;
      let property = e.currentTarget.dataset.property;
      wx.navigateTo({
        url: "../garbagedetail/garbagedetail?name=" + name + '&kind=' + kind + '&property=' + property
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loadModal: true
    })
    setTimeout(()=> {
      this.setData({
        loadModal: false
      })
    }, 500)
    let searchvalue = options.searchvalue;
    this.sousuo(options)
  },

  sousuo:function(options){
    let searchvalue = options.searchvalue;
        this.setData({
          searchvalue:searchvalue
        })
         var that = this
         let key = that.data.searchvalue;
         console.log("查询的内容", key)
         const db = wx.cloud.database();
         const _ = db.command
         db.collection('garbage').where(_.or([{
           name: db.RegExp({
             regexp: '.*' + key,
             options: 'i',
           })
         },
         {
          kind: db.RegExp({
            regexp: '.*' + key,
            options: 'i',
          })
        },
         ])).get({
           success: res => {
             console.log(res)
             that.setData({
               lists: res.data
             })
           },
           fail: err => {
             console.log(err)
           }
         })
         console.log(searchvalue)
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