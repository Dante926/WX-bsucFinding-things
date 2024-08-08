// pages/register/register.js
import {
  ajax
} from '../../utils/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    naem: '',
    password: '',
    repassword: '',
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
    // 清空计时器
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

  getRePassword(e) {
    const value = e.detail.value;
    // 清空计时器
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      console.log(value);
      this.setData({
        repassword: value
      });
    }, 100);
  },

  toRegister() {
    const {
      username,
      password,
      repassword
    } = this.data;
    if (password === repassword) {
      const params = {
        username,
        password
      }
      const result = ajax('/loginapi/register', 'post', params)
        .then(result => {
          console.log(result.data);
          const {
            message
          } = result.data;
          if (message == '用户名已被占用...') {
            wx.showToast({
              title: '用户名已被占用...',
              icon: 'error'
            })
          } else if (message == '注册失败...') {
            wx.showToast({
              title: '注册失败，请重试...',
              icon: 'error'
            })
          } else {
            wx.showToast({
              title: '注册成功.',
              icon: 'success'
            })
            setTimeout(() => {
              wx.redirectTo({
                url: '../reallogin/reallogin',
              })
            }, 700);
          }
        })
    } else {
      wx.showToast({
        title: '密码不一致,请重试.',
        icon: 'error'
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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