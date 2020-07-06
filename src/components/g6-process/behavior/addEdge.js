export default function (G6) {
  G6.registerBehavior('add-edge', {
    getEvents() {
      return {
        'node:mousedown': 'onMouseDown',
        'mousemove': 'onMouseMove',
        'node:mouseup': 'onMouseUp'
      };
    },

    onMouseDown(evt) {

      const self = this;
      const graph = self.graph;

      const shapeName = evt.target.cfg.name

      if (shapeName === 'link-point') {
        const node = evt.item.getModel().id;
        const nodeAnchor = evt.target.attrs._pointIndex
        self._addingEdge = true
        self._edge = graph.add('edge', {
          id: `node_${Date.now()}`,
          source: node,
          sourceAnchor: nodeAnchor,
          target: node,
          style: {
            stroke: '#5b8ff9',
            lineWidth: 1,
            lineAppendWidth: 5,
            endArrow: true
          },
          stateStyles: {
            selected: {
              stroke: '#999',
            }
          }
        });
      }
    },

    onMouseMove(evt) {
      const self = this;
      const graph = self.graph;
      const point = { x: evt.x, y: evt.y };
      if (self._addingEdge && self._edge) {
        graph.updateItem(self._edge, {
          target: point
        });
      }
    },

    onMouseUp(evt) {

      const self = this;
      const graph = self.graph;

      console.log(evt)
      console.log(evt.target)
      console.log(evt.target.cfg)

      const shapeName = evt.target.cfg.name

      if (shapeName === 'link-point' && self._addingEdge && self._edge) {
        const node = evt.item.getModel().id;
        const nodeAnchor = evt.target.attrs._pointIndex
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