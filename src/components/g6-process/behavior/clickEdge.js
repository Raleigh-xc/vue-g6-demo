import G6 from "@antv/g6";
// import store from '../store'

export default function () {
  G6.registerBehavior('click-edge', {
    getEvents () {
      return {
        'edge:click': 'onEdgeClick',
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
    },

    onCanvasClick () {
      const self = this;
      const graph = self.graph;
      const edges = graph.findAllByState("edge", "selected");

      // 清除选中状态
      edges.forEach(edge => {
        graph.setItemState(edge, 'selected', false)
      });
    }

  });
}