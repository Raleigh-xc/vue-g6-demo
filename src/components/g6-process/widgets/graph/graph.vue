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
    initGraph(G6) {
      const grid = new G6.Grid();
      const container = window.getComputedStyle(this.$refs["graph"]);
      const graph = new G6.Graph({
        container: this.$refs["graph"],
        height: parseInt(container.height),
        width: parseInt(container.width),
        modes: {
          default: ["drag-canvas", "zoom-canvas", "drag-node","add-edge"]
        },

        fitView: true,
        fitViewPadding: 50,

        defaultNode: {
          // size: 30, // 节点大小
          type: "process-node",
          size: [120, 30],
          // ...                 // 节点的其他配置
          // 节点样式配置
          style: {
            fill: "#9EC9FF",
            // stroke: "#666", // 节点描边色
            lineWidth: 1 // 节点描边粗细
          },
          // 节点上的标签文本配置
          labelCfg: {
            // 节点上的标签文本样式配置
            style: {
              fill: "#fff" // 节点标签文字颜色
            }
          },
          // linkPoints: {
          //   top: true,
          //   bottom: true,
          //   left: true,
          //   right: true,
          //   size: 5,
          //   fill: "#fff"
          // }
        },
        // 边在默认状态下的样式配置（style）和其他配置
        defaultEdge: {
          // ...                 // 边的其他配置
          // 边样式配置
          style: {
            opacity: 0.6, // 边透明度
            stroke: "grey" // 边描边颜色
          },
          // 边上的标签文本配置
          labelCfg: {
            autoRotate: true // 边上的标签文本根据边的方向旋转
          }
        },

        // 节点在各状态下的样式
        // nodeStateStyles: {
        //   // hover 状态为 true 时的样式
        //   hover: {
        //     fill: "lightsteelblue"
        //   },
        //   // click 状态为 true 时的样式
        //   click: {
        //     stroke: "#000",
        //     lineWidth: 3
        //   }
        // },
        // // 边在各状态下的样式
        // edgeStateStyles: {
        //   // click 状态为 true 时的样式
        //   click: {
        //     stroke: "steelblue"
        //   }
        // },

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