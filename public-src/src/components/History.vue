<template>
  <div class="history">
    <h1><i class="fa fa-arrow-left" @click="hide"></i> History</h1>
  </div>
</template>

<script>
  export default {
    methods: {
      hide() {
        this.$emit('hide')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .history {
    position: absolute;
    background: #fff;
    margin-left: -90vw;
    width: 90vw;
    height: 100vh;
    z-index: 1;
    box-shadow: none;
    transition: margin-left .4s
  }

  .open .history {
    margin-left: 0;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
  }
</style>