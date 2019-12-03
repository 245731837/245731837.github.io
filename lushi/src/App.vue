<template>
  <div id="app">
    <router-view :key="$route.fullPath"/>
    <foot v-if="footFlag"></foot>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
    computed:{
      ...mapState([
        "footFlag"
      ])
    }
}
</script>

<style lang="scss">

</style>
