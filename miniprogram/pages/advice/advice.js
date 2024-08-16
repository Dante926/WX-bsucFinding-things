// feedback.js
import {
  ajax
} from '../../utils/index'
Page({
  data: {
    name: '',
    contact: '',
    feedback: ''
  },

  // 处理输入变化
  handleInputChange(e) {
    const {
      value
    } = e.detail;
    const field = e.currentTarget.dataset.field;
    this.setData({
      [field]: value
    });
  },

  // 提交反馈
  handleSubmit() {

    const {
      name,
      contact,
      feedback,
    } = this.data;

    if (!name || !contact || !feedback) {
      wx.showToast({
        title: '请完整填写反馈信息',
        icon: 'none'
      });
      return;
    }
    // 这里可以添加将数据提交到服务器的逻辑
    const params = {
      name,
      contact,
      feedback,
      openid: wx.getStorageSync('openid'),
    }
    ajax('/getapi/pushadvice', 'post', params)
      .then(result => {
        console.log(result);
        if (result.data.message === 'Success') {
          this.setData({
            name: '',
            contact: '',
            feedback: ''
          });
          wx.switchTab({
            url: '../my/my',
          })
          wx.showToast({
            title: '反馈提交成功',
            icon: 'success'
          });

        } else {
          wx.showToast({
            title: '反馈失败,请重试...',
            icon: 'none'
          })
        }
      })
  }
});