import G6 from "@antv/g6";
import store from '../store'

export default function () {
  G6.registerBehavior('click-item', {
    getEvents () {
      return {
        'edge:click': 'onEdgeClick',
        'node:click': 'onNodeClick',
        'canvas:click': 'onCanvasClick'
      }
    },

    onEdgeClick (evt) {
      const self = this;
      const graph = self.graph;
      const curEdge = evt.item

      const edges = graph.findAllByState("edge", "selected");
      edges.forEach(edge => {
        if (edge.getModel().id !== curEdge.getModel().id) {
          graph.setItemState(edge, 'selected', false)
        }
      })

      const nodes = graph.findAllByState("node", "selected");
      nodes.forEach(node => {
        graph.setItemState(node, 'selected', false)
      })

      graph.setItemState(curEdge, 'selected', !curEdge.hasState('selected'))

      store.itemSelectChange()
    },

    onNodeClick (evt) {

      const self = this;
      const graph = self.graph;
      const curNode = evt.item

      const nodes = graph.findAllByState("node", "selected");
      nodes.forEach(node => {
        if (node.getModel().id !== curNode.getModel().id) {
          graph.setItemState(node, 'selected', false)
        }
      })

      const edges = graph.findAllByState("edge", "selected");
      edges.forEach(edge => {
        graph.setItemState(edge, 'selected', false)
      })

      const curId = curNode.getModel().id
      // 开始结束节点 不能选中
      if(curId !== 'START_NODE' && curId !== 'END_NODE'){
        graph.setItemState(curNode, 'selected', !curNode.hasState('selected'))
      }
      
      store.itemSelectChange()
    },

    onCanvasClick () {
      const self = this;
      const graph = self.graph;
      const edges = graph.findAllByState("edge", "selected");
      const nodes = graph.findAllByState("node", "selected");

      // 清除选中状态
      edges.forEach(edge => {
        graph.setItemState(edge, 'selected', false)
      });

      nodes.forEach(node => {
        graph.setItemState(node, 'selected', false)
      });

      store.itemSelectChange()
    }

  });
}