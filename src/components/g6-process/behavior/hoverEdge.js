import G6 from '@antv/g6'

export default function () {
  G6.registerBehavior('hover-edge', {
    getEvents() {
      return {
        'edge:mouseenter': 'onMouseEnter',
        'edge:mouseleave': 'onMouseLeave'
      }
    },

    onMouseEnter(evt) {
      const self = this;
      const graph = self.graph;
      const edge = evt.item
      graph.setItemState(edge, 'hover', true)
    },

    onMouseLeave(evt) {
      const self = this;
      const graph = self.graph;
      const edge = evt.item
      graph.setItemState(edge, 'hover', false)
    }
  });
}