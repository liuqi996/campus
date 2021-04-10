// pages/kinddetal/kinddetail.js
// 在页面中定义插屏广告
let interstitialAd = null
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    khsw:["轻投轻放","清洁干燥，避免污染","废纸尽量平整","有尖锐边角的应包裹后投放","立体包装物请清空内容物，清洁后压扁投放"],
    khswlist:[
      {title:"玻璃",kind:"平板玻璃、玻璃牛奶瓶、酒瓶、玻璃调味瓶、玻璃杯"},
      {title:"金属",kind:"易拉罐、刀具、剪刀、金属容器、水龙头、螺丝、钥匙、金属瓶盖、金属厨具"},
      {title:"塑料",kind:"塑料桶、塑料盒、塑料玩具、塑料托盘、沐浴露瓶、塑料饮料瓶"},
      {title:"纸类",kind:"报纸、杂志、广告纸、牛奶盒、旧书、纸箱"},
      {title:"家具",kind:"床垫、衣柜、沙发"},
      {title:"织物",kind:"衣服、背包、书包、床上用品"},
      {title:"电器电子产品",kind:"电视机、手机、洗衣机、冰箱"}
    ],
    cylj:["厨余垃圾应从产生时就与其他品类垃圾分开，投放前沥干水分","保证厨余垃圾分出质量，做到“无玻璃陶瓷、无金属、无塑料橡胶”等其他杂物","有包装物的过期的食品应将包装物去除后分类投放，包装物请投放到对应的可回收物或者其他垃圾收集容器"],
    cyljlist:[
      {title:"剩菜剩饭",},
      {title:"蛋壳"},
      {title:"菜帮菜叶"},
      {title:"茶渣"},
      {title:"果皮"}
    ],
    yhlj:["应保证器物完整，避免二次污染","如有残留请密闭后投放","投放时请注意轻放","易破损的请连带包装或包裹投放","如易挥发，请密闭后投放"],
    yhljlist:[
      {title:"电池",kind:"干电池、充电式电池、纽扣电池"},
      {title:"灯管",kind:"单端紧凑型节能荧光灯、直管、环形荧光灯"},
      {title:"家用化学品",kind:"化妆品、软膏、水银温度计、油漆桶、药丸、片剂"}
    ],
    other:["沥干水分后投放"],
    otherlist:[
      {title:"卫生纸"},
      {title:"饮料杯"},
      {title:"塑料袋"},
      {title:"纸尿裤"},
      {title:"污染纸张"},
      {title:"餐盒"},
      {title:"大棒骨"},
      {title:"陶瓷碎片"}
    ],

    basicsList: [{
      icon: 'usefullfill',
      name: '开始'
    }, {
      icon: 'radioboxfill',
      name: '等待'
    }, {
      icon: 'roundclosefill',
      name: '错误'
    }, {
      icon: 'roundcheckfill',
      name: '完成'
    }, ],
    basics: 0,
    khswnumList: [{
      name: '可回收物收集容器'
    }, {
      name: '社区暂存点'
    }, {
      name: '专用车辆运输'
    }, {
      name:'分拣中心'
    }, {
      name: '各类再生资源处理设施'
    }, ],
    cyljnumList: [{
      name: '厨余垃圾收集容器'
    }, {
      name: '小型垃圾运输车'
    }, {
      name: '垃圾楼或暂存点'
    }, {
      name:'专用车辆运输'
    }, {
      name: '生化处理设施'
    }, ],
    yhljnumList: [{
      name: '有害垃圾收集容器'
    }, {
      name: '社区暂存点'
    }, {
      name: '专用车辆运输'
    }, {
      name: '各类危废处理设施'
    }, ],
    othernumList: [{
      name: '其他垃圾收集容器'
    }, {
      name: '小型垃圾运输车'
    }, {
      name: '垃圾楼'
    }, {
      name:'专用车辆运输'
    }, {
      name: '焚烧处理设施、卫生填埋场'
    }, ],
    num: 0,
    scroll: 0
  },
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
  basicsSteps() {
    this.setData({
      basics: this.data.basics == this.data.basicsList.length - 1 ? 0 : this.data.basics + 1
    })
  },
  khswnumSteps() {
    this.setData({
      num: this.data.num == this.data.khswnumList.length - 1 ? 0 : this.data.num + 1
    })
  },
  cyljnumSteps() {
    this.setData({
      num: this.data.num == this.data.cyljnumList.length - 1 ? 0 : this.data.num + 1
    })
  },
  yhljnumSteps() {
    this.setData({
      num: this.data.num == this.data.yhljnumList.length - 1 ? 0 : this.data.num + 1
    })
  },
  othernumSteps() {
    this.setData({
      num: this.data.num == this.data.othernumList.length - 1 ? 0 : this.data.num + 1
    })
  },
  scrollSteps() {
    this.setData({
      scroll: this.data.scroll == 9 ? 0 : this.data.scroll + 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.kind)
    this.setData({
      kind:options.kind
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
      title: this.data.kind
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