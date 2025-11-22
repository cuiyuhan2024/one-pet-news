"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      news: []
    };
  },
  onLoad() {
    this.fetchNewsList();
  },
  methods: {
    fetchNewsList() {
      common_vendor.index.request({
        url: "https://m1.apifoxmock.com/m1/7449493-7183823-default/api/cuiyuhan/news",
        method: "GET",
        success: (res) => {
          const list = res.data && res.data.newsList || [];
          this.news = list.map((item) => ({
            id: item.id,
            title: item.title,
            date: item.date,
            avatar: item.avatar
          }));
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/index/index.vue:53", "获取新闻列表失败", err);
        }
      });
    },
    openinfo(e) {
      const newsid = e.currentTarget.dataset.newsid;
      common_vendor.index.navigateTo({
        url: "/pages/info/info?newsid=" + newsid
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.news, (item, k0, i0) => {
      return {
        a: item.avatar,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.date),
        d: item.id,
        e: common_vendor.o((...args) => $options.openinfo && $options.openinfo(...args), item.id),
        f: item.id
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
