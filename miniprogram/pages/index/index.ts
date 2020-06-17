// index.ts
// 获取应用实例
const app = getApp()
Page({
    onLoad() {

    },
    data: {
        img1src: '',
        img2src: '',
        img3src: '',
        img4src: '',
        img5src: '',
        combineHeight: 0,
        combineWidth: 0,
    },
    formSubmit: function (e: any) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        const that = this;
        wx.showLoading({
            title: '下载中...',
            mask: true,
        })
        let fun = () => {
            wx.canvasToTempFilePath({
                canvasId: 'myCanvas',
                quality: 1,
                success: function (res) {
                    console.log("合成的带有小程序码的图片success》》》", res)
                    let tempFilePath = res.tempFilePath
                    // 保存到相册
                    wx.saveImageToPhotosAlbum({
                        filePath: tempFilePath,
                        success() {
                            wx.hideLoading();
                            wx.showModal({
                                title: '温馨提示',
                                content: '图片保存成功，可在相册中查看',
                                showCancel: false,
                            })
                        },
                        fail(error) {
                            wx.showModal({
                                title: '温馨提示',
                                content: `图片保存失败，请重试,${error}`,
                                showCancel: false
                            })
                        }
                    })
                    console.log("合成的带有小程序码的图片的信息》》》", res)
                },
                fail: function (error) {
                    console.log("生成的图拍呢 失败 fail fail fail ", error)
                    setTimeout(fun, 5 * 1000)
                }
            }, that)
        }
        setTimeout(fun, 0.5 * 1000)
    },
    formReset: function () {
        console.log('form发生了reset事件')
    },
    up1: function () {
        console.log('上传1')
        const that = this;
        wx.chooseImage({
            count: 5,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                wx.showLoading({
                    title: '上传中...',
                    mask: true,
                })
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths
                this.setData({
                    img1src: tempFilePaths[0],
                    img2src: tempFilePaths[1],
                    img3src: tempFilePaths[2],
                    img4src: tempFilePaths[3],
                    img5src: tempFilePaths[4],
                })
                // 创建画布对象
                const ctx = wx.createCanvasContext("myCanvas", that)
                // 获取图片信息，要按照原图来绘制，否则图片会变形
                let drawText = ['11号 缪钰雯', '缪钰雯 爸爸', '缪钰雯 妈妈', '缪钰雯 奶奶', '缪钰雯 弟弟'];
                let i = 0;
                let imgWs = [];
                let imgHs = [];
                let imgPaths = [];
                for (let key in tempFilePaths) {
                    wx.getImageInfo({
                        src: tempFilePaths[key],
                        success: res => {
                            i++;
                            const imgW = res.width;
                            const imgH = res.height;
                            const imgPath = res.path;
                            imgWs.push(imgW)
                            imgHs.push(imgH)
                            imgPaths.push(imgPath)
                            if (i === drawText.length) {
                                that.setData({
                                    canvasWidth: imgW * drawText.length,
                                    canvasHeight: imgH,
                                })
                                ctx.font = "70px orbitron";
                                ctx.fillStyle = "red";
                                setTimeout(() => {
                                    for (let i = 0; i <= drawText.length; i++) {
                                        const dx: number = i * imgW;
                                        ctx.drawImage(imgPaths[i], dx, 0, imgW, imgH)
                                        ctx.fillText(drawText[i], dx + 250, imgH - 176);
                                        ctx.draw(true)
                                    }
                                }, 1 * 1000)
                            }
                        }
                    })
                }
                console.log('上传成功')
                wx.hideLoading();
            }
        })
    },
    invokeClodFunction: function () {
        console.log('调用云函数 start')
        wx.cloud.init();
        wx.cloud.callFunction({
            name: 'add',
            data: {
                a: 1,
                b: 2,
            },
            complete: res => {
                console.log('callFunction test result: ', res)
            }
        })
    }
})
