<template>
  <div :id="id" class="g6-container"></div>
</template>

<script>
import G6 from "@antv/g6";
import defaultData from "@/mock/data.js";
export default {
  name: "G6-process",
  props: {
    id: {
      type: String,
      default: "G6Container"
    }
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      const minimap = new G6.Minimap({
        size: [100, 100],
        className: "g6-mini-map",
        type: "delegate"
      });
      const grid = new G6.Grid();

      const nodes = defaultData.nodes;
      nodes.forEach(node => {
        if (!node.style) {
          node.style = {};
        }
        node.style.lineWidth = 1;
        node.style.stroke = "#666";
        node.style.fill = "steelblue";
        switch (
          node.class // 根据节点数据中的 class 属性配置图形
        ) {
          case "c0": {
            node.type = "circle"; // class = 'c0' 时节点图形为 circle
            break;
          }
          case "c1": {
            node.type = "rect"; // class = 'c1' 时节点图形为 rect
            node.size = [35, 20]; // class = 'c1' 时节点大小
            break;
          }
          case "c2": {
            node.type = "ellipse"; // class = 'c2' 时节点图形为 ellipse
            node.size = [35, 20]; // class = 'c2' 时节点大小
            break;
          }
        }
      });

      const edges = defaultData.edges;
      edges.forEach(edge => {
        if (!edge.style) {
          edge.style = {};
        }
        edge.style.lineWidth = edge.weight; // 边的粗细映射边数据中的 weight 属性数值
        edge.style.opacity = 0.6;
        edge.style.stroke = "grey";
      });

      var container = window.getComputedStyle(document.getElementById(this.id));
      console.log(container);

      const graph = new G6.Graph({
        container: this.id, // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        // width: 1600, // Number，必须，图的宽度
        // height: 800, // Number，必须，图的高度
        height: parseInt(container.height),
        width: parseInt(container.width),
        // fitView: true,
        // fitViewPadding: [20, 40, 50, 20],

        modes: {
          default: ["drag-canvas", "zoom-canvas", "drag-node"] // 允许拖拽画布、放缩画布、拖拽节点
        },

        layout: {
          // Object，可选，布局的方法及其配置项，默认为 random 布局。
          type: "force", // 指定为力导向布局
          preventOverlap: true, // 防止节点重叠
          linkDistance: 100 // 指定边距离为100
          // nodeSize: 30        // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
        },

        defaultNode: {
          size: 30, // 节点大小
          // ...                 // 节点的其他配置
          // 节点样式配置
          style: {
            fill: "steelblue", // 节点填充色
            stroke: "#666", // 节点描边色
            lineWidth: 1 // 节点描边粗细
          },
          // 节点上的标签文本配置
          labelCfg: {
            // 节点上的标签文本样式配置
            style: {
              fill: "#fff" // 节点标签文字颜色
            }
          }
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
        nodeStateStyles: {
          // hover 状态为 true 时的样式
          hover: {
            fill: "lightsteelblue"
          },
          // click 状态为 true 时的样式
          click: {
            stroke: "#000",
            lineWidth: 3
          }
        },
        // 边在各状态下的样式
        edgeStateStyles: {
          // click 状态为 true 时的样式
          click: {
            stroke: "steelblue"
          }
        },

        plugins: [minimap, grid] // 将 minimap 实例配置到图上
      });

      graph.data(defaultData); // 读取 Step 2 中的数据源到图上
      graph.render(); // 渲染图

      // 监听鼠标进入节点
      graph.on("node:mouseenter", e => {
        const nodeItem = e.item;
        // 设置目标节点的 hover 状态 为 true
        graph.setItemState(nodeItem, "hover", true);
      });
      // 监听鼠标离开节点
      graph.on("node:mouseleave", e => {
        const nodeItem = e.item;
        // 设置目标节点的 hover 状态 false
        graph.setItemState(nodeItem, "hover", false);
      });
      // 监听鼠标点击节点
      graph.on("node:click", e => {
        // 先将所有当前有 click 状态的节点的 click 状态置为 false
        const clickNodes = graph.findAllByState("node", "click");
        clickNodes.forEach(cn => {
          graph.setItemState(cn, "click", false);
        });
        const nodeItem = e.item;
        // 设置目标节点的 click 状态 为 true
        graph.setItemState(nodeItem, "click", true);
      });
      // 监听鼠标点击节点
      graph.on("edge:click", e => {
        // 先将所有当前有 click 状态的边的 click 状态置为 false
        const clickEdges = graph.findAllByState("edge", "click");
        clickEdges.forEach(ce => {
          graph.setItemState(ce, "click", false);
        });
        const edgeItem = e.item;
        // 设置目标边的 click 状态 为 true
        graph.setItemState(edgeItem, "click", true);
      });
    }
  }
};
</script>

<style scoped>
.g6-container {
  height: 100%;
  width: 100%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}
.g6-container /deep/ .g6-mini-map {
  position: absolute;
  right: 0;
  bottom: 0;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
}
</style>