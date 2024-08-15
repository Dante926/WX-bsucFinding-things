// pages/infoDetail/infoDetail.js
import {
  ajax,
  formatTime
} from '../../utils/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['../../images/banner1.jpg', '../../images/banner2.jpg'],
    collectionIcon: ['../../images/收藏.png', '../../images/收藏红.png'],
    info: {},
    comment: '',
    commentList: {},
    _id: '',
    showModal: false,
    desc: '',
    img_url: ''
  },

  // 弹窗中上传图片
  uploadImg() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const {
          tempFiles
        } = res;
        const uploadPromises = tempFiles.map((item) => {
          return new Promise((resolve, reject) => {
            wx.uploadFile({
              url: 'http://127.0.0.1:8082/uploadImg',
              filePath: tempFiles[0].tempFilePath,
              name: 'file',
              success: (res) => {
                resolve(res);
              },
              fail: (err) => {
                reject(err);
              }
            });
          });
        });

        Promise.all(uploadPromises).then((responses) => {
          responses.forEach((response) => {
            const {
              data
            } = response;
            const resultData = JSON.parse(data);
            const path = resultData.data[0].filename;
            const _path = `http://127.0.0.1:8082/${path}`;
            console.log(_path);
            this.setData({
              img_url: _path,
            });
          });

        }).catch((error) => {
          console.error('上传失败:', error);
        });
      }
    });
  },

  // 获取弹窗描述内容
  getDesc(e) {
    this.setData({
      desc: e.detail.value
    })
  },

  // 确认认领
  submitmodal() {
    const {
      desc,
      img_url,
      info,
    } = this.data;
    const _id = info._id ? info._id : info.id;
    if (!desc || !img_url) {
      wx.showToast({
        title: '存在必填项未填',
        icon: 'none'
      })
      return;
    }

    const params = {
      desc,
      img_url,
      openid: wx.getStorageSync('openid'),
      _id
    }

    ajax('/pubapi/confirm', 'post', params)
      .then(result => {
        console.log(result.data);
        if (result.data.message === 'Success') {
          this.toConfirm()
          wx.switchTab({
            url: '../index/index',
            success: () => {
              wx.showToast({
                title: '提交成功,待审核',
                icon: 'loading'
              })
            }
          })
        } else {
          wx.showToast({
            title: '提交失败,系统错误',
            icon: 'error'
          })
        }
      })
  },

  // 弹窗显示
  toConfirm() {
    // console.log(this.data.info.status);
    if (this.data.info.status === 0) {
      this.setData({
        showModal: !this.data.showModal
      })
    } else {
      wx.showToast({
        title: '认领审核中...',
        icon: 'loading'
      })
    }
  },

  // 获取评论区数据
  getcommentdata() {
    const _id = this.data._id ? this.data._id : this.data.info.id;
    const params = {
      _id,
    }
    const result = ajax('/pubapi/getcomment', 'post', params)
      .then(result => {
        const {
          commentList
        } = result.data.data;
        if (commentList) {
          if (result.data.message === 'Success') {
            this.setData({
              commentList: JSON.parse(commentList).map(item => ({
                ...item,
                time: formatTime(item.time)
              })),
              comment: ''
            })
            console.log(this.data.commentList);
          }
        }
      })
  },

  async submitComment() {
    const {
      comment,
      info
    } = this.data;
    const {
      _id
    } = info
    if (comment.trim().length === 0) {
      wx.showToast({
        title: '您输入的内容为空',
        icon: 'none'
      })
      return;
    } else {
      const {
        avatarUrl,
        nickName,
      } = wx.getStorageSync('userInfo')
      const params = {
        avatarUrl,
        nickName,
        content: comment,
        time: new Date().getTime(),
        _id
      }
      const result = await ajax('/pubapi/upcomment', 'post', params)
        .then(result => {
          console.log(result.data.message);
          if (result.data.message === 'Success') {
            wx.showToast({
              title: '评论成功',
              icon: 'none'
            })
            // this.onLoad();
            this.getcommentdata();
          } else {
            wx.showToast({
              title: '评论失败',
              icon: 'none'
            })
          }
        })
    }
  },

  getcomment(e) {
    console.log(e.detail.value);
    this.setData({
      comment: e.detail.value
    })
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
    console.log(info);

    // 设置_id是为了能获取到评论区数据
    const {
      _id
    } = JSON.parse(info)
    this.setData({
      _id
    })
    // ------------end-------------

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

    this.getcommentdata();

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