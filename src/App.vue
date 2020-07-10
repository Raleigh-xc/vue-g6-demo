<template>
  <div id="app">
    <div class="g6-box">
      <g6-process ref="g6process" :elements="elements" @edit="handleEdit" @save="handleSave" />
    </div>
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
      data: "",
      list: [],
      map: {}
    };
  },

  mounted() {
    // const data = '{"edges":[{"source":"1594194008942","sourceAnchor":3,"target":"1594194009842","targetAnchor":1}],"nodes":[{"id":"1594194008942","label":"wow_1","x":292,"y":159,"_originId":1,"_timeStamp":"1594194008942"},{"id":"1594194009842","label":"wow_2","x":342,"y":313,"_originId":2,"_timeStamp":"1594194009842"}]}';
    this.$refs.g6process.initData();
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
.g6-box {
  width: 90vw;
  height: 80vh;
  margin: 5vh auto;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.25);
}
</style>

