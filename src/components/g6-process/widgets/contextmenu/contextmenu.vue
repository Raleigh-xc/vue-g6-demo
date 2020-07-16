<template>
  <ul class="g6-contextMenu">
    <li class="edit-btn" @click="handleEdit">编辑</li>
    <li class="delete-btn" @click="handleDelete">删除</li>
  </ul>
</template>

<script>
// import cloneDeep from "lodash.clonedeep";
// import state from '../../store'
import store from "../../store";

export default {
  name: "ContextMenu",

  data(){
    return {
      // message: state.message
    }
  },

  methods: {
    handleEdit() {
      const { graph } = this.$parent;
      if (!graph) {
        return;
      }

      store.exit()

      const item = graph.get("_contextMenuSelected");
      console.log(item.getModel());

      const model = item.getModel();
      const data = {
        id: model._originId,
        timeStamp: model._timeStamp
      };
      this.$emit("edit", data);
    },

    handleDelete() {
      const { graph } = this.$parent;
      if (!graph) {
        return;
      }

      const item = graph.get("_contextMenuSelected");
      console.log(item.getType());

      if (!item) {
        return;
      }

      const type = item.getType();

      if (type === "node") {
        const edges = item.getEdges();
        edges.forEach(edge => {
          graph.removeItem(edge);
        });
      }

      graph.removeItem(item);

      const contextMenu = document.querySelector(".g6-contextMenu");
      contextMenu.style.left = "-150px";
      graph.set("_contextMenuSelected", null);

      store.addStack()
    }
  }
};
</script>

<style scoped>
.g6-contextMenu {
  position: fixed;
  list-style-type: none;
  padding: 10px 8px;
  left: -150px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  font-size: 14px;
  color: #545454;
  width: 60px;
  text-align: center;
  line-height: 2;
  margin: 0;
  z-index: 10;
}
.g6-contextMenu li {
  cursor: pointer;
  list-style-type: none;
  list-style: none;
  margin-left: 0px;
}
.g6-contextMenu li:hover {
  color: #aaa;
}

.g6-contextMenu.edge-menu .edit-btn {
  display: none;
}
</style>