// index.ts
// 获取应用实例
var app = getApp();
Page({
    onLoad: function () {
    },
    data: {
        img1src: '',
        img2src: '',
        img3src: '',
        img4src: '',
        img5src: ''
    },
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        var that = this;
        wx.showLoading({
            title: '下载中...',
            mask: true
        });
        setTimeout(function () {
            wx.canvasToTempFilePath({
                canvas: 'myCanvas',
                canvasId: 'myCanvas',
                quality: 1,
                success: function (res) {
                    console.log("合成的带有小程序码的图片success》》》", res);
                    var tempFilePath = res.tempFilePath;
                    // 保存到相册
                    wx.saveImageToPhotosAlbum({
                        filePath: tempFilePath,
                        success: function () {
                            wx.hideLoading();
                            wx.showModal({
                                title: '温馨提示',
                                content: '图片保存成功，可在相册中查看',
                                showCancel: false
                            });
                        },
                        fail: function (error) {
                            wx.showModal({
                                title: '温馨提示',
                                content: "\u56FE\u7247\u4FDD\u5B58\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5," + error,
                                showCancel: false
                            });
                        }
                    });
                    console.log("合成的带有小程序码的图片的信息》》》", res);
                },
                fail: function (error) {
                    console.log("生成的图拍呢 失败 fail fail fail ", error);
                    wx.hideLoading();
                    wx.showModal({
                        title: '温馨提示',
                        content: "\u5C0F\u7A0B\u5E8F\u7801\u56FE\u7247\u5408\u6210\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5,error.errMsg," + JSON.stringify(error),
                        showCancel: false
                    });
                }
            }, that);
        }, 2 * 1000);
    },
    formReset: function () {
        console.log('form发生了reset事件');
    },
    up1: function () {
        var _this = this;
        console.log('上传1');
        var that = this;
        wx.chooseImage({
            count: 5,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                wx.showLoading({
                    title: '上传中...',
                    mask: true
                });
                // tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                _this.setData({
                    img1src: tempFilePaths[0],
                    img2src: tempFilePaths[1],
                    img3src: tempFilePaths[2],
                    img4src: tempFilePaths[3],
                    img5src: tempFilePaths[4]
                });
                // 创建画布对象
                var query = wx.createSelectorQuery();
                query.select('#myCanvas')
                    .fields({ node: true, size: true })
                    .exec(function (res) {
                    var canvas = res[0].node;
                    var ctx = canvas.getContext('2d');
                    debugger;
                    // 获取图片信息，要按照原图来绘制，否则图片会变形 
                    var drawText = ['11号 缪钰雯', '缪钰雯 爸爸', '缪钰雯 妈妈', '缪钰雯 奶奶', '缪钰雯 弟弟'];
                    var i = 0;
                    for (var key in tempFilePaths) {
                        var dx = i * 1080;
                        wx.getImageInfo({
                            src: tempFilePaths[key],
                            success: function (res) {
                                var imgW = res.width;
                                var imgH = res.height;
                                var imgPath = res.path;
                                ctx.drawImage(imgPath, dx, 0, imgW, imgH);
                                ctx.font = "70px orbitron";
                                ctx.fillStyle = "red";
                                ctx.fillText(drawText[key], dx + 350, imgH - 170);
                                ctx.draw(true);
                            }
                        });
                        i++;
                    }
                    console.log('上传成功');
                    wx.hideLoading();
                });
            }
        });
    }
});
