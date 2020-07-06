export default function (G6) {
  G6.registerBehavior('add-edge', {
    getEvents () {
      return {
        'node:mousedown': 'onMouseDown',
        'mousemove': 'onMouseMove',
        'node:mouseup': 'onMouseUp'
      };
    },

    onMouseDown (evt) {
      const self = this;
      const graph = self.graph;

      const node = evt.item.getModel().id;
      const nodeAnchor = evt.target.attrs._pointIndex
      const shapeName = evt.target.cfg.name

      if (shapeName === 'link-point') {
        self._addingEdge = true
        self._edge = graph.add('edge', {
          id: `node_${Date.now()}`,
          source: node,
          sourceAnchor: nodeAnchor,
          target: node,
          style: {
            stroke: '#5b8ff9',
            lineWidth: 1,
            endArrow: true
          },
          stateStyles:{
            selected: {
              stroke: '#aaa',
              lineWidth: 2,
            }
          }
        });
      }
    },

    onMouseMove (evt) {
      const self = this;
      const graph = self.graph;
      const point = { x: evt.x, y: evt.y };
      if (self._addingEdge && self._edge) {
        graph.updateItem(self._edge, {
          target: point
        });
      }
    },

    onMouseUp (evt) {
      const self = this;
      const graph = self.graph;

      const node = evt.item.getModel().id;
      const nodeAnchor = evt.target.attrs._pointIndex
      const shapeName = evt.target.cfg.name

      if (shapeName === 'link-point' && self._addingEdge && self._edge) {
        graph.updateItem(self._edge, {
          target: node,
          targetAnchor: nodeAnchor
        });
        self._addingEdge = false
        self._edge = null
      }
    }

  });
}