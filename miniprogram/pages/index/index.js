// import { it } from 'element-plus/es/locale';
import {
  formatTime
} from '../../utils/index';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['../../images/失物招领封面1.png', '../../images/失物招领封面2.png'],
    tabList: ["寻主", "寻物"],
    select: 0,
    list: [],
    login:false
  },

  toDetail(e) {
    const {
      info
    } = e.currentTarget.dataset;
    console.log(info.status);
    if (info.status == 2) {
      wx.showToast({
        title: '该物品已被认领,若有疑惑请联系管理员...',
        icon: 'none'
      })
      return;
    }
    wx.navigateTo({
      url: `../infoDetail/infoDetail?info=${JSON.stringify(info)}`,
    })
  },

  toSearch() {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  getTab(e) {
    this.setData({
      select: e.detail
    })
    this.onLoad();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('login_account')) {
      const {
        select
      } = this.data;

      this.setData({
        login:!!wx.getStorageSync('login')
      })

      wx.request({
        url: 'http://127.0.0.1:8082/getapi/getdata',
        method: 'POST',
        data: {
          type: select,
        },
        success: (res) => {
          const {
            data
          } = res;
          // 确认 data.data 是一个对象数组，且包含 imgList 属性 将imgList字符串转变为真正的数组
          const modifiedData = data.data.map(item => ({
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
            /* 
            map高阶函数，用于遍历数组中的每个item通过自己的方法将item中的某个值或者item本身处理后重新传入item中 
            
            这里的意义为，modifiedData中每个item的time都被处理了一遍
            */
          });
        },
        fail: (error) => {
          console.error('Request failed:', error);
        }
      });
      return;
    } else {
      wx.redirectTo({
        url: '../reallogin/reallogin',
      })
    }


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        select: 0
      })
    }
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})