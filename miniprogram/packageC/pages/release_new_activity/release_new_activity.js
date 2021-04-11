// packageC//pages/release_new_activity/release_new_activity.js
var util = require('../../../utils/time2.js')
var common = require('../../../utils/time_ch.js')
let ymd = require('../../../utils/ymd.js')
let randomLen=5
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowDate:'',
    xinDate:'',
    date:'',
    problem_kind:"",
    multiIndex: [0, 0, 0],
    activity_date: '2021-04-11',
    activity_start_time: '09:30',
    // problem_kind:"新增功能",
    activity_object_list: [
      {name: '湖南科技学院全体师生', checked: 'true'},
      {name: '绿色潇湘环保协会会员'},
    ],
    activity_type_list:[
      {name: '室外', checked: 'true'},
      {name: '室内'},
    ],
    form_kind:[
      {name:"线路错误反馈"},
      {name:"程序开发建议"},
      {name:"其他问题"}
    ],
    height: 20,
    TabCur: 0,
    scrollLeft:0,
    array: ['[选择地区]','衡阳市', '城际','南岳区','衡阳县', '衡南县', '衡山县','衡东县','祁东县','常宁市','耒阳市'],
    objectArray: [
      {
        id: 0,
        name: '衡阳市'
      },
      {
        id: 1,
        name: '城际'
      },
      {
        id: 2,
        name: '南岳区'
      },
      {
        id: 3,
        name: '衡阳县'
      },
      {
        id: 4,
        name: '衡南县'
      },
      {
        id: 5,
        name: '衡山县'
      },
      {
        id: 6,
        name: '衡东县'
      },
      {
        id: 7,
        name: '祁东县'
      },
      {
        id: 8,
        name: '常宁市'
      },
      {
        id: 9,
        name: '耒阳市'
      }
    ],
    index: 0,
  },

  type_radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      type:e.detail.value
    })
  },

  obiect_radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      activity_object:e.detail.value
    })
  },

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      activity_date: e.detail.value
    })
  },

  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      // activity_time: e.detail.value
      activity_start_time:e.detail.value
    })
  },

  formSubmit(e) {
    let that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    //console.log(e.detail.value.line_advice)

    // if(e.detail.value.county=="[选择地区]"){
    //   wx.showToast({
    //     title: '请选择线路所属地区',
    //     duration: 2000,
    //     icon:'none'
    //   })
    // }
    // else if(e.detail.value.line_number==""){
    //   wx.showToast({
    //     title: '请填写有错误的线路号',
    //     duration: 2000,
    //     icon:'none'
    //   })
    // }
    // else if(e.detail.value.line_advice==""){
    //   wx.showToast({
    //     title: '请填写错误描述',
    //     duration: 2000,
    //     icon:'none'
    //   })
    // }
    // else{
      var line_submit_ymd_date = ymd.formatTime(new Date());
      //var line_str = line_ymd_date;
      // let line_cymd=line_str.replace(/[^0-9]/gi, "")
      let new_line_submit_ymd_date=line_submit_ymd_date.replace(/[^0-9]/gi, "")
      console.log("年月日数字",line_submit_ymd_date.replace(/[^0-9]/gi, ""));

      var line_submit_five_number = "";
      var new_line_submit_five_number = "";
      for (var i = 0; i < randomLen; i++)
      {
        line_submit_five_number += Math.floor(Math.random() * 10);
      }
      console.log(line_submit_five_number)
      new_line_submit_five_number = new_line_submit_ymd_date + "-" + line_submit_five_number;
      console.log("年月日数字+5位数",new_line_submit_five_number)
      this.setData({
        submit_time: util.formatTime(new Date())
      });
      let activity_name = e.detail.value.activity_name;
      let activity_place=e.detail.value.activity_place;
      let sponsor=e.detail.value.sponsor;
      let co_organizer=e.detail.value.co_organizer;
      let activity_detail=e.detail.value.activity_detail;
      //let county=e.detail.value.county;
      //var line_number = e.detail.value.line_number;
      //var line_advice = e.detail.value.line_advice;
      var advice_number=that.data.no4;
      const db = wx.cloud.database();
      db.collection("activity").add({
        data:{
          type:that.data.type,
          activity_name:activity_name,
          activity_date:that.data.activity_date,
          // activity_time:that.data.activity_time,
          activity_start_time:that.data.activity_start_time,
          activity_place:activity_place,
          activity_object:that.data.activity_object,
          sponsor:sponsor,
          co_organizer:co_organizer,
          activity_detail:activity_detail,
          act_id:advice_number
          // _id:advice_number,
          // county:county,
          // line_number:line_number,
          // line_advice:line_advice,
          // ad_number:advice_number,
          // submit_number:new_line_submit_five_number,
          // open_time:that.data.full_time,
          // submit_time:that.data.submit_time
        }
      }).then(res=>{
        console.log('提交成功！感谢您的支持！',res)
        wx.showLoading({
          title: '正在创建新活动',
          //duration:2000
        })
        setTimeout(() => {
          wx.hideLoading({
            success: (res) => {
              wx.showToast({
                title: '活动创建成功！',
                icon: 'success',
                duration: 3000
              })
            },
          })
        }, 1500);
        setTimeout(() => {
          that.onShow()
          setTimeout(() => {
            that.clear()
          }, 1000);
        }, 2000);
        // that.clear()
      })
    //}
  },

  clear:function(){
    this.setData({
      type:"",
      activity_name:"",
      activity_date:"2021-04-11",
      activity_time:"09:30",
      activity_place:"",
      activity_object:"",
      sponsor:"",
      co_organizer:"",
      activity_detail:"",
    })
    console.log("重置表单")
  },

  formReset(e) {
    //console.log('form发生了reset事件，携带数据为：', e.detail.value)
    //this.setData({
      //index: 0
    //})
  },

  bindPickerChange: function(e) {
    console.log('picker地区发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindButtonTap: function() {
    this.setData({
      focus: true
    })
  },
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
  },

  upImg(){
    var xinDate = util.formatTime(new Date());
    this.setData({
      xinDate: util.formatTime(new Date())
    });
    var str = xinDate;
    let ctime=str.replace(/[^0-9]/gi, "")
    console.log(str.replace(/[^0-9]/gi, ""));
    
    //random_no = ctime + "-" + random_no;
    let nowDate= common.formatDate(new Date())
    this.setData({
      nowDate: common.formatDate(new Date())
    });
    var that = this;
    wx.chooseImage({
      count: 1,
      success(res){
        console.log(res);
        wx.cloud.uploadFile({
          cloudPath:'test/' + that.data.no4+'/'+ctime+'.jpg',
          // cloudPath:'test/' + Math.floor(Math.random()*1000000)+'.jpg',
          filePath:res.tempFilePaths[0],
          success(res){
            console.log("成功并打印flieId",res);
          }
        })
      }
    })
  },

  chooseImage: function () { 
    var that = this; 
    console.log('aaaaaaaaaaaaaaaaaaaa')
    wx.cloud.uploadFile({
      cloudPath:'test/'+ Math.floor(Math.random()*1000000),
      filePath:res.tempFilePaths[0],
      success(res){
        console.log("成功",res);
      }
    })
  },

  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({ 
    current: current, 
    urls: this.data.imageList 
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var ymd_date = ymd.formatTime(new Date());
    // this.setData({
    //   ymd_date: util.formatTime(new Date())
    // });
    var str1 = ymd_date;
    let cymd=str1.replace(/[^0-9]/gi, "")
    console.log("年月日数字",str1.replace(/[^0-9]/gi, ""));
    var no4 = "";
    for (var i = 0; i < randomLen; i++)
    {
      no4 += Math.floor(Math.random() * 10);
    }
    no4 = cymd + "-" + no4;
    console.log("年月日数字+5位数",no4)
    this.setData({
      no4:no4,
      full_time: util.formatTime(new Date())
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