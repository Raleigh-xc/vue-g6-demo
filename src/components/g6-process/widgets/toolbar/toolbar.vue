<template>
  <div class="toolbar">
    <div class="item" v-for="edit in edits" :key="edit.code" :title="edit.name"></div>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  data() {
    return {
      edits: [
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
  }
};
</script>

<style scoped>
.toolbar{
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

.item{
  width: 20px;
  height: 20px;
  cursor: pointer;
  background: #000;
  margin-right: 30px;
}

.item:first-child{
  margin-left: 30px;
}
</style>