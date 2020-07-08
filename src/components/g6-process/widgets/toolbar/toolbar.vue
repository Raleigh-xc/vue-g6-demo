<template>
  <div class="toolbar">
    <span
      class="action icon iconfont"
      :class="`icon-` + action.icon"
      v-for="action in actions"
      :key="action.code"
      @click="handleAction(action)"
    ></span>

    <div class="btn-save" @click="handleSave">保存</div>
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
          name: "undo",
          icon: "chexiao"
        },
        {
          code: "REDO",
          name: "redo",
          icon: "zhongzuo"
        },
        {
          code: "DELETE",
          name: "delete",
          icon: "shanchu"
        },
        // {
        //   code: "EMPTY",
        //   name: "empty",
        //   icon: 'shanchu'
        // },
        {
          code: "ZOOM_IN",
          name: "zoom in",
          icon: "fangda1"
        },
        {
          code: "ZOOM_OUT",
          name: "zoom out",
          icon: "suoxiao1"
        }
        // {
        //   code: "MAX",
        //   name: "zoom in",
        //   icon: 'fangda1'
        // },
        // {
        //   code: "ZOOM_OUT",
        //   name: "zoom out",
        //   icon: 'suoxiao1'
        // },
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
        case "ZOOM_IN":
          this.handleZoomIn();
          break;
        case "ZOOM_OUT":
          this.handleZoomOut();
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
        // 删除节点相关的边
        const edges = node.getEdges();
        edges.forEach(edge => {
          graph.removeItem(edge);
        });

        graph.removeItem(node);
      });

      const edges = graph.findAllByState("edge", "selected");
      console.log(edges);

      // 删除选中对的边
      edges.forEach(edge => {
        graph.removeItem(edge);
      });
    },

    handleZoomIn() {
      const { graph } = this.$parent;
      if (!graph) {
        return;
      }
      const currentZoom = graph.getZoom();
      graph.zoomTo(currentZoom + 0.5);
    },

    handleZoomOut() {
      const { graph } = this.$parent;
      if (!graph) {
        return;
      }
      const currentZoom = graph.getZoom();
      graph.zoomTo(currentZoom - 0.5);
    },

    handleSave() {
      // console.log(JSON.stringify());
      const data = this.$parent.graph.save();
      const edges = data.edges.map(item => {
        const { source, sourceAnchor, target, targetAnchor } = item;
        return {
          source,
          sourceAnchor,
          target,
          targetAnchor
        };
      });

      const nodes = data.nodes.map(item => {
        const { id, label, x, y, _originId, _timeStamp } = item;
        return {
          id,
          label,
          x,
          y,
          _originId,
          _timeStamp
        };
      });

      const newData = {
        edges,
        nodes
      };

      console.log(newData)

      this.$emit("save", JSON.stringify(newData));
    }
  }
};
</script>

<style scoped>
@import url(../../static/fonts/iconfont.css);

.toolbar {
  position: absolute;
  top: 0;
  height: 48px;
  height: 48px;
  width: 100%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  background: #fff;
  left: 0;
  align-items: center;
}

.action {
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-right: 30px;
  color: #666;
}

.action:first-child {
  margin-left: 30px;
}

.btn-save {
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #fff;
  width: 60px;
  background: #1890ff;
  border-radius: 3px;
  position: absolute;
  right: 10px;
  cursor: pointer;
}
</style>