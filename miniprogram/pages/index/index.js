"use strict";
var app = getApp();
Page({
    onLoad: function () {
    },
    data: {
        img1src: '',
        img2src: '',
        img3src: '',
        img4src: '',
        img5src: '',
    },
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        var that = this;
        wx.showLoading({
            title: '下载中...',
            mask: true,
        });
        setTimeout(function () {
            wx.canvasToTempFilePath({
                canvasId: 'myCanvas',
                quality: 1,
                success: function (res) {
                    console.log("合成的带有小程序码的图片success》》》", res);
                    var tempFilePath = res.tempFilePath;
                    wx.saveImageToPhotosAlbum({
                        filePath: tempFilePath,
                        success: function () {
                            wx.hideLoading();
                            wx.showModal({
                                title: '温馨提示',
                                content: '图片保存成功，可在相册中查看',
                                showCancel: false,
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
                    mask: true,
                });
                var tempFilePaths = res.tempFilePaths;
                _this.setData({
                    img1src: tempFilePaths[0],
                    img2src: tempFilePaths[1],
                    img3src: tempFilePaths[2],
                    img4src: tempFilePaths[3],
                    img5src: tempFilePaths[4],
                });
                var ctx = wx.createCanvasContext("myCanvas", that);
                var drawText = ['11号 缪钰雯', '缪钰雯 爸爸', '缪钰雯 妈妈', '缪钰雯 奶奶', '缪钰雯 弟弟'];
                var i = 0;
                var _loop_1 = function (key) {
                    var dx = i * 1080;
                    wx.getImageInfo({
                        src: tempFilePaths[key],
                        success: function (res) {
                            console.log(res);
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
                };
                for (var key in tempFilePaths) {
                    _loop_1(key);
                }
                console.log('上传成功');
                wx.hideLoading();
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUE7QUFDcEIsSUFBSSxDQUFDO0lBQ0gsTUFBTTtJQUVOLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDSixPQUFPLEVBQUUsRUFBRTtRQUNYLE9BQU8sRUFBRSxFQUFFO1FBQ1gsT0FBTyxFQUFFLEVBQUU7UUFDWCxPQUFPLEVBQUUsRUFBRTtRQUNYLE9BQU8sRUFBRSxFQUFFO0tBQ1o7SUFDRCxVQUFVLEVBQUUsVUFBVSxDQUFNO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNyRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbEIsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNiLEtBQUssRUFBRSxRQUFRO1lBQ2YsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDLENBQUE7UUFDRixVQUFVLENBQUM7WUFDVCxFQUFFLENBQUMsb0JBQW9CLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixPQUFPLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQUUsVUFBVSxHQUFHO29CQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLEdBQUcsQ0FBQyxDQUFBO29CQUMxQyxJQUFJLFlBQVksR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFBO29CQUVuQyxFQUFFLENBQUMsc0JBQXNCLENBQUM7d0JBQ3hCLFFBQVEsRUFBRSxZQUFZO3dCQUN0QixPQUFPOzRCQUNMLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs0QkFDakIsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQ0FDWCxLQUFLLEVBQUUsTUFBTTtnQ0FDYixPQUFPLEVBQUUsZ0JBQWdCO2dDQUN6QixVQUFVLEVBQUUsS0FBSzs2QkFDbEIsQ0FB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QUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBOzRCQUN6QyxHQUFHLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQzs0QkFDM0IsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7NEJBQ3RCLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLEVBQUUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDOzRCQUNsRCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO3dCQUNoQixDQUFDO3FCQUNGLENBQUMsQ0FBQTtvQkFDRixDQUFDLEVBQUUsQ0FBQzs7Z0JBaEJOLEtBQUssSUFBSSxHQUFHLElBQUksYUFBYTs0QkFBcEIsR0FBRztpQkFpQlg7Z0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDbkIsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW5kZXgudHNcclxuLy8g6I635Y+W5bqU55So5a6e5L6LXHJcbmNvbnN0IGFwcCA9IGdldEFwcCgpXHJcblBhZ2Uoe1xyXG4gIG9uTG9hZCgpIHtcclxuXHJcbiAgfSxcclxuICBkYXRhOiB7XHJcbiAgICBpbWcxc3JjOiAnJyxcclxuICAgIGltZzJzcmM6ICcnLFxyXG4gICAgaW1nM3NyYzogJycsXHJcbiAgICBpbWc0c3JjOiAnJyxcclxuICAgIGltZzVzcmM6ICcnLFxyXG4gIH0sXHJcbiAgZm9ybVN1Ym1pdDogZnVuY3Rpb24gKGU6IGFueSkge1xyXG4gICAgY29uc29sZS5sb2coJ2Zvcm3lj5HnlJ/kuoZzdWJtaXTkuovku7bvvIzmkLrluKbmlbDmja7kuLrvvJonLCBlLmRldGFpbC52YWx1ZSlcclxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICB0aXRsZTogJ+S4i+i9veS4rS4uLicsXHJcbiAgICAgIG1hc2s6IHRydWUsXHJcbiAgICB9KVxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHd4LmNhbnZhc1RvVGVtcEZpbGVQYXRoKHtcclxuICAgICAgICBjYW52YXNJZDogJ215Q2FudmFzJyxcclxuICAgICAgICBxdWFsaXR5OiAxLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwi5ZCI5oiQ55qE5bim5pyJ5bCP56iL5bqP56CB55qE5Zu+54mHc3VjY2Vzc+OAi+OAi+OAi1wiLCByZXMpXHJcbiAgICAgICAgICBsZXQgdGVtcEZpbGVQYXRoID0gcmVzLnRlbXBGaWxlUGF0aFxyXG4gICAgICAgICAgLy8g5L+d5a2Y5Yiw55u45YaMXHJcbiAgICAgICAgICB3eC5zYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtKHtcclxuICAgICAgICAgICAgZmlsZVBhdGg6IHRlbXBGaWxlUGF0aCxcclxuICAgICAgICAgICAgc3VjY2VzcygpIHtcclxuICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xyXG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+a4qemmqOaPkOekuicsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn5Zu+54mH5L+d5a2Y5oiQ5Yqf77yM5Y+v5Zyo55u45YaM5Lit5p+l55yLJyxcclxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWwoZXJyb3IpIHtcclxuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmuKnppqjmj5DnpLonLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogYOWbvueJh+S/neWtmOWksei0pe+8jOivt+mHjeivlSwke2Vycm9yfWAsXHJcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIuWQiOaIkOeahOW4puacieWwj+eoi+W6j+eggeeahOWbvueJh+eahOS/oeaBr+OAi+OAi+OAi1wiLCByZXMpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwi55Sf5oiQ55qE5Zu+5ouN5ZGiIOWksei0pSBmYWlsIGZhaWwgZmFpbCBcIiwgZXJyb3IpXHJcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXHJcbiAgICAgICAgICB3eC5zaG93TW9kYWwoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+a4qemmqOaPkOekuicsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGDlsI/nqIvluo/noIHlm77niYflkIjmiJDlpLHotKXvvIzor7fph43or5UsZXJyb3IuZXJyTXNnLCR7SlNPTi5zdHJpbmdpZnkoZXJyb3IpfWAsXHJcbiAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgfSwgdGhhdClcclxuICAgIH0sIDIgKiAxMDAwKVxyXG4gIH0sXHJcbiAgZm9ybVJlc2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZygnZm9ybeWPkeeUn+S6hnJlc2V05LqL5Lu2JylcclxuICB9LFxyXG4gIHVwMTogZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc29sZS5sb2coJ+S4iuS8oDEnKVxyXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XHJcbiAgICB3eC5jaG9vc2VJbWFnZSh7XHJcbiAgICAgIGNvdW50OiA1LFxyXG4gICAgICBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sXHJcbiAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nLCAnY2FtZXJhJ10sXHJcbiAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICB0aXRsZTogJ+S4iuS8oOS4rS4uLicsXHJcbiAgICAgICAgICBtYXNrOiB0cnVlLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gdGVtcEZpbGVQYXRo5Y+v5Lul5L2c5Li6aW1n5qCH562+55qEc3Jj5bGe5oCn5pi+56S65Zu+54mHXHJcbiAgICAgICAgY29uc3QgdGVtcEZpbGVQYXRocyA9IHJlcy50ZW1wRmlsZVBhdGhzXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgIGltZzFzcmM6IHRlbXBGaWxlUGF0aHNbMF0sXHJcbiAgICAgICAgICBpbWcyc3JjOiB0ZW1wRmlsZVBhdGhzWzFdLFxyXG4gICAgICAgICAgaW1nM3NyYzogdGVtcEZpbGVQYXRoc1syXSxcclxuICAgICAgICAgIGltZzRzcmM6IHRlbXBGaWxlUGF0aHNbM10sXHJcbiAgICAgICAgICBpbWc1c3JjOiB0ZW1wRmlsZVBhdGhzWzRdLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8g5Yib5bu655S75biD5a+56LGhXHJcbiAgICAgICAgY29uc3QgY3R4ID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dChcIm15Q2FudmFzXCIsIHRoYXQpXHJcbiAgICAgICAgLy8g6I635Y+W5Zu+54mH5L+h5oGv77yM6KaB5oyJ54Wn5Y6f5Zu+5p2l57uY5Yi277yM5ZCm5YiZ5Zu+54mH5Lya5Y+Y5b2iIFxyXG4gICAgICAgIGxldCBkcmF3VGV4dCA9IFsnMTHlj7cg57yq6ZKw6ZuvJywgJ+e8qumSsOmbryDniLjniLgnLCAn57yq6ZKw6ZuvIOWmiOWmiCcsICfnvKrpkrDpm68g5aW25aW2JywgJ+e8qumSsOmbryDlvJ/lvJ8nXTtcclxuICAgICAgICBsZXQgaSA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRlbXBGaWxlUGF0aHMpIHtcclxuICAgICAgICAgIGxldCBkeDogbnVtYmVyID0gaSAqIDEwODA7XHJcbiAgICAgICAgICB3eC5nZXRJbWFnZUluZm8oe1xyXG4gICAgICAgICAgICBzcmM6IHRlbXBGaWxlUGF0aHNba2V5XSxcclxuICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXHJcbiAgICAgICAgICAgICAgbGV0IGltZ1cgPSByZXMud2lkdGhcclxuICAgICAgICAgICAgICBsZXQgaW1nSCA9IHJlcy5oZWlnaHRcclxuICAgICAgICAgICAgICBsZXQgaW1nUGF0aCA9IHJlcy5wYXRoXHJcbiAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWdQYXRoLCBkeCwgMCwgaW1nVywgaW1nSClcclxuICAgICAgICAgICAgICBjdHguZm9udCA9IFwiNzBweCBvcmJpdHJvblwiO1xyXG4gICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJlZFwiO1xyXG4gICAgICAgICAgICAgIGN0eC5maWxsVGV4dChkcmF3VGV4dFtrZXldLCBkeCArIDM1MCwgaW1nSCAtIDE3MCk7XHJcbiAgICAgICAgICAgICAgY3R4LmRyYXcodHJ1ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIGkrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+S4iuS8oOaIkOWKnycpXHJcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbn0pXHJcbiJdfQ==