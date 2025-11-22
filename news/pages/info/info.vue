<template>
  <view class="page">
    <view class="header" v-if="detail">
      <text class="title">{{ detail.title }}</text>
	  <text class="source">崔宇涵 202311000520</text>
	  <text class="date">{{ detail.date }}</text>
    </view>

    <image
      v-if="detail && detail.avatar"
      :src="detail.avatar"
      class="cover"
      mode="widthFix"
      @error="onImageError"
    ></image>

    <view class="detail-content" v-if="detail">
      <view
        class="detail-paragraph"
        v-for="(p, index) in detail.content"
        :key="index"
      >
        <text class="detail-paragraph-text">{{ p }}</text>
      </view>
    </view>

    <view v-else class="empty">
      <text>未找到这条新闻的详情</text>
    </view>
  </view>
</template>

<script>
export default {
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
      uni.request({
        url: 'https://m1.apifoxmock.com/m1/7449493-7183823-default/api/cuiyuhan/news',
        method: 'GET',
        success: (res) => {
          const list = (res.data && res.data.newsList) || [];
          const item = list.find(n => n.id === id);
          if (item) {
            this.detail = item;
          } else {
            console.warn('未找到对应 id 的新闻:', id);
          }
        },
        fail: (err) => {
          console.error('获取新闻详情失败', err);
        }
      });
    },

    onImageError(e) {
      console.log('图片加载失败', e);
    }
  }
};
</script>



<style scoped>
.page {
  padding: 24rpx;
  box-sizing: border-box;
  background-color: #f8f8f8;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.header {
  margin-bottom: 16rpx;
  background-color: #ffffff;
  padding: 30rpx;
  border-radius: 12rpx;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.title {
  display: block;
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
  line-height: 1.5;
  margin-bottom: 12rpx;
  text-align: center;
}

.date, .source {
  display: block;      
  width: 100%;        
  text-align: center;  
  margin-top: 7.5rpx;    
  color: #999999;  
}

.cover {
  width: 100%;
  border-radius: 12rpx;
  margin: 20rpx 0;
  background-color: #f0f0f0;
  min-height: 200rpx;
}

.detail-content {
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 30rpx;
  margin-top: 20rpx;

  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.detail-paragraph {
  margin-bottom: 32rpx;
  width: 100%;
  box-sizing: border-box;
}

.detail-paragraph:last-child {
  margin-bottom: 0;
}

.detail-paragraph-text {
  font-size: 30rpx;
  color: #444;
  line-height: 1.8;
  word-break: break-word;
  white-space: normal;
  text-align: justify;
}

.detail-paragraph-text {
  display: inline-block;
  width: 100%;
}

.detail-paragraph-text {
  display: block;
}

.empty {
  margin-top: 60rpx;
  text-align: center;
  font-size: 28rpx;
  color: #999;
  background-color: #ffffff;
  padding: 60rpx 30rpx;
  border-radius: 12rpx;
  width: 100%;
  box-sizing: border-box;
}
</style>
