import G6 from '@antv/g6'

export default function () {
  G6.registerBehavior('hover-node', {
    getEvents() {
      return {
        'node:mouseenter': 'onMouseEnter',
        'node:mouseleave': 'onMouseLeave'
      }
    },

    onMouseEnter(evt) {
      const self = this;
      const graph = self.graph;
      const node = evt.item
      graph.setItemState(node, 'hover', true)
    },

    onMouseLeave(evt) {
      const self = this;
      const graph = self.graph;
      const node = evt.item
      graph.setItemState(node, 'hover', false)
    }
  });
}