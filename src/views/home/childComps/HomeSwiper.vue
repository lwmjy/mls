<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="homeswiperload">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper'

    export default {
      name: "HomeSwiper",
      props:{
        banners: {
          type: Array,
          default() {
            return [];
          }
        }
      },
      data(){
        return {
          swp: false
        }
      },
      components: {
        Swiper,
        SwiperItem
      },
      methods: {
          homeswiperload(){
            if (!this.swp){
              this.$emit('homeswiperload')
              this.swp = true
            }
          }
      }
    }
</script>

<style scoped>

</style>
