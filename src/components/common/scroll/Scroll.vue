<template>
  <div id="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default(){
          return 1
        }
      },
      pullUpLoad: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {
        scroll: null,

      }
    },
    mounted() {
      // 1.创建BScroll对象
      this.scroll = new BScroll(document.querySelector('#wrapper'),{
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      });
      // 2.调用scroll对象中的scrollTo方法实现向上滚动
      this.scroll.scrollTo(0,0);
      this.scroll.on('scroll',(position)=>{
        this.$emit('scroll', position)
      })
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    },
  }
</script>

<style scoped>

</style>
