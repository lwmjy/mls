<template>
   <div class="cartlist">
     <Scroll class="content" :probe-type="3" ref="scroll">
       <cart-list-item
         v-for="(item,index) in cartlist"
         :item-info="item"
         :key="index"></cart-list-item>
     </Scroll>
     <bottom-bar></bottom-bar>
   </div>
</template>

<script>
  import cartListItem from './cartlistitem'
  import Scroll from "components/common/scroll/Scroll";
  import BottomBar from './BottomBar'
    export default {
      name: "cartlist",
      components: {
        Scroll,
        cartListItem,
        BottomBar
      },
      computed: {
        cartlist(){
          return this.$store.state.cartlist
        }
      },
      //一进入页面就重新计算一下内容高度
      activated() {
        this.$refs.scroll.scroll.refresh()
      }
    }
</script>

<style scoped>
  .cartlist {
    height: 100vh;

    overflow: hidden;
  }
  .content {
    height: calc(100% - 44px - 50px - 55px);
  }
</style>
