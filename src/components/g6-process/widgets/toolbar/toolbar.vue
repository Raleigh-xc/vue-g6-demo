<template>
  <div class="toolbar">
    <span
      class="action iconfont icon-chexiao"
      :class="{disabled: !canUndo}"
      @click="handleAction('UNDO',$event)"
    />

    <span
      class="action iconfont icon-zhongzuo"
      :class="{disabled: !canRedo}"
      @click="handleAction('REDO',$event)"
    />

    <span class="divider"></span>

    <span
      class="action iconfont icon-wenbenshuru"
      :class="{disabled: !canEdit}"
      @click="handleAction('EDIT',$event)"
    ></span>
    <span
      class="action iconfont icon-shanchu"
      :class="{disabled: !canDelete}"
      @click="handleAction('DELETE',$event)"
    ></span>

    <span class="divider"></span>

    <span
      class="action iconfont icon-fangda1"
      :class="{disabled: !canZoomIn}"
      @click="handleAction('ZOOM_IN',$event)"
    ></span>
    <span
      class="action iconfont icon-suoxiao1"
      :class="{disabled: !canZoomOut}"
      @click="handleAction('ZOOM_OUT',$event)"
    ></span>

    <span
      class="action iconfont icon-fangda"
      :class="{disabled: isFullScreen}"
      @click="handleAction('FULL',$event)"
    ></span>
    <span
      class="action iconfont icon-suoxiao"
      :class="{disabled: !isFullScreen}"
      @click="handleAction('EXIT',$event)"
    ></span>

    <span class="divider"></span>

    <span
      class="action iconfont icon-dingwei"
      @click="handleAction('FIT_VIEW',$event)"
    ></span>

    <span class="scale">当前比例：{{currentScale}}</span>

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
    },
    canEdit() {
      const { nodeSelectedList } = store.state;
      return nodeSelectedList.length === 1;
    },
    canDelete() {
      const { nodeSelectedList, edgeSelectedList } = store.state;
      return nodeSelectedList.length + edgeSelectedList.length > 0;
    },
    canZoomIn() {
      const { currentZoom, maxZoom } = this.rootState;
      return currentZoom < maxZoom;
    },
    canZoomOut() {
      const { currentZoom, minZoom } = this.rootState;
      return currentZoom > minZoom;
    },
    currentScale() {
      const { currentZoom } = store.state;
      return `${parseInt(currentZoom * 100)}%`;
    },
    isFullScreen() {
      const { fullScreen } = store.state;
      return fullScreen;
    }
  },

  methods: {
    handleAction(action, event) {
      const disabled = event.target.classList.contains("disabled");
      if (disabled) {
        console.log(`${action} is disabled`);
        return;
      }
      switch (action) {
        case "UNDO":
          store.undo();
          break;
        case "REDO":
          store.redo();
          break;
        case "EDIT":
          this.handleEdit();
          break;
        case "DELETE":
          store.delete();
          break;
        case "ZOOM_IN":
          store.zoomIn();
          break;
        case "ZOOM_OUT":
          store.zoomOut();
          break;
        case "FULL":
          store.full();
          break;
        case "EXIT":
          store.exit();
          break;
        case "FIT_VIEW":
          store.fitView();
          break;
      }
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
        const target = {
          id: model._originId,
          timeStamp: model._timeStamp
        };
        this.$emit("edit", target);
      }
    },

    handleSave() {
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
        const { id, x, y, _originId, _label, _timeStamp } = item;
        return {
          id,
          label: _label,
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

.action.disabled {
  color: #ccc;
  cursor: not-allowed;
}

.action:first-child {
  margin-left: 20px;
}

.scale {
  font-size: 14px;
  color: #666;
  margin-left: 10px;
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

.divider {
  height: 15px;
  width: 1px;
  background: #ddd;
  margin: 0 10px;
}
</style>