// packageB//pages/epa_year/epa_year.js
import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['40%', '60%'],
      data: [{
        value: 7,
        name: '室内'
      }, {
        value: 4,
        name: '户外'
      }
      // }, {
      //   value: 10,
      //   name: '杭州'
      // }, {
      //   value: 20,
      //   name: '广州'
      // }, {
      //   value: 38,
      //   name: '上海'
      // }
    ]
    }]
  };

  chart.setOption(option);
  return chart;
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    },
		messarr: [{
				color: '#464af8',
				num: '20',
				flownum: '20',
			},
			{
				color: '#ff6262',
				num: '50',
				flownum: '50',
			},
			{
				color: '#f7c11b',
				num: '60',
				flownum: '60',
			},
			{
				color: '#ff8015',
				num: '80',
				flownum: '80',
			},
			{
				color: '#17d0bc',
				num: '20',
				flownum: '20',
			}
		]
	},
 
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {
    //   // 初始化
		// const ctx = wx.createCanvasContext('Canvas');
		// // 设置圆点 x  y   中心点
		// let number = {
		// 	x: 68,
		// 	y: 68
		// };
		// // 获取数据 各类项的个数
		// let term = this.data.messarr;
		// let termarr = [];
		// for (let t = 0; t < term.length; t++) {
		// 	// flownum
		// 	let thisterm = Number(term[t].flownum)
		// 	let thiscolor = term[t].color
		// 	termarr.push({
		// 		data: thisterm,
		// 		color: thiscolor
		// 	})
		// }
		// console.log(termarr)
		// // 设置总数
		// let sign = 0;
		// for (var s = 0; s < termarr.length; s++) {
		// 	sign += termarr[s].data
		// }
		// //设置半径 
		// let radius = 60;
		// for (var i = 0; i < termarr.length; i++) {
		// 	var start = 0;
		// 	// 开始绘制
		// 	ctx.beginPath()
		// 	if (i > 0) {
		// 		for (var j = 0; j < i; j++) {
		// 			start += termarr[j].data / sign * 2 * Math.PI
		// 		}
		// 	}
		// 	var end = start + termarr[i].data / sign * 2 * Math.PI
		// 	ctx.arc(number.x, number.y, radius, start, end);
		// 	ctx.setLineWidth(1);
		// 	ctx.lineTo(number.x, number.y);
		// 	ctx.setStrokeStyle('#fff');
		// 	ctx.setFillStyle(termarr[i].color);
		// 	ctx.fill();
		// 	ctx.closePath();
		// 	ctx.stroke();
		// }
		// ctx.draw()
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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