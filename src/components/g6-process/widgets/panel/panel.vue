<template>
  <div class="panel">
    <div
      class="element"
      v-for="(element,index) in elements"
      :key="index"
      draggable
      @dragstart="handleDragStart(element)"
      @dragend="handleDragEnd($event,element)"
    >{{element.name || element.code || element.title}}</div>
  </div>
</template>

<script>
import store from "../../store";

export default {
  name: "Panel",
  props: {
    elements: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    handleDragStart(item) {
      console.log(item);
    },

    handleDragEnd(evt, item) {
      const { graph } = store.state;

      const position = graph.getPointByClient(evt.x, evt.y);
      const id = `${Date.now()}`;
      const node = {
        id,
        x: position.x,
        y: position.y,
        label: item.name || item.code || item.title,
        _originId: item.id,
        _timeStamp: id
      }
      store.addNode(node)


      // graph.add("node", {
      //   id,
      //   x: position.x,
      //   y: position.y,
      //   label: item.name || item.code || item.title,
      //   _originId: item.id,
      //   _timeStamp: id
      // });

      // let _doStack = graph.get('_doStack')
      // _doStack.push(graph.save())
      // graph.set('_doStack',_doStack)
      // graph.set('_doStackIndex',_doStack.length - 1)
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