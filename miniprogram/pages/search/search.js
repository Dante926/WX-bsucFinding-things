Page({
  data: {
    search: '',
    _search: '',
    searchLog: []
  },

  getSearch(e) {
    this.setData({
      _search: e.detail.value
    });

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      this.setData({
        search: e.detail.value
      });

      console.log('最后一次输入:', e.detail.value);

      // 从缓存中获取搜索记录
      let searchLog = wx.getStorageSync('searchLog') || [];

      // 检查新的搜索项是否已存在于缓存中
      if (!searchLog.includes(e.detail.value)) {
        // 如果不存在，则添加到缓存中
        searchLog.unshift(e.detail.value);
      }

      // 更新缓存
      wx.setStorageSync('searchLog', searchLog);

      // 更新页面数据
      this.setData({
        searchLog,
      });
    }, 800);
  },

  deleteSearch() {
    this.setData({
      search: '',
      _search: ''
    });
  },

  deleteLog(){
    this.setData({
      searchLog:[]
    })
    wx.removeStorageSync('searchLog')
  },

  onLoad(options) {
    const searchLog = wx.getStorageSync('searchLog') || [];
    this.setData({
      searchLog,
    });
  }
});