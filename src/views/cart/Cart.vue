<template>
  <div class="Cart">
    <navbar class="Cart-nav">
      <div slot="center">购物车({{cartlength}})</div>
    </navbar>
      <Cartlist></Cartlist>
  </div>

</template>

<script>
  import navbar from 'components/common/navbar/NavBar'
  import Cartlist from './childComponents/cartlist'

  export default {
    name: "Cart",
    components: {
      navbar,
      Cartlist,

    },
    computed: {
      cartlength(){
        return this.$store.state.cartlist.length
      }
    },

  }
</script>

<style scoped>
  /*.Cart {*/
  /*  height: 100vh;*/

  /*  overflow: hidden;*/
  /*}*/
.Cart-nav {
  background-color: var(--color-tint);
  color: #f2f5f8;
}

</style>
