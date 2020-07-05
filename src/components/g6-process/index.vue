<template>
  <div class="g6-process-container">
    <panel :elements="elements" />
    <graph ref="graph" :data="data" />
  </div>
</template>

<script>
import G6 from "@antv/g6";
import Panel from "./widgets/panel/panel";
import Graph from "./widgets/graph/graph";
// import ToolBar from './widgets/toolbar/toolbar'

import Command from './command'
import registerBehavior from './behavior'
import registerShape from './shape'

export default {
  name: "G6Process",
  components: {
    Panel,
    Graph
    // ToolBar
  },

  props: {
    elements: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      graph: null,
      command: null
    };
  },

  mounted() {
    registerBehavior(G6);
    registerShape(G6)
    this.initGraph();
  },

  methods: {
    initGraph() {
      this.graph = this.$refs.graph.initGraph(G6);
      this.command = new Command(this.graph)
    }
  }
};
</script>

<style scoped>
.g6-process-container {
  height: 100%;
  width: 100%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  padding-left: 10%;
  box-sizing: border-box;
}
</style>