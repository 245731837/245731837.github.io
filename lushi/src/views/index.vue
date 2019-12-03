<template>
  <div class="All">


    <router-view></router-view>

    <footer></footer>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    selected(name) {
      this.active = name;
    },
    showPopup() {
      this.show = true;
    }
  }
};
</script>

<style lang="scss" scoped>

.All {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 0.5rem;

  footer{
    width: 100%;
    height: 1rem;
  }
}
</style>