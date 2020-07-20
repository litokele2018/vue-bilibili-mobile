<template>
  <div class="edit-content">
    <div>{{left}}</div>
    <slot name="right" />
  </div>
</template>

<script>
export default {
  props: {
    left: {
      type: String,
      default: 'nothing'
    }
  }
};
</script>

<style lang="less" scoped>
  .edit-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 2.778vw 5.556vw;
    color: #666;
    font-size: 3.889vw;
    border-bottom: 0.278vw solid #eee;
  }
</style>
