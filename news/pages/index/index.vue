<template>
  <view class="content">
    <view class="header">
      <text class="header-title">宠物新闻</text>
    </view>

    <view class="uni-list">
      <view
        class="uni-list-cell"
        hover-class="uni-list-cell-hover"
        v-for="item in news"
        :key="item.id"
        @tap="openinfo"
        :data-newsid="item.id"
      >
        <view class="item-row">
          <image :src="item.avatar" class="avatar" mode="aspectFill"></image>
          <view class="item-body">
            <text class="item-title">{{ item.title }}</text>
            <text class="item-date">{{ item.date }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
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
      uni.request({
        url: 'https://m1.apifoxmock.com/m1/7449493-7183823-default/api/cuiyuhan/news',
        method: 'GET',
        success: (res) => {
          const list = (res.data && res.data.newsList) || [];
          this.news = list.map(item => ({
            id: item.id,
            title: item.title,
            date: item.date,
            avatar: item.avatar
          }));
        },
        fail: (err) => {
          console.error('获取新闻列表失败', err);
        }
      });
    },

    openinfo(e) {
      const newsid = e.currentTarget.dataset.newsid;
      uni.navigateTo({
        url: '/pages/info/info?newsid=' + newsid
      });
    }
  }
};
</script>

<style scoped>
.content {
  padding: 20rpx;
  background-color: #f8f8f8;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  padding: 30rpx 20rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.04);
}

.header-title {
  font-size: 38rpx;
  font-weight: bold;
  color: #333;
   display: block;       
    width: 100%;          
    text-align: center;  
}

.uni-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx; 
}

.uni-list-cell {
  background-color: #ffffff;
  padding: 26rpx;
  border-radius: 16rpx;
  display: flex;
  box-shadow: 0 4rpx 10rpx rgba(0,0,0,0.05);
  width: 100%;
  box-sizing: border-box;
}

.uni-list-cell-hover {
  background-color: #f5f5f5;
}

.item-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.avatar {
  width: 140rpx;
  height: 140rpx;
  border-radius: 14rpx;
  margin-right: 24rpx;
  flex-shrink: 0;
  object-fit: cover;
}

.item-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-title {
  font-size: 32rpx;
  color: #222;
  line-height: 1.5;
  word-break: break-word;
  white-space: normal;
}

.item-date {
  margin-top: 10rpx;
  font-size: 26rpx;
  color: #999;
}

.uni-list,
.uni-list-cell {
  display: flex;
  flex-direction: column;
}
 /* #endif */
</style>