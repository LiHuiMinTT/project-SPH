<template>
  <div>
      <typenav/>
      <listcotainer/>
      <recommend/>
      <rank/>
      <like/>
      <floor v-for="list in floorList" :list='list' :key="list.id"></floor>
      <brand/>
  </div>
</template>

<script>
import listcotainer from './listcotainer.vue'
import recommend from './recommend.vue'
import rank from './rank.vue'
import like from './like.vue'
import floor from './floor.vue'
import brand from './brand.vue'

export default {
  components: { listcotainer,recommend,rank,like,floor,brand },
  computed:{
    floorList(){
      return this.$store.state.homeModule.floorList;
    },
    //获取当前的route位置
    // getRoute(){
    //   return this.$route.name;
    // }
  },
  async mounted(){
    this.$store.dispatch('homeModule/getFloorList');
    //每一次重新加载，都告诉search组件重置搜索参数。
    this.$bus.$emit('refreshinfo');
    try {
        await  this.$store.dispatch('userModule/getUserInfo');
    } catch (error) {
        
    }

  },


}
</script>