<template>
  <div id="app">
    <g6-process :elements="elements" :data="data" @edit="handleEdit" @save="handleSave"/>
  </div>
</template>

<script>
import G6Process from "@/components/g6-process";
// import modaData from "@/mock/data"
export default {
  name: "App",
  components: { G6Process },
  data() {
    return {
      elements: new Array(5).fill("wow").map((item, index) => {
        return {
          id: index + 1,
          title: item + "_" + (index + 1)
        };
      }),
      data: '',
      list: [],
      map: {}
    };
  },

  mounted() {
    // setTimeout(() => {
    //   this.data =
    //     '{"edges":[{"source":"1594194008942","sourceAnchor":3,"target":"1594194009842","targetAnchor":1}],"nodes":[{"id":"1594194008942","label":"wow_1","x":292,"y":159,"_originId":1,"_timeStamp":"1594194008942"},{"id":"1594194009842","label":"wow_2","x":342,"y":313,"_originId":2,"_timeStamp":"1594194009842"}]}';
    // }, 3000);
    
  },

  methods: {
    handleEdit(data) {
      console.log(data);
    },

    handleSave(data) {
      console.log(data);
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

