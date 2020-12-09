<template>
      <NavBar>
        <div slot="left" class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="center">
          <span v-for="(item,index) in title"
                class="DetailNavBar"
                :class="{active: currentIndex == index}"
                @click="detailnavclick(index)">{{item}}</span>
        </div>
      </NavBar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
    export default {
      name: "DetailNavBar",
      data(){
        return {
          title: ['商品', '参数','评论','推荐'],
          currentIndex: 0
        }
      },
      components: {
        NavBar
      },
      methods: {
        detailnavclick(index){
          this.currentIndex = index
          this.$emit('titleClick', index)
        },
        backClick(){
          this.$router.back()
        }
      }
    }
</script>

<style scoped>
  .center {
  display: flex;
  }
  .DetailNavBar {
    flex: 1;
    font-size: 15px;
  }
  .active {
  color: var(--color-high-text)
  }

  .back img {
    margin-top: 12px;
  }
</style>
