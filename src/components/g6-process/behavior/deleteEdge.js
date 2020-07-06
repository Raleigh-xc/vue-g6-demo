export default function (G6) {
  G6.registerBehavior('delete-edge', {
    getEvents () {
      return {
        // 'edge:click': 'onClick',
        '': 'onClick'
      };
    },

    onClick(evt){
      const self = this;
      const graph = self.graph;
    }
  });
}