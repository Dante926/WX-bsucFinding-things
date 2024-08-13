// pages/collection/collection.js
import {
  ajax,
  formatTime
} from '../../../utils/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: ["寻主", "寻物"],
    list: [],
    select: 0,
  },
  getUpdata(e) {
    const {
      _id
    } = e.currentTarget.dataset.info
    // console.log(_id);
    wx.navigateTo({
      url: `../../publish/publish?id=${_id}`,
    })
  },

  getDelete(e) {
    const {
      _id
    } = e.currentTarget.dataset.info
    // console.log(_id);
    const params = {
      _id,
    }
    const result = ajax('/pubapi/delemypub', 'post', params)
      .then(result => {
        console.log(result.data);
        if (result.data.message === 'Success') {
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            success: () => {
              this.onLoad();
            }
          })
        } else {
          wx.showToast({
            title: '删除失败',
            icon: 'error'
          })
        }
      })

  },

  // 获取导航分类
  getTab(e) {
    this.setData({
      select: e.detail
    })
    this.onLoad();
  },

  // 跳转详情页
  toDetail(e) {
    const {
      info
    } = e.currentTarget.dataset;
    // console.log(info);
    wx.navigateTo({
      url: `../../infoDetail/infoDetail?info=${JSON.stringify(info)}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const {
      select
    } = this.data
    const params = {
      openid: wx.getStorageSync('openid'),
      type: select
    }
    const result = await ajax('/pubapi/getmypub', 'post', params)
    const {
      data
    } = result.data
    // 处理图片集
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