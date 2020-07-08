<template>
  <div class="g6-process-container">
    <panel :elements="elements" />
    <graph ref="graph" :data="data" />
    <tool-bar @save="handleSave" />
    <context-menu @edit="handleEdit" />
  </div>
</template>

<script>
import G6 from "@antv/g6";
import Panel from "./widgets/panel/panel";
import Graph from "./widgets/graph/graph";
import ToolBar from "./widgets/toolbar/toolbar";
import ContextMenu from "./widgets/contextmenu/contextmenu";

import registerBehavior from "./behavior";
import registerShape from "./shape";

export default {
  name: "G6Process",
  components: {
    Panel,
    Graph,
    ToolBar,
    ContextMenu
  },

  props: {
    elements: {
      type: Array,
      default: () => []
    },
    data: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      graph: null
    };
  },

  mounted() {
    registerBehavior(G6);
    registerShape(G6);
    this.initGraph();
  },

  methods: {
    initGraph() {
      this.graph = this.$refs.graph.drawGraph(G6);
    },

    handleEdit(data) {
      this.$emit("edit", data);
    },

    handleSave(data) {
      console.log(data);
      this.$emit("save", data);
    }
  }
};
</script>

<style scoped>
.g6-process-container {
  height: 100%;
  width: 100%;
  /* box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1); */
  position: relative;
  overflow: hidden;
  padding-top: 48px;
  padding-left: 200px;
  box-sizing: border-box;
  border: 1px solid #eee;
}
</style>