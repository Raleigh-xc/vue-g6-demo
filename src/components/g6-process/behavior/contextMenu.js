export default function (G6) {

  G6.registerBehavior('context-menu', {
    getEvents () {
      return {
        'node:contextmenu': 'onNodeContextMenu',
        'node:mouseleave': 'onNodeMouseLeave',
        'edge:contextmenu': 'onEdgeContextMenu',
        'edge:mouseleave': 'onEdgeMouseLeave'
      };
    },

    onNodeContextMenu (evt) {
      evt.preventDefault();
      evt.stopPropagation();

      const self = this;
      const graph = self.graph;

      const contextMenu = document.querySelector('.g6-contextMenu')

      console.log(evt.x)

      contextMenu.style.left = `${evt.x + 200}px`;
      contextMenu.style.top = `${evt.y + 48}px`;

      contextMenu.classList.add('node-menu')
      contextMenu.classList.remove('edge-menu')

      graph.set('_contextMenuSelected', evt.item)
    },

    onNodeMouseLeave () {

      const self = this;
      const graph = self.graph;

      const contextMenu = document.querySelector('.g6-contextMenu')

      contextMenu.style.left = '-150px';

      graph.set('_contextMenuSelected', null)
    },

    onEdgeContextMenu (evt) {
      evt.preventDefault();
      evt.stopPropagation();

      const self = this;
      const graph = self.graph;

      const contextMenu = document.querySelector('.g6-contextMenu')

      contextMenu.style.left = `${evt.x + 200}px`;
      contextMenu.style.top = `${evt.y + 48}px`;

      contextMenu.classList.add('edge-menu')
      contextMenu.classList.remove('node-menu')

      graph.set('_contextMenuSelected', evt.item)
    },

    onEdgeMouseLeave () {

      const self = this;
      const graph = self.graph;

      const contextMenu = document.querySelector('.g6-contextMenu')

      contextMenu.style.left = '-150px';

      graph.set('_contextMenuSelected', null)
    }

  });
}