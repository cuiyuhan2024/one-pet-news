"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      detail: null
    };
  },
  onLoad(options) {
    const id = Number(options.newsid);
    this.fetchDetail(id);
  },
  methods: {
    fetchDetail(id) {
      common_vendor.index.request({
        url: "https://m1.apifoxmock.com/m1/7449493-7183823-default/api/cuiyuhan/news",
        method: "GET",
        success: (res) => {
          const list = res.data && res.data.newsList || [];
          const item = list.find((n) => n.id === id);
          if (item) {
            this.detail = item;
          } else {
            common_vendor.index.__f__("warn", "at pages/info/info.vue:55", "未找到对应 id 的新闻:", id);
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/info/info.vue:59", "获取新闻详情失败", err);
        }
      });
    },
    onImageError(e) {
      common_vendor.index.__f__("log", "at pages/info/info.vue:65", "图片加载失败", e);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.detail
  }, $data.detail ? {
    b: common_vendor.t($data.detail.title),
    c: common_vendor.t($data.detail.date)
  } : {}, {
    d: $data.detail && $data.detail.avatar
  }, $data.detail && $data.detail.avatar ? {
    e: $data.detail.avatar,
    f: common_vendor.o((...args) => $options.onImageError && $options.onImageError(...args))
  } : {}, {
    g: $data.detail
  }, $data.detail ? {
    h: common_vendor.f($data.detail.content, (p, index, i0) => {
      return {
        a: common_vendor.t(p),
        b: index
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f52d2d81"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/info/info.js.map
