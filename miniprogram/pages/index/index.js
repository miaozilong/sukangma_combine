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
        var fun = function () {
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
                    setTimeout(fun, 5 * 1000);
                }
            }, that);
        };
        setTimeout(fun, 5 * 1000);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUE7QUFDcEIsSUFBSSxDQUFDO0lBQ0gsTUFBTTtJQUVOLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDSixPQUFPLEVBQUUsRUFBRTtRQUNYLE9BQU8sRUFBRSxFQUFFO1FBQ1gsT0FBTyxFQUFFLEVBQUU7UUFDWCxPQUFPLEVBQUUsRUFBRTtRQUNYLE9BQU8sRUFBRSxFQUFFO0tBQ1o7SUFDRCxVQUFVLEVBQUUsVUFBVSxDQUFNO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNyRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbEIsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNiLEtBQUssRUFBRSxRQUFRO1lBQ2YsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDLENBQUE7UUFDRixJQUFJLEdBQUcsR0FBRztZQUNSLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztnQkFDdEIsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLE9BQU8sRUFBRSxDQUFDO2dCQUNWLE9BQU8sRUFBRSxVQUFVLEdBQUc7b0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxDQUFDLENBQUE7b0JBQzFDLElBQUksWUFBWSxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUE7b0JBRW5DLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQzt3QkFDeEIsUUFBUSxFQUFFLFlBQVk7d0JBQ3RCLE9BQU87NEJBQ0wsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDOzRCQUNqQixFQUFFLENBQUMsU0FBUyxDQUFDO2dDQUNYLEtBQUssRUFBRSxNQUFNO2dDQUNiLE9BQU8sRUFBRSxnQkFBZ0I7Z0NBQ3pCLFVBQVUsRUFBRSxLQUFLOzZCQUNs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QUFHLEtBQUssQ0FBQzs0QkFDdEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLEdBQUcsRUFBRSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7NEJBQ2xELEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7d0JBQ2hCLENBQUM7cUJBQ0YsQ0FBQyxDQUFBO29CQUNGLENBQUMsRUFBRSxDQUFDOztnQkFoQk4sS0FBSyxJQUFJLEdBQUcsSUFBSSxhQUFhOzRCQUFwQixHQUFHO2lCQWlCWDtnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUNuQixFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbmRleC50c1xuLy8g6I635Y+W5bqU55So5a6e5L6LXG5jb25zdCBhcHAgPSBnZXRBcHAoKVxuUGFnZSh7XG4gIG9uTG9hZCgpIHtcblxuICB9LFxuICBkYXRhOiB7XG4gICAgaW1nMXNyYzogJycsXG4gICAgaW1nMnNyYzogJycsXG4gICAgaW1nM3NyYzogJycsXG4gICAgaW1nNHNyYzogJycsXG4gICAgaW1nNXNyYzogJycsXG4gIH0sXG4gIGZvcm1TdWJtaXQ6IGZ1bmN0aW9uIChlOiBhbnkpIHtcbiAgICBjb25zb2xlLmxvZygnZm9ybeWPkeeUn+S6hnN1Ym1pdOS6i+S7tu+8jOaQuuW4puaVsOaNruS4uu+8micsIGUuZGV0YWlsLnZhbHVlKVxuICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuICAgIHd4LnNob3dMb2FkaW5nKHtcbiAgICAgIHRpdGxlOiAn5LiL6L295LitLi4uJyxcbiAgICAgIG1hc2s6IHRydWUsXG4gICAgfSlcbiAgICBsZXQgZnVuID0gKCkgPT4ge1xuICAgICAgd3guY2FudmFzVG9UZW1wRmlsZVBhdGgoe1xuICAgICAgICBjYW52YXNJZDogJ215Q2FudmFzJyxcbiAgICAgICAgcXVhbGl0eTogMSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwi5ZCI5oiQ55qE5bim5pyJ5bCP56iL5bqP56CB55qE5Zu+54mHc3VjY2Vzc+OAi+OAi+OAi1wiLCByZXMpXG4gICAgICAgICAgbGV0IHRlbXBGaWxlUGF0aCA9IHJlcy50ZW1wRmlsZVBhdGhcbiAgICAgICAgICAvLyDkv53lrZjliLDnm7jlhoxcbiAgICAgICAgICB3eC5zYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtKHtcbiAgICAgICAgICAgIGZpbGVQYXRoOiB0ZW1wRmlsZVBhdGgsXG4gICAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICB3eC5oaWRlTG9hZGluZygpO1xuICAgICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5rip6aao5o+Q56S6JyxcbiAgICAgICAgICAgICAgICBjb250ZW50OiAn5Zu+54mH5L+d5a2Y5oiQ5Yqf77yM5Y+v5Zyo55u45YaM5Lit5p+l55yLJyxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsKGVycm9yKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfmuKnppqjmj5DnpLonLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGDlm77niYfkv53lrZjlpLHotKXvvIzor7fph43or5UsJHtlcnJvcn1gLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIuWQiOaIkOeahOW4puacieWwj+eoi+W6j+eggeeahOWbvueJh+eahOS/oeaBr+OAi+OAi+OAi1wiLCByZXMpXG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwi55Sf5oiQ55qE5Zu+5ouN5ZGiIOWksei0pSBmYWlsIGZhaWwgZmFpbCBcIiwgZXJyb3IpXG4gICAgICAgICAgc2V0VGltZW91dChmdW4sIDUgKiAxMDAwKVxuICAgICAgICB9XG4gICAgICB9LCB0aGF0KVxuICAgIH1cbiAgICBzZXRUaW1lb3V0KGZ1biwgNSAqIDEwMDApXG4gIH0sXG4gIGZvcm1SZXNldDogZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKCdmb3Jt5Y+R55Sf5LqGcmVzZXTkuovku7YnKVxuICB9LFxuICB1cDE6IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZygn5LiK5LygMScpXG4gICAgY29uc3QgdGhhdCA9IHRoaXM7XG4gICAgd3guY2hvb3NlSW1hZ2Uoe1xuICAgICAgY291bnQ6IDUsXG4gICAgICBzaXplVHlwZTogWydvcmlnaW5hbCcsICdjb21wcmVzc2VkJ10sXG4gICAgICBzb3VyY2VUeXBlOiBbJ2FsYnVtJywgJ2NhbWVyYSddLFxuICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfkuIrkvKDkuK0uLi4nLFxuICAgICAgICAgIG1hc2s6IHRydWUsXG4gICAgICAgIH0pXG4gICAgICAgIC8vIHRlbXBGaWxlUGF0aOWPr+S7peS9nOS4umltZ+agh+etvueahHNyY+WxnuaAp+aYvuekuuWbvueJh1xuICAgICAgICBjb25zdCB0ZW1wRmlsZVBhdGhzID0gcmVzLnRlbXBGaWxlUGF0aHNcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBpbWcxc3JjOiB0ZW1wRmlsZVBhdGhzWzBdLFxuICAgICAgICAgIGltZzJzcmM6IHRlbXBGaWxlUGF0aHNbMV0sXG4gICAgICAgICAgaW1nM3NyYzogdGVtcEZpbGVQYXRoc1syXSxcbiAgICAgICAgICBpbWc0c3JjOiB0ZW1wRmlsZVBhdGhzWzNdLFxuICAgICAgICAgIGltZzVzcmM6IHRlbXBGaWxlUGF0aHNbNF0sXG4gICAgICAgIH0pXG4gICAgICAgIC8vIOWIm+W7uueUu+W4g+WvueixoVxuICAgICAgICBjb25zdCBjdHggPSB3eC5jcmVhdGVDYW52YXNDb250ZXh0KFwibXlDYW52YXNcIiwgdGhhdClcbiAgICAgICAgLy8g6I635Y+W5Zu+54mH5L+h5oGv77yM6KaB5oyJ54Wn5Y6f5Zu+5p2l57uY5Yi277yM5ZCm5YiZ5Zu+54mH5Lya5Y+Y5b2iIFxuICAgICAgICBsZXQgZHJhd1RleHQgPSBbJzEx5Y+3IOe8qumSsOmbrycsICfnvKrpkrDpm68g54i454i4JywgJ+e8qumSsOmbryDlpojlpognLCAn57yq6ZKw6ZuvIOWltuWlticsICfnvKrpkrDpm68g5byf5byfJ107XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRlbXBGaWxlUGF0aHMpIHtcbiAgICAgICAgICBsZXQgZHg6IG51bWJlciA9IGkgKiAxMDgwO1xuICAgICAgICAgIHd4LmdldEltYWdlSW5mbyh7XG4gICAgICAgICAgICBzcmM6IHRlbXBGaWxlUGF0aHNba2V5XSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgICAgbGV0IGltZ1cgPSByZXMud2lkdGhcbiAgICAgICAgICAgICAgbGV0IGltZ0ggPSByZXMuaGVpZ2h0XG4gICAgICAgICAgICAgIGxldCBpbWdQYXRoID0gcmVzLnBhdGhcbiAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWdQYXRoLCBkeCwgMCwgaW1nVywgaW1nSClcbiAgICAgICAgICAgICAgY3R4LmZvbnQgPSBcIjcwcHggb3JiaXRyb25cIjtcbiAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmVkXCI7XG4gICAgICAgICAgICAgIGN0eC5maWxsVGV4dChkcmF3VGV4dFtrZXldLCBkeCArIDM1MCwgaW1nSCAtIDE3MCk7XG4gICAgICAgICAgICAgIGN0eC5kcmF3KHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ+S4iuS8oOaIkOWKnycpXG4gICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XG4gICAgICB9XG4gICAgfSlcbiAgfVxufSlcbiJdfQ==