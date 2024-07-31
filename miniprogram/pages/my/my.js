// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login:false,
    avatarUrl:'',
    nickName:'',
    cellList:[
      {
        url:'../../images/my/发布.png',
        text:'我的发布'
      },
      {
        url:'../../images/my/收藏.png',
        text:'我的收藏'
      },
      {
        url:'../../images/my/信息.png',
        text:'我的信息'
      },
      {
        url:'../../images/my/退出.png',
        text:'退出登入'
      }
    ]
  },

  toLogin() {
    wx.getUserProfile({
      desc: '获取用户信息',
      success: (res) => {
        console.log(res);
        const {
          userInfo: {
            avatarUrl,
            nickName
          }
        } = res
        const userInfo = {
          avatarUrl,
          nickName
        }
        wx.setStorageSync('userInfo', userInfo)
        wx.setStorageSync('login', true)
        this.setData({
          login:true
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const login = wx.getStorageSync('login')
    const userInfo = wx.getStorageSync('userInfo')
    if(userInfo){
      const {avatarUrl,nickName} = userInfo;
      this.setData({
        avatarUrl,
        nickName
      })
    }
    this.setData({
      login:!!login
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
        select: 4
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