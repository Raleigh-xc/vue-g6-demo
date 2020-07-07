export default function (G6) {
  G6.registerNode('process-node', {

    // options: {
    //   style: {
    //     stroke: '#ccc',
    //     lineWidth: 1,
    //     lineAppendWidth: 5,
    //     endArrow: true
    //   },
    //   stateStyles: {
    //     selected: {
    //       stroke: '#999',
    //       'link-point': {
    //         stroke: '#999',
    //       }
    //     }
    //   }
    // },

    afterDraw (cfg, group) {
      this._drawAnchor(cfg, group)
    },

    _drawAnchor (cfg, group) {
      const size = cfg.size;
      const width = size[0];
      const height = size[1];

      group.addShape('circle', {
        attrs: {
          x: 0 - width / 2,
          y: 0,
          r: 5,
          fill: '#fff',
          stroke: '#ccc',
          _point: [0, 0.5],
          _pointIndex: 0
        },
        name: 'link-point',
        visible: false,
      });

      group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0 - height / 2,
          r: 5,
          fill: '#fff',
          stroke: '#ccc',
          _point: [0.5, 0],
          _pointIndex: 1
        },
        name: 'link-point',
        visible: false,
      });

      group.addShape('circle', {
        attrs: {
          x: 0 + width / 2,
          y: 0,
          r: 5,
          fill: '#fff',
          stroke: '#ccc',
          _point: [1, 0.5],
          _pointIndex: 2
        },
        name: 'link-point',
        visible: false,
      });

      group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0 + height / 2,
          r: 5,
          fill: '#fff',
          stroke: '#ccc',
          _point: [0.5, 1],
          _pointIndex: 3
        },
        name: 'link-point',
        visible: false,
      });
    },

    getAnchorPoints () {
      return [
        [0, 0.5], // 左侧中间
        [0.5, 0],
        [1, 0.5], // 右侧中间
        [0.5, 1]
      ];
    },

    _select (shapes) {
      shapes.forEach(shape => {
        console.log(shape)
        console.log(shape.getType())
        console.log(shape.isVisible())
        // const model = shape.getModel()
        // console.log(model)
      });
    },
    // _unselect (shapes) {

    // },

    setState (name, value, item) {
      console.log('node', item)
      // console.log(node.getKeyShape())
      // node.getKeyShape().setState(name, value)

      const group = item.getContainer();
      const shapes = group.get('children');
      // console.log('shape',shapes)
      switch (name) {
        case 'selected':
        case 'hover':
          if (value) {
            this._select(shapes)
          } else {
            // this._unselect(shapes)
            console.log(shapes)
          }
          break
      }

      // console.log(name)
      // console.log(value)
      // console.log(item)
    },

  }, 'rect')
}