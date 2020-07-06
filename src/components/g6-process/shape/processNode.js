export default function (G6) {
  G6.registerNode('process-node', {

    options: {
      style: {
        fill: 'red',
        stroke: '#5b8ff9',
        lineWidth: '1'
      },
      stateStyles: {
        hover: {},
        selected: {
          stroke: '#999',
        },
      },
    },

    afterDraw(cfg, group) {
      this.drawAnchor(cfg, group)
    },

    drawAnchor(cfg, group) {
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
          _point: [0, 0.5],
          _pointIndex: 0
        },
        name: 'link-point'
      });

      group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0 - height / 2,
          r: 5,
          fill: '#fff',
          stroke: '#5b8ff9',
          _point: [0.5, 0],
          _pointIndex: 1
        },
        name: 'link-point'
      });

      group.addShape('circle', {
        attrs: {
          x: 0 + width / 2,
          y: 0,
          r: 5,
          fill: '#fff',
          stroke: '#5b8ff9',
          _point: [1, 0.5],
          _pointIndex: 2
        },
        name: 'link-point'
      });

      group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0 + height / 2,
          r: 5,
          fill: '#fff',
          stroke: '#5b8ff9',
          _point: [0.5, 1],
          _pointIndex: 3
        },
        name: 'link-point'
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

    // setState(name, value, node) {
    //   node.setState(name, value)
    // },

  }, 'rect')
}