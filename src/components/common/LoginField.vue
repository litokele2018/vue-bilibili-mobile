<template>
  <div>
    <van-field
      :label="label"
      :placeholder="placeholder"
      :rule="rule"
      :type="type"
      @input="handleInput"
      v-model="content"
    />
  </div>
</template>

<script>
export default {
  props: ["label", "placeholder", "type", "rule"],
  data() {
    return {
      content: ""
    };
  },
  methods: {
    handleInput() {
      this.checkRule()
    },
    checkRule() {
      let reg = new RegExp(this.rule)
      if (reg.test(this.content)) {
        this.$emit('success', this.content)
      }
    }
  }
};
</script>

<style>
</style>