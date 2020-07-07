export default function (G6) {
  G6.registerBehavior('add-edge', {
    getEvents() {
      return {
        'node:mousedown': 'onNodeMouseDown',
        // 'node:mouseup': 'onNodeMouseUp',
        'mousemove': 'onMouseMove',
        'mouseup': 'onMouseUp',

      };
    },

    onNodeMouseDown(evt) {

      const self = this;
      const graph = self.graph;

      const shapeName = evt.target.get('name')

      if (shapeName.includes('anchor')) {
        const node = evt.item.getModel().id;
        const nodeAnchor = evt.target.attrs._pointIndex
        self._addingEdge = true
        self._edge = graph.add('edge', {
          id: `edge_${Date.now()}`,
          source: node,
          sourceAnchor: nodeAnchor,
          target: node,
          style: {
            stroke: "#ccc",
            lineWidth: 1,
            lineAppendWidth: 10,
            endArrow: {
              path: G6.Arrow.triangle(10, 15, 0),
              d: 0,
              fill: '#fff'
            }
          },
          stateStyles: {
            selected: {
              stroke: '#5b8ff9'
            },
            hover: {
              stroke: '#5b8ff9'
            },
            adding: {
              lineDash: [10, 5],
            }
          }
        });
        graph.setItemState(self._edge, 'adding', true)
      }
    },

    // onNodeMouseUp(evt) {

    //   console.log('onNodeMouseUp',evt)

    //   const self = this;
    //   const graph = self.graph;

    //   const shapeName = evt.target.get('name')

    //   if (shapeName.includes('anchor') && self._addingEdge && self._edge) {
    //     const node = evt.item.getModel().id;
    //     const nodeAnchor = evt.target.attrs._pointIndex
    //     graph.updateItem(self._edge, {
    //       target: node,
    //       targetAnchor: nodeAnchor
    //     });
    //     self._addingEdge = false
    //     self._edge = null
    //   }
    // },

    onMouseMove(evt) {

      evt.preventDefault()

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
      console.log('onMouseUp', evt)

      const self = this;
      const graph = self.graph;

      const shapeName = evt.target.get('name')

      if (!shapeName) {
        return
      }

      if (shapeName.includes('anchor') && self._addingEdge && self._edge) {
        const node = evt.item.getModel().id;
        const nodeAnchor = evt.target.attrs._pointIndex
        graph.setItemState(self._edge, 'adding', false)
        graph.updateItem(self._edge, {
          target: node,
          targetAnchor: nodeAnchor
        });
        self._addingEdge = false
        self._edge = null
      } else if (self._edge) {
        graph.removeItem(self._edge);
        self._addingEdge = false
        self._edge = null
      }
    }

  });
}