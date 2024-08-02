// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: false,
    name: '',
    region: '',
    call: '',
    desc: '',
    imageList: [],
    type:'',
    multiArray: [
      ['证件类', '生活用品', '数码产品', '美妆护肤', '衣服物品类', '饰品', '文娱', '其他'],
      ['身份证', '校园卡', '学生证', '水卡', '公交卡'],
    ],
    // 储备数据源
    pickerList: [
      ['身份证', '校园卡', '学生证', '水卡', '公交卡', '银行卡'],
      ['水杯', '雨伞', '小风扇', '钥匙/钥匙扣', '其他'],
      ['手机', '相机', 'U盘/硬盘', '充电宝', '平板电脑', '鼠标', '数据线', '耳机', '手写笔', '支架', '音响', 'MP3', '其他'],
      ['口红', '粉底', '眉笔', '腮红', '眼影', '防嗮', '喷雾', '香水', '其他'],
      ['男装', '女装', '男鞋', '女鞋', '包包', '其他'],
      ['手表', '项链', '手链', '戒指', '耳饰', '眼睛', '帽子', '发饰', '其他'],
      ['教材', '笔记', '文具', '球/球拍', '护具', '跳绳', '自行车', '棋牌', '其他'],
      ['药品', '零食', '周边', '其他']
    ],
    multiIndex: [0, 0, 0],
  },

  bindMultiPickerChange(e) {
    this.setData({
      select: true,
    })
  },

  bindMultiPickerColumnChange(e) {
    // 获取列变化时当前的列和值
    const {
      column,
      value
    } = e.detail;

    // 获取data中的列值数组
    const data = this.data;
    const {
      multiArray,
      pickerList
    } = this.data

    // 当滑动第一列(大分类)时，改变第二列的数据源
    if (column === 0) {
      // 替换第二行数据源
      multiArray[1] = pickerList[value]
    }
    data.multiArray = multiArray;
    data.multiIndex[column] = value;
    this.setData(data)
  },

  closeSelect() {
    this.setData({
      select: false,
      multiIndex: [0, 0],
    })
  },

  getName(e) {
    this.setData({
      name: e.detail.value
    })
  },

  getDate(e) {
    this.setData({
      date: e.detail.value
    })
  },

  getRegion(e) {
    this.setData({
      region: e.detail.value
    })
  },

  getCall(e) {
    this.setData({
      call: e.detail.value
    })
  },

  getDesc(e) {
    this.setData({
      desc: e.detail.value
    })
  },

  clearDesc() {
    this.setData({
      desc: ''
    })
  },

  uploadImage() {
    let {
      imageList
    } = this.data
    wx.chooseMedia({
      count: 6 - imageList.length,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const {
          tempFiles
        } = res;

        tempFiles.forEach(item => {
          imageList.unshift(item.tempFilePath)
        })

        this.setData({
          imageList,
        })
      }
    })
  },

  deleteImg(e){
    const {index} = e.currentTarget.dataset;
    const {imageList} = this.data;
    imageList.splice(index,1)
    this.setData({
      imageList,
    })
   },

   selectType(e){
    const {id} = e.currentTarget.dataset;
    this.setData({
      type:id
    })
   },

   backindex(){
      wx.navigateBack()
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const call = wx.getStorageSync('call')
    if (call) {
      this.setData({
        call,
      })
    }
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