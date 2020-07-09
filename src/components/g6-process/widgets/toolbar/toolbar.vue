<template>
  <div class="toolbar">

    <span
      class="action iconfont icon-chexiao"
      :class="{disabled: !canUndo}"
      @click="handleAction('UNDO')"
    />

    <span
      class="action iconfont icon-zhongzuo"
      :class="{disabled: !canRedo}"
      @click="handleAction('REDO')"
    />

    <span class="divider"></span>

    <span class="action iconfont icon-bianji1" @click="handleAction('EDIT')"></span>
    <span class="action iconfont icon-shanchu" @click="handleAction('DELETE')"></span>

    <span class="divider"></span>

    <span class="action iconfont icon-fangda1" @click="handleAction('ZOOM_IN')"></span>
    <span class="action iconfont icon-suoxiao1" @click="handleAction('ZOOM_OUT')"></span>

    <span class="action iconfont icon-fangda" @click="handleAction('FULL')"></span>
    <span class="action iconfont icon-suoxiao" @click="handleAction('EXIT')"></span>

    <div class="btn-save" @click="handleSave">保存</div>
  </div>
</template>

<script>
import store from "../../store";

export default {
  name: "Toolbar",
  data() {
    return {
      rootState: store.state
    };
  },

  computed: {
    canUndo() {
      const { stackIndex } = this.rootState;
      return stackIndex > 0;
    },
    canRedo() {
      const { stackList, stackIndex } = this.rootState;
      return stackList.length - 1 > stackIndex;
    }
  },

  methods: {
    handleAction(action) {
      console.log(action);
      switch (action.code) {
        case "UNDO":
          this.handleUndo();
          break;
        case "REDO":
          this.handleRedo();
          break;
        case "EDIT":
          this.handleEdit();
          break;
        case "DELETE":
          this.handleDelete();
          break;
        case "ZOOM_IN":
          this.handleZoomIn();
          break;
        case "ZOOM_OUT":
          this.handleZoomOut();
          break;
        case "FULL":
          this.handleFull();
          break;
        case "EXIT":
          this.handleExit();
          break;
      }
    },

    handleUndo() {

      store.toolbar.undo();

      const graph = this.$parent.graph;
      let _doStack = graph.get("_doStack");
      let _doStackIndex = graph.get("_doStackIndex");
      const data = _doStack[_doStackIndex - 1];
      graph.read(data);
      graph.set("_doStackIndex", _doStackIndex - 1);
    },

    handleRedo() {
      const graph = this.$parent.graph;
      let _doStack = graph.get("_doStack");
      let _doStackIndex = graph.get("_doStackIndex");
      const data = _doStack[_doStackIndex + 1];
      graph.read(data);
      graph.set("_doStackIndex", _doStackIndex + 1);
    },

    handleEdit() {
      const { graph } = this.$parent;
      if (!graph) {
        return;
      }

      const nodes = graph.findAllByState("node", "selected");
      if (nodes.length === 1) {
        const item = nodes[0];
        const model = item.getModel();
        const data = {
          id: model._originId,
          timeStamp: model._timeStamp
        };
        this.$emit("edit", data);
      }
    },

    handleDelete() {
      const { graph } = this.rootState;
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

      // store.setMessageAction('save')
      // console.log(store.state.message)

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

      console.log(newData);

      this.$emit("save", JSON.stringify(newData));
    },

    handleFull() {
      // const data = this.$parent.graph.save()
      this.$parent.graph.clear();
      document.querySelector(".g6-process-container").requestFullscreen();
      // this.$parent.graph.changeSize(1700,700)
      this.$parent.graph.read({});
    },
    handleExit() {
      document.exitFullscreen();
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
  color: #666;
  text-align: center;
  line-height: 20px;
  margin: 0 10px;
}

.action.disabled{
  color: #ccc;
}

.action:first-child {
  margin-left: 20px;
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

.divider{
  height: 15px;
  width: 1px;
  background: #ddd;
  margin: 0 10px;
}
</style>