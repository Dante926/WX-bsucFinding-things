// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    asideBar: [
      "证件类", "生活用品", "数码产品", "美妆护肤", "衣服物品", "饰品", "文娱", "其他"
    ],
    rightList: [
      // 证件类
      [{
        url: '../../images/classify/证件类/身份证.png',
        text: '身份证'
      }, {
        url: '../../images/classify/证件类/校园卡.png',
        text: '校园卡'
      }, {
        url: '../../images/classify/证件类/水卡.png',
        text: '水卡'
      }, {
        url: '../../images/classify/证件类/公交卡.png',
        text: '公交卡'
      }, {
        url: '../../images/classify/证件类/银行卡.png',
        text: '银行卡'
      }],
      // 生活用品
      [{
        url: '../../images/classify/生活用品/生活用品.png',
        text: '水杯'
      }, {
        url: '../../images/classify/生活用品/雨伞.png',
        text: '雨伞'
      }, {
        url: '../../images/classify/生活用品/风扇.png',
        text: '风扇'
      }, {
        url: '../../images/classify/生活用品/钥匙.png',
        text: '钥匙类'
      }, {
        url: '../../images/classify/生活用品/其他.png',
        text: '其他'
      }],
      // 数码产品
      [{
        url: '../../images/classify/数码产品/手机.png',
        text: '手机'
      }, {
        url: '../../images/classify/数码产品/相机.png',
        text: '相机'
      }, {
        url: '../../images/classify/数码产品/U盘.png',
        text: 'U盘/硬盘'
      }, {
        url: '../../images/classify/数码产品/充电宝.png',
        text: '充电宝'
      }, {
        url: '../../images/classify/数码产品/平板电脑.png',
        text: '平板电脑'
      }, {
        url: '../../images/classify/数码产品/鼠标.png',
        text: '鼠标'
      }, {
        url: '../../images/classify/数码产品/数据线.png',
        text: '数据线'
      }, {
        url: '../../images/classify/数码产品/耳机.png',
        text: '耳机'
      }, {
        url: '../../images/classify/数码产品/手写笔.png',
        text: '手写笔'
      }, {
        url: '../../images/classify/数码产品/支架.png',
        text: '支架'
      }, {
        url: '../../images/classify/数码产品/音响.png',
        text: '音响'
      }, {
        url: '../../images/classify/数码产品/MP3.png',
        text: 'MP3'
      }, ],
      // 美妆护肤
      [{
        url: '../../images/classify/美妆护肤/口红.png',
        text: '口红'
      }, {
        url: '../../images/classify/美妆护肤/眉笔.png',
        text: '眉笔'
      }, {
        url: '../../images/classify/美妆护肤/眼笔.png',
        text: '眼笔'
      }, {
        url: '../../images/classify/美妆护肤/腮红.png',
        text: '腮红'
      }, {
        url: '../../images/classify/美妆护肤/眼影.png',
        text: '眼影'
      }, {
        url: '../../images/classify/美妆护肤/防晒.png',
        text: '防晒'
      }, {
        url: '../../images/classify/美妆护肤/喷雾.png',
        text: '喷雾'
      }, {
        url: '../../images/classify/美妆护肤/香水.png',
        text: '香水'
      },],
      // 衣服物品
      [{
        url: '../../images/classify/衣服物品/男装.png',
        text: '男装'
      }, {
        url: '../../images/classify/衣服物品/女装.png',
        text: '女装'
      }, {
        url: '../../images/classify/衣服物品/男鞋.png',
        text: '男鞋'
      }, {
        url: '../../images/classify/衣服物品/女鞋.png',
        text: '女鞋'
      }, {
        url: '../../images/classify/衣服物品/包包.png',
        text: '包包'
      },],
      // 饰品
      [{
        url: '../../images/classify/饰品/手表.png',
        text: '手表'
      }, {
        url: '../../images/classify/饰品/项链.png',
        text: '项链'
      }, {
        url: '../../images/classify/饰品/手链.png',
        text: '手链'
      }, {
        url: '../../images/classify/饰品/戒指.png',
        text: '戒指'
      }, {
        url: '../../images/classify/饰品/耳饰.png',
        text: '耳饰'
      }, {
        url: '../../images/classify/饰品/眼镜.png',
        text: '眼镜'
      }, {
        url: '../../images/classify/饰品/帽子.png',
        text: '帽子'
      }, {
        url: '../../images/classify/饰品/发饰.png',
        text: '发饰'
      },],
      // 文娱
      [{
        url: '../../images/classify/文娱/教材.png',
        text: '教材'
      }, {
        url: '../../images/classify/文娱/笔记.png',
        text: '笔记'
      }, {
        url: '../../images/classify/文娱/文具.png',
        text: '文具'
      }, {
        url: '../../images/classify/文娱/球.png',
        text: '球/球拍'
      }, {
        url: '../../images/classify/文娱/护具.png',
        text: '护具'
      }, {
        url: '../../images/classify/文娱/跳绳.png',
        text: '跳绳'
      }, {
        url: '../../images/classify/文娱/自行车.png',
        text: '自行车'
      }, {
        url: '../../images/classify/文娱/棋牌.png',
        text: '棋牌'
      },],
      // 其他
      [{
        url: '../../images/classify/其他/药品.png',
        text: '药品'
      }, {
        url: '../../images/classify/其他/零食.png',
        text: '零食'
      }, {
        url: '../../images/classify/其他/周边.png',
        text: '周边'
      }, {
        url: '../../images/classify/其他/其他.png',
        text: '其他'
      }]
    ],
    select: 0
  },
  selectLeft(e) {
    const {
      index
    } = e.currentTarget.dataset;
    this.setData({
      select: index
    })
  },

  toClassify(e) {
    // console.log(e.currentTarget.dataset);
    const {
      text
    } = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `../classifyList/classifyList?text=${text}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(this.data.rightList[0][0]);
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
        select: 1
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