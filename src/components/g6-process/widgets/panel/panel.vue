<template>
  <div class="panel">
    <div class="search">
      <input class="input" type="text" v-model="searchKey" placeholder="搜索" />
    </div>
    <div class="elements">
      <div
        class="element"
        :title="item.name"
        v-for="item in filterItems"
        :key="item.id"
        draggable
        @dragstart="handleDragStart(item)"
        @dragend="handleDragEnd($event,item)"
      >{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import store from "../../store";
import { fittingString } from "../../utils/fittingString";

export default {
  name: "Panel",
  props: {
    elements: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      searchKey: "",
      rootState: store.state
    };
  },

  computed: {
    filterItems() {
      const { searchKey, rootState } = this;
      const { graphNodes, unique } = rootState;
      if (unique) {
        return this.elements.filter(
          item => item.name.includes(searchKey) && !graphNodes.includes(item.id)
        );
      } else {
        return this.elements.filter(item => item.name.includes(searchKey));
      }
    }
  },

  methods: {
    handleDragStart() {},

    handleDragEnd(evt, item) {
      const { graph } = store.state;

      const position = graph.getPointByClient(evt.x, evt.y);
      const id = `${Date.now()}`;
      const node = {
        // type: 'base-node-2',
        // size: [160, 40],
        id,
        x: position.x,
        y: position.y,
        label: fittingString(item.name, 160, 16),
        _originId: item.id,
        _label: item.name,
        _timeStamp: id
      };

      graph.add("node", node);
      store.addNode(node);

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
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.search {
  height: 36px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input {
  height: 100%;
  width: 100%;
  border: none;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
  background: #fff;
  padding: 0 8px;
  font-size: 14px;
  color: #666;
}

input:focus,
select:focus,
textarea:focus {
  outline: -webkit-focus-ring-color auto 0;
}

.elements {
  height: 100px;
  flex: auto;
  overflow-y: auto;
}

.element {
  /* text-align: center; */
  padding: 0 20px;
  border-radius: 5px;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.element:hover {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

input::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #ccc;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #ccc;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #ccc;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #ccc;
}
</style>