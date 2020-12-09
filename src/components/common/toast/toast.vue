<template>
    <div class="toast" v-show="show">
      <div>{{message}}</div>
    </div>
</template>

<script>
    export default {
      name: "toast",
      props: {
          message: {
            type: String
          },
        show: {
            type: Boolean
        }
      }
    }
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 38%;

  color: #f2f5f8;
  background-color: rgba(0,0,0,.7);
}
</style>
