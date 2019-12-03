<template>
  <div class="All">
    <!-- 下半部分主内容 -->
    <!-- <div class="cont clear">
        <div class="contOne clear">
            <img src="http://ok.166.net/lushi-app/post/2019-11-02/1572661272339_wj18th_.jpg" alt="">
            <div class="tal">
                <h2>酒馆战旗</h2>
                <p>购买的撒大大撒大阿萨撒大撒大阿萨阿萨大大阿萨阿萨大飒 撒 撒</p>
            </div>
            <van-button type="warning" size="mini" round>订阅</van-button>
        </div>
    </div>-->
    <!-- <transition name="fade" model="out-in">
      <div :is="NowCon"  ></div>
    </transition>-->

    <transition name="fade" model="out-in">
      <kazuOne v-if="nowShow" @changeByOne="changeByOne2"></kazuOne>
    </transition>

    <transition name="fade2" model="out-in">
      <kazuTwo v-if="nowShow2" @changeByTwo="changeByTwo2"></kazuTwo>
    </transition>



    <!-- 底部 -->
    <footer></footer>
    <!--  -->
  </div>
</template>

<script>
import { mapMutations } from "vuex";

import kazuOne from "@/components/kazuOne";
import kazuTwo from "@/components/kazuTwo";
export default {
  data() {
    return {
      NowCon: "kazuOne",
      nowShow: true,
      nowShow2:false
    };
  },
  methods: {
    ...mapMutations(["changeFoot2"]),
    changeByOne2(data) {
      this.nowShow = !this.nowShow;
      this.nowShow2 = !this.nowShow2;
    },
    changeByTwo2(data) {
      this.nowShow2 = !this.nowShow2;
      this.nowShow = !this.nowShow;
    }
  },
  mounted() {
    this.changeFoot2();
  },
  components: {
    kazuOne,
    kazuTwo
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active {
  animation: fadeInRight 0.5s;
}

.fade2-enter-active {
  animation: pulse 0.5s;
}

footer {
  width: 100%;
  height: 1rem;
}
</style>