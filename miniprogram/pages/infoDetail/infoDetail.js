// pages/infoDetail/infoDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['../../images/banner1.jpg', '../../images/banner2.jpg'],
    collectionIcon:['../../images/收藏.png','../../images/收藏红.png']
  },
  getCall(){
    const call = wx.getStorageSync('call')
    wx.showModal({
      title: '联系方式',
      content: call,
      confirmText:'复制',
      complete: (res) => {
        if (res.confirm) {
          wx.setClipboardData({
            data: call,
            success:(res)=>{
              wx.showToast({
                icon:"none",
                title:'内容已复制'
              })
            }
          })
        }
      }
    })
  },

  toCollection(){
    let collectionIcon = this.data.collectionIcon;
    let last = collectionIcon.pop();// 将末尾元素删除存到last中
    collectionIcon.unshift(last);
    this.setData({
      collectionIcon
    })
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