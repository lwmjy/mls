<template>
    <div class="DetailBottomBar">
      <div class="customer">客服</div>
      <div class="store">店铺</div>
      <div class="collection">收藏</div>
      <div class="shopcart" @click="cartClick"> + 购物车</div>
      <div class="buy">购买</div>
    </div>
</template>

<script>
    export default {
      name: "DetailBottomBar",
      methods: {
        cartClick(){
          this.$emit('cartClick')
        }
      }
    }
</script>

<style scoped>
.DetailBottomBar {
  position: relative;
  display: flex;
  background-color: #f2f5f8;
  height: 50px;
}
  .customer, .store, .collection, .shopcart, .buy {
    float: left;
    width: 30px;
    line-height: 49px;
    font-size: 16px;
    text-align: center;
    flex: 1;
    font-weight: bold;
  }
  .shopcart {
    background-color: yellow;
  }
  .buy {
  background-color: hotpink;
    color: #f2f5f8;
}
</style>
