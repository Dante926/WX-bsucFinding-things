// pages/infoDetail/infoDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['../../images/banner1.jpg', '../../images/banner2.jpg'],
    collectionIcon: ['../../images/收藏.png', '../../images/收藏红.png'],
  },

  //获得联系功能
  getCall() {
    const {
      call
    } = this.data.info
    wx.showModal({
      title: '联系方式',
      content: call,
      confirmText: '复制',
      complete: (res) => {
        if (res.confirm) {
          wx.setClipboardData({
            data: call,
            success: (res) => {
              wx.showToast({
                icon: "none",
                title: '内容已复制'
              })
            }
          })
        }
      }
    })
  },

  // 收藏功能
  toCollection() {
    const info = this.data.info
    let collectionIcon = this.data.collectionIcon;
    let last = collectionIcon.pop(); // 将末尾元素删除存到last中
    collectionIcon.unshift(last);
    this.setData({
      collectionIcon
    })
    // 收藏
    if (collectionIcon[0] === '../../images/收藏红.png') {
      const {
        _id,
        id,
        type,
        classify1,
        classify2,
        name,
        date,
        region,
        call,
        desc,
        imgList,
        time
      } = info
      const actualId = _id || id;
      const openid = wx.getStorageSync('openid')
      wx.request({
        url: 'http://127.0.0.1:8082/getapi/pushcol',
        method: "POST",
        data: {
          id: actualId,
          type,
          classify1,
          classify2,
          name,
          date,
          region,
          call,
          desc,
          imgList,
          time,
          openid
        },
        success: (res) => {
          if (res.data.message == 'Success') {
            wx.showToast({
              title: '收藏成功',
              icon: 'success'
            })
          }
        }
      })
    } else {
      // 取消收藏
      const {
        _id,
        id
      } = info;

      const actualId = _id || id; // 使用逻辑或运算符获取真正存在的 id

      const openid = wx.getStorageSync('openid');
      wx.request({
        url: 'http://127.0.0.1:8082/getapi/delcol',
        method: 'POST',
        data: {
          id: actualId,
          openid,
        },
        success: (res) => {
          wx.showToast({
            title: '取消收藏',
            icon: 'success'
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {
      info
    } = options;
    let parsedInfo = JSON.parse(info); // 将 JSON 字符串解析为 JavaScript 对象
    // 如果imgList是字符串则转变为真正的数组
    if (typeof parsedInfo.imgList === 'string') {
      parsedInfo.imgList = JSON.parse(parsedInfo.imgList); // 将字符串解析为数组
      // 将更新后的 parsedInfo 存回 info 中并更新页面数据
      this.setData({
        info: parsedInfo
      });
    } else {
      this.setData({
        info: parsedInfo
      });
    }

    const openid = wx.getStorageSync('openid');

    // 查询是否有收藏标记
    wx.request({
      url: 'http://127.0.0.1:8082/getapi/getcol',
      method: 'POST',
      data: {
        id: parsedInfo._id ? parsedInfo._id : parsedInfo.id,
        openid,
      },
      success: (res) => {
        let collectionIcon = this.data.collectionIcon;

        // 如果有收藏标记
        if (res.data.message == 'Bookmarked') {
          let last = collectionIcon.pop(); // 将末尾元素删除存到last中
          collectionIcon.unshift(last);
          this.setData({
            collectionIcon
          });
        }
      }
    });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})