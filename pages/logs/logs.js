//logs.js

Page({
  data: {
    modalHidden: true,
    arr:[],
    timeend: 0,
    timestart: 0,
    url:'',
    showPopup:true
  },
  onLoad(){
    var arr1 = [];
    for(var i = 0;i<=6;i++){
      var obj = {};
      obj.modalHidden = true;
      obj.src = 'http://192.168.3.103/image/' + (i + 1) + '.jpg'
      arr1.push(obj)
    };
    this.setData({
      'arr':arr1
    })
  },
  togglePopup: function (event) {
    var image_path = event.currentTarget.dataset.src;
    this.setData({
      url: image_path,
      showPopup: !this.data.showPopup
    });
  }, 
  modalCancel: function () {
    console.log(this.data.showPopup)
    this.setData({
      showPopup: true
    })
  },
  modalConfirm: function () {
    this.setData({
      showPopup: true
    })
  },
  //点击开始的时间  
  timestart: function (e) {
    var _this = this;
    _this.setData({ timestart: e.timeStamp });
  },
  //点击结束的时间
  timeend: function (e) {
    var _this = this;
    _this.setData({ timeend: e.timeStamp });
  },

  //保存图片
  saveImg: function (e) {
    var _this = this;
    var times = _this.data.timeend - _this.data.timestart;
    if (times > 300) {
      wx.getSetting({
        success: function (res) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: function (res) {
              var imgUrl = e.target.dataset.url;
              wx.downloadFile({//下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
                url: imgUrl,
                success: function (res) {
                  // 下载成功后再保存到本地
                  wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,//返回的临时文件路径，下载后的文件会存储到一个临时文件
                    success: function (res) {
                      wx.showToast({
                        title: '成功保存到相册',
                        icon: 'success'
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  }
})
