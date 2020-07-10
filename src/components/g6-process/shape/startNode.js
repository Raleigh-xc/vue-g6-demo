import G6 from '@antv/g6'
export default function () {
  G6.registerNode('start-node', {

    afterDraw(cfg, group) {
      this._drawAnchor(cfg, group)
    },

    _drawAnchor(cfg, group) {
      const size = cfg.size;
      const width = size[0];
      const height = size[1];

      group.addShape('circle', {
        attrs: {
          x: 0 - width / 2,
          y: 0,
          r: 5,
          fill: '#fff',
          stroke: '#5b8ff9',
          opacity: 0,
          _point: [0, 0.5],
          _pointIndex: 0
        },
        name: 'anchor-0'
      });

      group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0 - height / 2,
          r: 5,
          fill: '#fff',
          stroke: '#5b8ff9',
          opacity: 0,
          _point: [0.5, 0],
          _pointIndex: 1
        },
        name: 'anchor-1'
      });

      group.addShape('circle', {
        attrs: {
          x: 0 + width / 2,
          y: 0,
          r: 5,
          fill: '#fff',
          stroke: '#5b8ff9',
          opacity: 0,
          _point: [1, 0.5],
          _pointIndex: 2
        },
        name: 'anchor-2'
      });

      group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0 + height / 2,
          r: 5,
          fill: '#fff',
          stroke: '#5b8ff9',
          opacity: 0,
          _point: [0.5, 1],
          _pointIndex: 3
        },
        name: 'anchor-3'
      });
    },

    getAnchorPoints() {
      return [
        [0, 0.5], // 左侧中间
        [0.5, 0],
        [1, 0.5], // 右侧中间
        [0.5, 1]
      ];
    },

    // _select(group) {
    //   const keyShape = group.getFirst()

    //   keyShape.attr({
    //     'stroke': '#5b8ff9'
    //   })

    //   const points = group.findAll(shape => {
    //     return shape.get('name').includes('anchor')
    //   })

    //   points.forEach(point => {
    //     point.attr({
    //       'opacity': 1
    //     })
    //   });
    // },

    // _unselect(group) {
    //   const keyShape = group.getFirst()

    //   keyShape.attr({
    //     'stroke': '#ccc'
    //   })

    //   const points = group.findAll(shape => {
    //     return shape.get('name').includes('anchor')
    //   })

    //   points.forEach(point => {
    //     point.attr({
    //       'opacity': 0
    //     })
    //   });
    // },

    // setState(name, value, item) {
    //   const group = item.getContainer();
    //   switch (name) {
    //     case 'selected':
    //     case 'hover':
    //       if (value) {
    //         this._select(group)
    //       } else {
    //         this._unselect(group)
    //       }
    //       break
    //   }
    // },

  }, 'rect')
}