import {
  ajax
} from "../../utils/index";

// pages/reallogin/reallogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: ''
  },

  getUsername(e) {
    const value = e.detail.value;
    // 清空计时器
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      console.log(value);
      this.setData({
        username: value
      });
    }, 100);
  },

  getPassword(e) {
    const value = e.detail.value;
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      console.log(value);
      this.setData({
        password: value
      });
    }, 100);
  },


  toregister() {
    wx.redirectTo({
      url: '../register/register',
    })
  },

  tologin() {
    const {
      username,
      password
    } = this.data;
    // 如果存在未填项
    if (!username || !password) {
      wx.showToast({
        title: '有必填项未填.',
        icon: 'none'
      })
      return;
    }
    const params = {
      username,
      password
    }
    const result = ajax('/loginapi/login', 'post', params)
      .then(result => {
        console.log(result.data);
        const {
          message,
          username,
          password
        } = result.data;
        if (message == '登录失败') {
          wx.showToast({
            title: '登录失败.',
            icon: 'error'
          })
        } else if (message == '用户名错误') {
          wx.showToast({
            title: '用户名错误',
            icon: 'error'
          })
        } else if (message == '密码错误') {
          wx.showToast({
            title: '密码错误',
            icon: 'error'
          })
        } else {
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          })
          wx.setStorageSync('login_account', true)
          wx.setStorageSync('account', params)
          setTimeout(() => {
            wx.switchTab({
              url: '../index/index',
            })
          }, 600);
        }
      })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (wx.getStorageSync('login_account')) {
      wx.switchTab({
        url: '../index/index',
      })
      return;
    }else{
      
    }
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