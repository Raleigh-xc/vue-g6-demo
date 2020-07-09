<template>
  <div class="graph" ref="graph"></div>
</template>

<script>
import store from "../../store";

export default {
  props: {
    data: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      graph: null
    };
  },

  watch: {
    data(value) {
      if (this.graph) {
        let data = value ? JSON.parse(value) : {};
        this.graph.read(data);
      }
    }
  },

  methods: {
    drawGraph(G6) {
      const grid = new G6.Grid();
      const minimap = new G6.Minimap({
        size: [150, 100]
      });

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
            "click-select",

            "add-edge",
            "click-edge",
            "hover-node",
            "context-menu"
          ]
        },

        defaultNode: {
          type: "base-node",
          size: [160, 40],
          style: {
            radius: 5,
            stroke: "#ccc",
            fill: "#fff",
            lineWidth: 2
          },
          labelCfg: {
            style: {
              fill: "#666",
              fontSize: 18
            }
          }
        },

        nodeStateStyles: {
          selected: {
            stroke: "#5b8ff9",
            "anchor-0": {
              opacity: 1
            },
            "anchor-1": {
              opacity: 1
            },
            "anchor-2": {
              opacity: 1
            },
            "anchor-3": {
              opacity: 1
            }
          },
          hover: {
            stroke: "#5b8ff9",
            "anchor-0": {
              opacity: 1
            },
            "anchor-1": {
              opacity: 1
            },
            "anchor-2": {
              opacity: 1
            },
            "anchor-3": {
              opacity: 1
            }
          }
        },

        defaultEdge: {
          style: {
            stroke: "#ccc",
            lineWidth: 2,
            lineAppendWidth: 10,
            endArrow: true
          }
        },

        edgeStateStyles: {
          selected: {
            stroke: "#5b8ff9"
          },
          hover: {
            stroke: "#5b8ff9"
          },
          adding: {
            lineDash: [10, 5]
          }
        },

        plugins: [grid, minimap]
      });

      let data = this.data ? JSON.parse(this.data) : {};

      graph.data(data);
      graph.render();

      this.graph = graph;
      store.initGraph(graph)

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
  z-index: 1;
}

.graph /deep/ .g6-minimap {
  position: absolute;
  right: 0;
  bottom: 0;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
}
</style>

