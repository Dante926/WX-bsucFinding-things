Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['../../images/banner1.jpg', '../../images/banner2.jpg'],
    tabList: ["寻主", "寻物"],
    select: 0,
    list:[
      {
        image:"../../images/banner2.jpg",
        name:"身份证",
        region:"东合校区",
        date:"5月20日",
        desc:"有没有人再食堂看到啊，有赏，请联系...",
        publish_time:"2024-7-30 11:07"
      },
      {
        image:"../../images/banner1.jpg",
        name:"身份证",
        region:"东合校区",
        date:"5月20日",
        desc:"有没有人再食堂看到啊，有赏，请联系...",
        publish_time:"2024-7-30 11:07"
      },
      {
        image:"../../images/banner2.jpg",
        name:"身份证",
        region:"东合校区",
        date:"5月20日",
        desc:"有没有人再食堂看到啊，有赏，请联系...",
        publish_time:"2024-7-30 11:07"
      }
    ],
  },
  selectTab(e) {
    const {
      id
    } = e.currentTarget.dataset;
    this.setData({
      select: id,
    })
  },
  toDetail(e){
    wx.navigateTo({
      url: "../infoDetail/infoDetail",
    })
  },
  toSearch(){
    wx.navigateTo({
      url: '../search/search',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 添加调试输出语句
    // console.log('Background images:', this.data.background);
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