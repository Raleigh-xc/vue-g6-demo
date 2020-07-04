<template>
  <div id="app">
    <g6-process
      :elements="elements"
      :data="data"
    />
  </div>
</template>

<script>
import G6Process from "@/components/g6-process";
// import modaData from "@/mock/data"
export default {
  name: "App",
  components: { G6Process },
  data(){
    return {
      elements: new Array(5).fill('wow').map((item,index)=>{return {
        id:index + 1,
        title: item + '_' + (index + 1)
      }}),
      data: []
    }
  }
};
</script>

<style scoped>
#app {
  width: 80vw;
  height: 80vh;
}
</style>

