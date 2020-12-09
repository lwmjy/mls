<template>
    <div class="cartlistitem">
      <div class="itemcontent">
          <Button :is-active="itemInfo.checked" @click.native="btnclick"></Button>
        <div class="left">
          <img :src="itemInfo.image" alt="" >
        </div>
        <div class="right">
          <div class="title">
            <span>{{itemInfo.title}}</span>
          </div>
          <div class="des">
            <span>{{itemInfo.desc}}</span>
          </div>
          <div class="price">
            <span class="jg">￥ {{itemInfo.price}}</span>
            <span>x {{itemInfo.count}}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Button from './Button'
    export default {
      name: "cartlistitem",
      props: {
        itemInfo: {
          type: Object
        }
      },
      components: {
        Button
      },
      methods: {
        btnclick() {
          this.itemInfo.checked = !this.itemInfo.checked
        }
      }
    }
</script>

<style scoped>
  .left img{
    height: 130px;
    width: 113px;
    float: left;
    margin-bottom: 10px;
  }
  .right {
    width: 200px;
    margin-left: 10px;
    float: left;
  }
  .title span{
    display: inline-block;
    width: 230px;
    font-size: 16px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .des span {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 230px;
    margin-top: 25px;
    font-size: 14px;
  }
  .price {
    margin-top: 35px;
  }
  .price .jg {
    color: orangered;
    margin-right: 100px;
    font-weight: bold;
  }
  .itemcontent {
    overflow: hidden;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    border-bottom: 1px solid #cccccc;
    height: 140px;
  }
</style>
