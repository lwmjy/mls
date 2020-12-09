<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="scrollContent">
      <detail-swiper :top-image="topImage"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop" ref="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" ref="commend"/>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
    </scroll>
    <!--    组件中加上native属性就可以监听组件了-->
    <BackTop @click.native="backclick" v-show="backtopshow"></BackTop>
    <detail-bottom-bar @cartClick="cartClick"></detail-bottom-bar>
    <toast :message="message" :show="show"></toast>
  </div>
</template>

<script>
  import DetailNavBar from 'views/detail/childComps/DetailNavBar'
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from  './childComps/DetailBaseInfo'
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from './childComps/DetailGoodsInfo';
  import DetailParamInfo from './childComps/DetailParamInfo'
  import Scroll from "components/common/scroll/Scroll";
  import DetailBottomBar from './childComps/DetailBottomBar'
  import BackTop from 'components/content/backTop/BackTop'
  import toast from "components/common/toast/toast";

  import {getDetail, Goods, Shop, GoodsParam} from "network/detail";

  import { mapActions } from 'vuex'

  export default {
      name: "detail",
      components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        Scroll,
        DetailBottomBar,
        BackTop,
        toast
      },
      data(){
        return {
          iid: null,
          topImage: [],
          goods: {},
          shop: {},
          detailInfo: {},
          paramInfo: {},
          recommends: {},
          topYs: [],
          currentIndex: 0,
          positionY: null,
          backtopshow: false,
          message: '',
          show: null
        }
      },
    created() {
        this.iid = this.$route.params.iid
        getDetail(this.iid).then((res)=>{
          // console.log(res)
          // 1、将网络请求过来的数据保存到data里
          const data = res.result;
          // 2、取出顶部轮播图数据
          this.topImage = data.itemInfo.topImages;

          // 3.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

          // 4.创建店铺信息的对象将请求过来的数据保存到这个shop对象里
          this.shop = new Shop(data.shopInfo);

          // 5.保存商品的详情数据
          this.detailInfo = data.detailInfo;

          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

          this.iid = res.iid
        });

      },
    methods: {
       ...mapActions(['addCart']),
      imageLoad(){
          this.$refs.scroll.scroll.refresh()

          this.topYs = []
          this.topYs.push(0)
          this.topYs.push(this.$refs.shop.$el.offsetTop)
          this.topYs.push(this.$refs.commend.$el.offsetTop)
          this.topYs.push(this.$refs.params.$el.offsetTop)
        // console.log(this.topYs)
      },
      titleClick(index){
        // this.$refs.scroll.scroll.refresh()
        this.$refs.scroll.scroll.scrollTo(0, -this.topYs[index],500)
      },
      scrollContent(position){
        //0, 500, 735, 15576
        // 顶部导航字体颜色跟随屏幕滚动而改变的判断
        this.positionY = -position.y
        if (this.positionY <= this.topYs[0]){
          this.$refs.nav.currentIndex = 0
        }else if(this.positionY <= this.topYs[1] && this.positionY >= this.topYs[0]){
          this.$refs.nav.currentIndex = 1
        } else if (this.positionY <= this.topYs[2] && this.positionY >= this.topYs[1]){
          this.$refs.nav.currentIndex = 2
        } else if (this.positionY >= this.topYs[3]){
          this.$refs.nav.currentIndex = 3
        }

        // 屏幕滚动大于1000时，返回顶部按钮显示与隐藏的判断
        if (this.positionY > 1000){
          this.backtopshow = true
        }else {
          this.backtopshow = false
        }
      },
      backclick(){
        this.$refs.scroll.scroll.scrollTo(0,0,500)
      },

      // 获取购物车商品信息
      cartClick(){
        // 声明一个空对象
        const cartinfo = {};
        cartinfo.title = this.goods.title;
        cartinfo.image = this.topImage[0];
        cartinfo.desc = this.goods.desc;
        cartinfo.price = this.goods.realPrice;
        cartinfo.iid = this.iid
        // console.log(cartinfo)

        //toast购物车添加判断
        this.addCart(cartinfo).then(res=>{
          this.show = true
          this.message = res;
          setTimeout(()=>{
            this.show = false
          },1500)
        })
        // this.$store.dispatch('addCart',cartinfo).then((res)=>{
        //   console.log(res)
        // })
      }
      }

    }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 50px);
  }
</style>
