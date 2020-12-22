const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const  checkAuthSetting = scope =>{
  wx.getSetting({
    success(res) {
      if (!res.authSetting[scope]) {
        return false;
      }else{
        return true;
      }
    }
  })
};

const checkForUpdate = result =>{
  const updateManager = wx.getUpdateManager();
  updateManager.onCheckForUpdate(function (res) {
    if (res.hasUpdate){
      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          }
        })
      })
      updateManager.onUpdateFailed(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经上线，请您删除当前小程序，重新搜索打开哟~'
        })
      })
     }
  })
}

module.exports = {
  formatTime: formatTime,
  formatDate:this.formatDate,
  checkAuthSetting: checkAuthSetting,
  checkForUpdate: checkForUpdate
}
