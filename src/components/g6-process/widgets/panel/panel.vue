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
      const id = `${Date.now()}`;
      graph.add("node", {
        id,
        x: position.x,
        y: position.y,
        label: element.name || element.code || element.title,
        _originId: element.id,
        _timeStamp: id
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
  width: 200px;
  /* box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1); */
  /* padding: 5px 0; */
  line-height: 40px;
  background: #f7f9fb;
  color: #666;
  font-size: 14x;
  overflow: hidden;
  padding-top: 50px;
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