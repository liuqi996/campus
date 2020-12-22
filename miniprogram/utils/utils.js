import qrcode from './qrcode';
import barcode from './barcode';
 
// 插件内部是根据width, height参数的rpx值来进行绘画
// 把数字转换成条形码
function toBarcode (canvasId, code, width, height) {
    barcode.code128(wx.createCanvasContext(canvasId), code, width, height);
}
 
// 把数字转换成二维码
function toQrcode (canvasId, code, width, height) {
    qrcode.api.draw(code, {
        ctx: wx.createCanvasContext(canvasId),
        width,
        height
    })
}
 
export {
    toBarcode,
    toQrcode
}