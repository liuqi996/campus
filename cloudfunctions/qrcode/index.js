// 云函数入口文件
// const cloud = require('wx-server-sdk')

// cloud.init()

// // 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }

const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.wxacode.getUnlimited({
      //scene: event.userInfo.openId,
      // path:'pages/act_bm_list/act_bm_list',
      //page:'pages/act_bm_list/act_bm_list',
      scene:event.scene,
      //scene:"a=1",
      page:event.page,
      autoColor:true
      // isHyaline:true
    })
    console.log(result)


    return await cloud.uploadFile({
      //cloudPath: 'qrcode/' + event.userInfo.openId +'.png',
      cloudPath: 'qrcode/' + event.scene + '签到小程序码'+event.userInfo.openId+'.png',
      fileContent: result.buffer, //二进制数据
      success: res => {
        // 返回文件 ID
        console.log(res.fileID)
      },
      fail: console.error
    })
    
  } catch (err) {
    console.log(err)
    return err
  }
}