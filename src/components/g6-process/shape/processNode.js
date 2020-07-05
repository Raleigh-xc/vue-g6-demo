export default function (G6) {
  G6.registerNode('process-node', {
    afterDraw (cfg, group) {
      const size = cfg.size;
      console.log(size)
      console.log(cfg)
      // const width = size[0] - 14;
      // const height = size[1] - 14;
      // 添加图片
      group.addShape('circle', {
        attrs: {
          x: 10,
          y: 10,
          r: 10,
        },
        // must be assigned in G6 3.3 and later versions. it can be any value you want
        name: 'image-shape'
      });
    }

  }, 'rect')
}