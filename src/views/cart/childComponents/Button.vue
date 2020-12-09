<template>
    <div id="Button">
      <div class="btn"><span :class="{active: isActive}"> √ </span></div>
    </div>
</template>

<script>
    export default {
      name: "Button",
      props: {
        isActive: {
          type: Boolean,
          default: false
        }
      },
    }
</script>

<style scoped>
.btn {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  float: left;
  border: 2px solid #8b8e90;
  margin-top: 10px;
}
span {
  display: inline-block;
  width: 20px;
  height: 20px;
  color: #c6ced6;
  font-size: 20px;
}
  .active {
    color: #222222;
  }
</style>
