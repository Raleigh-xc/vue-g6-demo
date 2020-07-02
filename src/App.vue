<template>
  <div id="app">
    <g6-process/>
  </div>
</template>

<script>
import G6Process from "@/components/g6-process";
export default {
  name: "App",
  components: { G6Process }
};
</script>

<style scoped>
#app {
  width: 90vw;
  height: 90vh;
}
</style>

