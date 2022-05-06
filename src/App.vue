<template>
  <div id="app">
    <headtop/>
    <router-view></router-view>
    <footdown v-show='$route.meta.footshow'/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import headtop from './components/head/header.vue'
import footdown from './components/footer/footer.vue'
import '@/mock/serve';

export default {
  name: 'App',
  components: {
    headtop,
    footdown,
  },
  methods: {
       ...mapActions("homeModule", ["getCategoryList"]),
  },
    mounted() {
      //如果有需要，可以传参
    this.getCategoryList();
  },
}

</script>

<style>

</style>
