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
      elements: new Array(45).fill("wow").map((item, index) => {
        return {
          id: index + 1,
          name: Math.random() > 0.3 ? `${item}_${index + 1}听说长文本有问题 我不相信`:`${item}_${index + 1}`
        };
      }),
      data: "",
      list: [],
      map: {}
    };
  },

  mounted() {
    let data  = null
    data = '{"edges":[{"source":"1594194008942","sourceAnchor":3,"target":"1594194009842","targetAnchor":1}],"nodes":[{"id":"1594194008942","label":"wow_1","x":-292,"y":159,"_originId":1,"_timeStamp":"1594194008942"},{"id":"1594194009842","label":"wow_2","x":342,"y":313,"_originId":2,"_timeStamp":"1594194009842"}]}';
    this.$refs.g6process.initData(data);
  },

  methods: {
    handleEdit(data) {
      console.log(data);
      // 跳转页面后置灰
      this.$refs.g6process.resetStack()
    },

    handleSave(data) {
      console.log(data);
    }
  }
};
</script>

<style scoped>
#app{
  height: 2000px;
}
.g6-box {
  width: 90vw;
  height: 80vh;
  margin: 5vh auto;
  box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.25);
}
</style>

