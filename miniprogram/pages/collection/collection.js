// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: ["寻主", "寻物"],
    list: [],
    select: 0,
  },

  // 获取导航分类
  getTab(e) {
    this.setData({
      select: e.detail
    })
    this.onLoad();
  },

  // 跳转详情页
  // 跳转详情页
  toDetail(e) {
    const {
      info
    } = e.currentTarget.dataset;
    console.log(info);
    wx.navigateTo({
      url: `../infoDetail/infoDetail?info=${JSON.stringify(info)}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {
      select
    } = this.data
    wx.request({
      url: 'http://127.0.0.1:8082/getapi/getcoldata',
      method: 'POST',
      data: {
        openid: wx.getStorageSync('openid'),
        type: select,
      },
      success: (res) => {
        const {
          data
        } = res.data
        // 将图片数组字符串转变为真正的数组对象
        const modifiedData = data.map(item => ({
          ...item,
          imgList: item.imgList.replace(/^\["(.*)"\]$/, '$1').split('","').map(url => url.trim()) // 使用正则表达式去除外部的引号
        }));
        this.setData({
          list: modifiedData,
          login:!!wx.getStorageSync('login')
        })
      }
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
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        select: 3
      })
    }
    this.onLoad();
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