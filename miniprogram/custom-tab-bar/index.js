Component({
  data: {
    select: 0,
    list: [{
        iconPath: "images/tabbar/主页.png",
        selectedIconPath: "images/tabbar/主页 (1).png",
        pagePath: "pages/index/index",
        text: "首页",
        type: 0
      },
      {
        iconPath: "images/tabbar/分类.png",
        selectedIconPath: "images/tabbar/分类 (1).png",
        pagePath: "pages/classify/classify",
        text: "分类",
        type: 0
      },
      {
        type: 1
      },
      {
        iconPath: "images/tabbar/收藏.png",
        selectedIconPath: "images/tabbar/收藏 (1).png",
        pagePath: "pages/collection/collection",
        text: "收藏",
        type: 0
      },
      {
        iconPath: "images/tabbar/个人.png",
        selectedIconPath: "images/tabbar/个人 (1).png",
        pagePath: "pages/my/my",
        text: "个人",
        type: 0
      }
    ]
  },

  methods: {
    selectPage(e) {
      const {
        index,
        page,
        type
      } = e.currentTarget.dataset; /* 解构数据 */
      if (index !== this.data.select && type === 0) {
        // 常规条件下使用navigator进行跳转，组件下使用switchTab
        wx.switchTab ({
          url: '../../'+page,
        })
      }
    }
  }
})