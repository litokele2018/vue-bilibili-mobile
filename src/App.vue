<template>
  <div id="app">
    <keep-alive :exclude="['Article']">
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="less">
#app {
  background-color: #f4f4f4;
}
</style>
