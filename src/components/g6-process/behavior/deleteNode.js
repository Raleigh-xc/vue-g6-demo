export default function (G6) {
  G6.registerBehavior('delete-node', {
    getEvents () {
      return {
        'node:mousedown': 'onMouseDown',
        'mousemove': 'onMouseMove',
        'node:mouseup': 'onMouseUp'
      };
    },
  });
}