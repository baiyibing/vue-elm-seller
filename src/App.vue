<template>
  <div @touchmove.prevent id="app" :class="assertDevice()">
    <Header :seller="seller"></Header>

    <div class="tab-bar-container">
      <tab-bar :data="tabData" @change-tab="handleTabChange" :initial-index="0"></tab-bar>
    </div>
    <div class="tab-panel-container">
      <compnoent :is="activePanel" :seller="seller" />
    </div>
  </div>
</template>

<script>
import { fetchSellerData } from "@/helper/request";
import TabBar from "./components/tab-bar";
import Goods from "./views/goods/index.vue";
import Shop from "./views/shop/index.vue";
import Ratings from "./views/ratings/index.vue";
import Header from "./components/header/index.vue";
const mapDynamicComponent = {
  1: "goods",
  2: "ratings",
  3: "shop",
};

const tabData = [
  {
    label: "商品",
    id: 1,
  },
  {
    label: "评论",
    id: 2,
  },
  {
    label: "商家",
    id: 3,
  },
];
export default {
  name: "App",
  data() {
    return {
      tabData,
      activePanel: "goods",
      seller: {},
    };
  },
  created() {
    fetchSellerData()
      .then((response) => {
        this.seller = response;
      })
      .catch();
  },

  methods: {
    handleTabChange(id) {
      this.activePanel = mapDynamicComponent[id];
    },
    assertDevice() {
      if (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) {
        return { isSafari: true };
      }
    },
  },

  components: {
    Goods,
    Shop,
    Ratings,
    Header,
    TabBar,
  },
};
</script>

<style>
body,
html,
#app {
  overflow: hidden;
  height: 100vh;
}

.isSafari#app {
  height: calc(100vh - 150px);
}
.tab-panel-container {
  height: calc(100vh - 257px - 93px);
  color: #07111b;
}
.isSafari .tab-panel-container {
  height: calc(100vh - 257px - 93px - 150px);
}
</style>
