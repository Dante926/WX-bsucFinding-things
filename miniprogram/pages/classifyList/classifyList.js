// pages/collection/collection.js
import {
  ajax,
  formatTime
} from '../../utils/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: ["寻主", "寻物"],
    list: [],
    select: 0,
    text:''
  },

  // 获取导航分类
  getTab(e) {
    this.setData({
      select: e.detail
    })
    const {text} =this.data;
    this.onLoad({text});
  },

  // 跳转详情页
  toDetail(e) {
    const {
      info
    } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../infoDetail/infoDetail?info=${JSON.stringify(info)}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const {
      select
    } = this.data;

    const {
      text
    } = options;

    this.setData({
      text,
    })

    const params = {
      type: select,
      classifytwo: text
    }
    const result = await ajax('/getapi/getclatwo', 'post', params)
    const {
      data
    } = result.data;
    const modifiedData = data.map(item => ({
      ...item,
      imgList: item.imgList.replace(/^\["(.*)"\]$/, '$1').split('","').map(url => url.trim()) // 使用正则表达式去除外部的引号
    }));
    this.setData({
      list: modifiedData.map(item => {
        return {
          ...item,
          time: formatTime(item.time)
        }
      })
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