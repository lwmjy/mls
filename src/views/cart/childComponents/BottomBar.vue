<template>
    <div class="BottomBar">
      <Button :is-active="bottombarbtn" @click.native="allclick"></Button>
      <div class="main">
        <div class="all">全选</div>
        <div class="hj">合计: {{totalprice}}</div>
        <div class="zs">总数: {{zongsu}} </div>
      </div>
    </div>
</template>

<script>
  import Button from "./Button";
    export default {
      name: "BottomBar",
      components: {
        Button
      },
      computed: {
          totalprice(){
            return this.$store.state.cartlist.filter((item)=>{
              if (item.checked){
                return item
              }
            }).reduce((pre,item)=>{
              return pre + item.price * item.count
            },0).toFixed(2)
          },
        zongsu(){
            return this.$store.state.cartlist.filter((item)=>{
              if (item.checked){
                return item
              }
            }).reduce((pre,item)=>{
              return pre + item.count
            },0)
        },
        bottombarbtn(){
            //取消默认全选按钮选中判断
            if (this.$store.state.cartlist.length === 0) return false
            return !(this.$store.state.cartlist.filter(item=> !item.checked).length)
           // return !(this.$store.state.cartlist.find(item=>!item.checked))
        }
      },
      methods: {
        allclick(){
          if (this.bottombarbtn == true){
            this.$store.state.cartlist.forEach(item=>item.checked = false)
          }else {
            this.$store.state.cartlist.forEach(item=>item.checked = true)
          }

        }
      }
    }
</script>

<style scoped>
.BottomBar {
  position: fixed;
  bottom: 49px;
  height: 44px;
  background-color: #cccccc;
  width: 375px;
}
  .all {
    margin-right: 30px;
  }
  .main {
    line-height: 44px;
  }
  .zs {
    display: inline-block;
    height: 44px;
    width: 140px;
    background-color: hotpink;
    font-size: 18px;
    color: #f2f5f8;
    text-align: center;
  }
  .all, .hj{
    float: left;
  }
  .zs {
    float: right;
  }
</style>
