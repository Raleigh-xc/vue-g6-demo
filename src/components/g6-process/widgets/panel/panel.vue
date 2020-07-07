<template>
  <div class="panel">
    <div
      class="element"
      v-for="(element,index) in elements"
      :key="index"
      draggable
      @dragstart="handleDragStart(element)"
      @dragend="handleDragEnd($event,element)"
    >{{element.title}}</div>
  </div>
</template>

<script>
export default {
  name: "Panel",
  props: {
    elements: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    handleDragStart(element) {
      console.log(element);
      // this._element = element;
      // const {graph} = this.$parent
      // graph.set('dragElement',true)
    },

    handleDragEnd(evt, element) {
      console.log(element);
      const { graph } = this.$parent;
      if (!graph) {
        return;
      }
      const position = graph.getPointByClient(evt.x, evt.y);
      graph.add("node", {
        id: `node_${Date.now()}`,
        x: position.x,
        y: position.y,
        type: "process-node",
        label: element.title,
        size: [160, 40],
        style: {
          radius: 5,
          stroke: "#ccc",
          fill: "#fff",
          lineWidth: 1
        },
        stateStyles: {
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
        labelCfg: {
          style: {
            fill: "#666",
            fontSize: 18
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.panel {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 10%;
  /* box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1); */
  /* padding: 5px 0; */
  line-height: 36px;
  background: #eee;
  color: #333;
  overflow: hidden;
}

.element {
  /* text-align: center; */
  padding-left: 20px;
  border-radius: 5px;
  box-sizing: border-box;
}
.element:hover {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
</style>