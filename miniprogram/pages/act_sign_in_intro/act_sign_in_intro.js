// pages/act_sign_in_intro/act_sign_in_intro.js
var util = require('../../utils/time1.js')
var common = require('../../utils/time.js')
let randomLen=4
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false
  },

  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu; 
    this.util(currentStatu) 
  },
  
  util: function(currentStatu){ 
    /* 动画部分 */
    // 第1步：创建动画实例  
    var animation = wx.createAnimation({ 
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0
    }); 
        
    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation; 
      
    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step(); 
      
    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({ 
      animationData: animation.export() 
    }) 
        
    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () { 
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step(); 
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({ 
        animationData: animation 
      }) 
         
      //关闭 
      if (currentStatu == "close") { 
        this.setData({
          showModalStatus: false
        }); 
      }
    }.bind(this), 200) 
       
    // 显示 
    if (currentStatu == "open"){ 
      this.setData({ 
        showModalStatus: true
      });
    }
  },
  
  input(e){
    this.setData({
      yzmcode: e.detail.value
    })
    console.log(e.detail.value)
  },
  
  clear: function (){
    this.setData({
      yzmcode: ""
    })
  },
  
  //输入的value值
  searchinput:function(e){
    this.setData({
      yzmcode: e.detail.value
    })
  },

  yzcode:function(e){
    
    //var code=res.detail.value.yzmcode;
    var code = this.data.yzmcode;
    console.log("验证码",code)
    let nowDate= common.formatDate(new Date())
    this.setData({
      nowDate: common.formatDate(new Date())
    })
    //console.log(nowDate)
    // var xinDate = util.formatTime(new Date());
    // this.setData({
    //   xinDate: util.formatTime(new Date())
    // });
    // //console.log(xinDate)
    // var str = xinDate;
    // let ctime=str.replace(/[^0-9]/gi, "")
    // //console.log(str.replace(/[^0-9]/gi, ""));
    // var random_no = "";
    // for (var i = 0; i < randomLen; i++)
    // {
    //   random_no += Math.floor(Math.random() * 10);
    // }
    // random_no = ctime + "-" + random_no;
    let that=this;
    wx.cloud.database().collection('activity').where({
      // sign_in_code:'code'
      //sign_in_code:"code"
      sign_in_code:code
    }).get({
      success: function(res) {
       console.log(res.data)
      if(res.data.length==0){
        wx.showToast({
          title: '亲，你输入的验证码错误或未到签到时间',
          duration: 2000,
          icon:'none'
        })
      }
      else{
        
        /*console.log(res.data)
        //console.log(ress.data[0].act_id)
        this.setData({
          cc:res.data[0].act_id
        })
        console.log("1",this.data.cc)*/
        //let openids=this.openid
        db.collection("activity_sign_up").where({
          //activity_id:this.data.cc,
          activity_id:res.data[0].act_id,
          //_openid: openids
          // _openid:this.openid
          _openid:that.openid
          //opid:this.openid
        }).get({
          success: function(resss) {
        console.log(resss.data)
          
          db.collection("activity_sign_up").doc(resss.data[0]._id).update({
            data: {
              sign_in_state:"1",
              sign_in_time:nowDate,
            },
            success: res => {
              wx.showToast({
                title: '签到成功！',
              });
              //console.log(res.data)
              wx.navigateTo({
                url: '/pages/act_sign_in_result/act_sign_in_result?activity_name='+ resss.data[0].activity_name +'&act_id='+ resss.data[0].activity_id+'&name='+ resss.data[0].name+'&bjclass='+ resss.data[0].bjclass+'&time='+nowDate,
              })
              // this.powerDrawer(e)
            },
            fail: err => {
              wx.showToast({
                title: '签到失败，请刷新重试！',
              })
            }
          })
        }
      })
      }
    }
    })
    
    // const db = wx.cloud.database();
   
    
  },

  scanCode:function(){
    let that=this
    wx.scanCode({
      success (res) {
        console.log(res)
        that.setData({
          message:res.path,
          rawdata:res.rawData
        })
      }
    })
  },


  /*
  yzcode:function(e){
    //var code=res.detail.value.yzmcode;
    var code = this.data.yzmcode;
    console.log("验证码",code)
    let nowDate= common.formatDate(new Date())
    this.setData({
      nowDate: common.formatDate(new Date())
    })
    //console.log(nowDate)
    // var xinDate = util.formatTime(new Date());
    // this.setData({
    //   xinDate: util.formatTime(new Date())
    // });
    // //console.log(xinDate)
    // var str = xinDate;
    // let ctime=str.replace(/[^0-9]/gi, "")
    // //console.log(str.replace(/[^0-9]/gi, ""));
    // var random_no = "";
    // for (var i = 0; i < randomLen; i++)
    // {
    //   random_no += Math.floor(Math.random() * 10);
    // }
    // random_no = ctime + "-" + random_no;
    
    wx.cloud.database().collection('activity').where({
      // sign_in_code:'code'
      sign_in_code:"code"
    }).get().then(ress => {
      if(ress.data.length==0){
        wx.showToast({
          title: '亲，你输入的验证码错误或未到签到时间',
          duration: 2000,
          icon:'none'
        })
      }
      else{
        console.log(ress.data)
        //console.log(ress.data[0].act_id)
        this.setData({
          cc:ress.data[0].act_id
        })
        console.log("1",this.data.cc)
      }
    })
    
    // const db = wx.cloud.database();
    db.collection("activity_sign_up").where({
      activity_id:this.data.cc,
      _openid:this.openid
    }).get().then(resss => {
      console.log("2",resss.data)
      //console.log(resss.data[0]._id)
      
      db.collection("activity_sign_up").doc(resss.data[0]._id).update({
        data: {
          sign_in_state:"1",
          sign_in_time:nowDate,
        },
        success: res => {
          wx.showToast({
            title: '签到成功！',
          });
          //console.log(res.data)
          wx.navigateTo({
            url: '/pages/act_sign_in_result/act_sign_in_result?activity_name='+ resss.data[0].activity_name +'&act_id='+ resss.data[0].activity_id+'&name='+ resss.data[0].name+'&bjclass='+ resss.data[0].bjclass+'&time='+nowDate,
          })
          // this.powerDrawer(e)
        },
        fail: err => {
          wx.showToast({
            title: '签到失败，请刷新重试！',
          })
        }
      })
    })
  },*/
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    console.log(this.openid = await getApp().getCloudOpenid());
    this.setData({
      openid:this.openid
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