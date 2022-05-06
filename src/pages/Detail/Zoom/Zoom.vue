<template>
  <div class="spec-preview">
    <img :src="curImg || imgObj.imgUrl"/>
    <div class="event"  @mousemove="changeLocation"></div>
    <div class="big">
      <img :src="curImg || imgObj.imgUrl"  ref="big"/>
    </div>
    <div class="mask"  ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    data() {
      return {
        curImg:undefined,
      }},
    props:['imgList'],
    mounted() {
     this.$bus.$on('changeBigImg',(index)=>{
       this.curImg = this.imgList[index].imgUrl;
     }) 
    },
    computed:{
      //服务器还没回来数据时的处理
      imgObj(){
        return this.imgList[0] || {};
      }
    },
    methods: {
      changeLocation(event){
        const mask = this.$refs.mask;
        let x = event.offsetX - mask.offsetWidth/2;
        // console.log(mask.offsetX);//undefined
        let y = event.offsetY - mask.offsetHeight/2;
        if(x<0){x = 0};
        if(y<0){y=0};
        if(x>mask.offsetWidth) x = mask.offsetWidth;
        if(y>mask.offsetHeight) y =mask.offsetHeight;
        mask.style.top = y + 'px';
        mask.style.left = x + 'px';
        const big = this.$refs.big;
        big.style.top = -2*y + 'px';
        big.style.left = -2*x + 'px'
      }
    },
    
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 300%;
        max-width: 300%;
        height: 300%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>