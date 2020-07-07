<template>
  <div class="toolbar">
    <div
      class="action"
      v-for="action in actions"
      :key="action.code"
      :title="action.name"
      @click="handleAction(action)"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  data() {
    return {
      actions: [
        {
          code: "UNDO",
          name: "undo"
        },
        {
          code: "REDO",
          name: "redo"
        },
        {
          code: "DELETE",
          name: "delete"
        },
        {
          code: "EMPTY",
          name: "empty"
        },
        {
          code: "ZOOM_IN",
          name: "zoom in"
        },
        {
          code: "ZOOM_OUT",
          name: "zoom out"
        }
      ]
    };
  },
  methods: {
    handleAction(action) {
      console.log(action);
      switch (action.code) {
        case "DELETE":
          this.handleDelete();
          break;
      }
    },

    handleDelete() {
      const { graph } = this.$parent;
      if (!graph) {
        return;
      }

      const nodes = graph.findAllByState("node", "selected");
      console.log(nodes);

      // 删除选中对的节点
      nodes.forEach(node => {
        graph.removeItem(node);
        // 删除节点相关的边 
        const edges = node.getEdges();
        edges.forEach(edge => {
          graph.removeItem(edge);
        });
      });

      const edges = graph.findAllByState("edge", "selected");
      console.log(edges);

      // 删除选中对的边
      edges.forEach(edge => {
        graph.removeItem(edge);
      });
    }
  }
};
</script>

<style scoped>
.toolbar {
  position: absolute;
  top: 20px;
  height: 40px;
  line-height: 40px;
  width: 50%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  background: #fff;
  left: 50%;
  transform: translate(-50%);
  border-radius: 5px;
  align-items: center;
}

.action {
  width: 20px;
  height: 20px;
  cursor: pointer;
  background: #000;
  margin-right: 30px;
}

.action:first-child {
  margin-left: 30px;
}
</style>