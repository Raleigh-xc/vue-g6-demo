function getElementLeft (element) {
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;

  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }

  return actualLeft;
}

function getElementTop (element) {
  var actualTop = element.offsetTop;
  var current = element.offsetParent;

  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  return actualTop;
}

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

      const curNode = evt.item
      const curId = curNode.getModel().id
      // 开始结束节点 不能编辑 不能删除
      if (curId === 'START_NODE' || curId === 'END_NODE') {
        return
      }

      const contextMenu = document.querySelector('.g6-contextMenu')
      const container = document.querySelector('.g6-process-container')

      const offsetX = getElementLeft(container)
      const offsetY = getElementTop(container)

      console.log(offsetX, offsetY)
      console.log(evt.x, evt.y)
      const position = graph.getClientByPoint(evt.x, evt.y);
      console.log(position)

      contextMenu.style.left = `${position.x - offsetX}px`;
      contextMenu.style.top = `${position.y -offsetY}px`;

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

      const container = document.querySelector('.g6-process-container')
      
      const offsetX = getElementLeft(container)
      const offsetY = getElementTop(container)

      console.log(offsetX, offsetY)
      console.log(evt.x, evt.y)
      const position = graph.getClientByPoint(evt.x, evt.y);
      console.log(position)

      contextMenu.style.left = `${position.x - offsetX}px`;
      contextMenu.style.top = `${position.y -offsetY}px`;

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