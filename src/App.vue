/* 
以.vue结尾的文件是vue的组件,和我们之前学的
Vue.component()组件一样,只不过以文件的形式来写组件
*/
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    
  },
};
</script>
<style lang="less">
body {
  margin: 0;
  padding: 0;
}
</style>