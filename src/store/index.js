import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

const store = new vuex.Store({
  state:{
    cartlist: []
  },
  mutations:{
    addCounter(state,payload){
      payload.count++
    },
    addToCart(state,payload){
      payload.count = 1
      payload.checked = true
      state.cartlist.push(payload)
    }
  },
  actions: {
    addCart(context, payload){
      return new Promise((resolve,reject)=>{
        let oldpayload = context.state.cartlist.find(item=>item.iid === payload.iid)
        if (oldpayload){
          context.commit('addCounter',oldpayload)
          resolve('当前商品数量加1')
        }else {
          context.commit('addToCart',payload)
          resolve('添加新的商品')
        }
        console.log(context.state.cartlist.length)
      })
    }
  }
})

export default store
