<template>
  <div class="food-picker">
    <transition name="roll">
      <div v-show="foodInfo.count" class="reduce-wrapper" @click="reduce">
        <i class="iconfont reduce"></i>
      </div>
    </transition>
    <transition name="fade">
      <div class="counter" v-show="foodInfo.count">{{ foodInfo.count }}</div>
    </transition>
    <div ref="addWrapper" class="add-wrapper" @click="add">
      <i class="iconfont add"></i>
    </div>
  </div>
</template>
<script>
import createBall from "@/components/ball/main.js";

export default {
  name: "food-picker",
  props: {
    foodInfo: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    reduce() {
      if (parseInt(this.foodInfo.count) > 0) {
        this.foodInfo.count--;
      }
    },
    add() {
      this.foodInfo.count++;

      const pos = this.$refs.addWrapper.getBoundingClientRect();

      const cartIconEl = document.getElementById("cartIcon");
      const cartIconPos = cartIconEl.getBoundingClientRect();

      const $ball = createBall({
        startX: pos.left,
        startY: pos.top,
        endX: cartIconPos.left,
        endY: cartIconPos.top,
        duration: "500ms",
      });
    },
  },
};
</script>
<style lang="less" scoped>
@duration: .6s;
.roll-enter-active,
.roll-leave-active {
  transition: transform @duration;
}
.roll-enter,
.roll-leave-to {
  transform: translateX(300%) rotate(calc(360deg * 1));
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity @duration;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.food-picker {
  max-width: 300px;

  display: flex;
  align-items: center;
  .add-wrapper {
    position: relative;
  }
  .add-wrapper,
  .reduce-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
  }
  .iconfont {
    color: #00a0dc;
    font-size: 50px;
  }
  .counter {
    width: 100px;
    text-align: center;
  }
}
</style>
