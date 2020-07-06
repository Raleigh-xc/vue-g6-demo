<template>
  <div class="graph" ref="graph"></div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    drawGraph(G6) {
      const grid = new G6.Grid();
      const container = window.getComputedStyle(this.$refs["graph"]);
      const graph = new G6.Graph({
        container: this.$refs["graph"],
        height: parseInt(container.height),
        width: parseInt(container.width),
        modes: {
          default: [
            "drag-canvas",
            "zoom-canvas",
            "drag-node",
            "add-edge",
            "delete-edge",
            "click-edge",'click-select'
          ]
        },

        fitView: true,
        fitViewPadding: 50,
        plugins: [grid]
      });

      graph.data(this.data); // 读取 Step 2 中的数据源到图上
      graph.render(); // 渲染图

      // 监听鼠标进入节点
      // graph.on("node:mouseenter", e => {
      //   const nodeItem = e.item;
      //   // 设置目标节点的 hover 状态 为 true
      //   graph.setItemState(nodeItem, "hover", true);
      // });
      // // 监听鼠标离开节点
      // graph.on("node:mouseleave", e => {
      //   const nodeItem = e.item;
      //   // 设置目标节点的 hover 状态 false
      //   graph.setItemState(nodeItem, "hover", false);
      // });
      // // 监听鼠标点击节点
      // graph.on("node:click", e => {
      //   // 先将所有当前有 click 状态的节点的 click 状态置为 false
      //   const clickNodes = graph.findAllByState("node", "click");
      //   clickNodes.forEach(cn => {
      //     graph.setItemState(cn, "click", false);
      //   });
      //   const nodeItem = e.item;
      //   // 设置目标节点的 click 状态 为 true
      //   graph.setItemState(nodeItem, "click", true);
      // });
      // // 监听鼠标点击节点
      // graph.on("edge:click", e => {
      //   // 先将所有当前有 click 状态的边的 click 状态置为 false
      //   const clickEdges = graph.findAllByState("edge", "click");
      //   clickEdges.forEach(ce => {
      //     graph.setItemState(ce, "click", false);
      //   });
      //   const edgeItem = e.item;
      //   // 设置目标边的 click 状态 为 true
      //   graph.setItemState(edgeItem, "click", true);
      // });

      return graph;
    }
  }
};
</script>

<style scoped>
.graph {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>