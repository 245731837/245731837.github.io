<template>
  <div class="All">
    <div class="foo">
      <router-link :to="{name:'indexNews'}">
        <van-icon name="orders-o" />
        <br/>
        资讯
      </router-link>

      <router-link :to="{name:'kazu'}">
        <van-icon name="records" />
        <br/>
        卡组
      </router-link>

      <router-link :to="{name:'guangchang'}">
        <van-icon name="contact" />
        <br/>
        炉友
      </router-link>

      <router-link :to="{name:'tool'}">
        <van-icon name="setting-o" />
        <br/>
        工具
      </router-link>

      <router-link :to="{name:'mine'}">
        <van-icon name="star-o" />
        <br/>
        我的
      </router-link>

    </div>

   
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "home"
    };
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
.router-link-exact-active,
.router-link-active {
  color: rgb(177, 109, 7);
}

a {
  color: #000;
}
.router-link {
  color: #000;
}

.All{
  position: relative;
  .foo{
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1rem;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    text-align: center;
    padding-top: 0.1rem;
    padding-bottom: 0.5rem;
    border-top: 1px solid rgb(202, 201, 201)
  }

}




</style>