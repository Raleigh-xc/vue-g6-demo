export default function (G6) {
  G6.registerBehavior('click-edge', {
    getEvents() {
      return {
        'edge:click': 'onEdgeClick',
        'canvas:click': 'onCanvasClick'
      }
    },

    onEdgeClick(evt) {
      const self = this;
      const graph = self.graph;
      const edge = evt.item
      graph.setItemState(edge, 'selected', !edge.hasState('selected'))
    },

    onCanvasClick(){
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