<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="toptbcontrol"
    class="tbc"
    v-show="isfixed"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="scrollcontent"
            @pullingUp="loadmore"
            :pullUpLoad="true">
    <home-swiper :banners="banners" @homeswiperload="swiperload"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tbcontrol"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <BackTop @click.native="backclick" v-show="backtopshow"></BackTop>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from './childComps/RecommendView';
  import FeatureView from './childComps/FeatureView'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import {getHome,getHomeData} from 'network/home';
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  export default {
    name: "home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop,
    },
    data(){
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop':{page: 0, list: []},
          'new':{page: 0, list: []},
          'sell':{page: 0, list: []},
        },
        currentType: 'pop',
        backtopshow: false,
        swiperoffsetTop: '',
        isfixed: false,
        saveY: 0
      }
    },
    created() {
      this.getHome();
      this.getHomeData('pop')
      this.getHomeData('new')
      this.getHomeData('sell')
    },
    mounted() {
      this.$bus.$on('imgload',()=>{
        //调用scroll框架中的refresh函数重新计算滚动部分的内容高度
        this.$refs.scroll.scroll.refresh()
      })

    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      },
    },
    destroyed() {
      console.log('home destroyed');
    },
    activated() {
      this.$refs.scroll.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y
    },
    methods: {
      tabClick(index){
        console.log(index)
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        // 解决tabcontrl滚动切换时两个tabcontrl背景颜色不一致的问题
        this.$refs.tbcontrol.currentIndex = index
        this.$refs.toptbcontrol.currentIndex = index
      },

      // 网络请求相关
      getHome(){
        getHome().then((res)=>{
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeData(type){
        const page = this.goods[type].page + 1
        getHomeData(type,page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1
          this.$refs.scroll.scroll.finishPullUp()
        });
      },
      backclick(){
       this.$refs.scroll.scroll.scrollTo(0,0,500)
      },
      scrollcontent(position){
        if ((-position.y) > 1000){
          this.backtopshow = true
        }else {
          this.backtopshow = false
        }

        //这是屏幕滚动到顶部显示与隐藏顶部复制出来多的tabcontrl的判断条件
        if((-position.y) >= this.swiperoffsetTop) {
          this.isfixed = true
        }else {
          this.isfixed = false
        }

      },
      loadmore(){
        this.getHomeData(this.currentType)
      },

      swiperload(){
        this.swiperoffsetTop = this.$refs.tbcontrol.$el.offsetTop
        console.log(this.swiperoffsetTop)
      }
    }

  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tbc{
    position: relative;
    z-index: 9;
  }

</style>
