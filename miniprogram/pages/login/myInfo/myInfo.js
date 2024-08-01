// pages/login/myInfo/myInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '',
    nickName: '',
    edit: false,
    // 需要修改的call，需要存储到缓存中的call
    call: '',
    // 缓存中的call
    _call:''
  },
  toEdit() {
    this.setData({
      edit: !this.data.edit,
      call:this.data._call
    })
  },

  getCall(e) {
    const {
      value
    } = e.detail
    if (value) {
      this.setData({
        call: value
      })
    }
  },

  deleteCall(){
    this.setData({
      call:''
    })
  },

  saveChange(){
    const call = this.data.call
    wx.setStorageSync('call', call)
    this.setData({
      _call:this.data.call,
      edit:!this.data.edit
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {
      avatarUrl,
      nickName,
    } = wx.getStorageSync('userInfo')
    const call = wx.getStorageSync('call')
    console.log(call);
    this.setData({
      avatarUrl,
      nickName,
      call,
      _call:call,
    })
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