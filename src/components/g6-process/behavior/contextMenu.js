import G6 from '@antv/g6'

export default function () {
  G6.registerBehavior('context-menu', {
    getEvents () {
      return {
        'node:contextmenu': 'onNodeContextMenu',
        'node:mouseleave': 'onNodeMouseLeave',
        'edge:contextmenu': 'onEdgeContextMenu',
        'edge:mouseleave': 'onEdgeMouseLeave'
      }
    },

    onNodeContextMenu (evt) {
      evt.preventDefault()
      evt.stopPropagation()

      const self = this
      const graph = self.graph

      const curNode = evt.item
      const curId = curNode.getModel().id
      // 开始结束节点 不能编辑 不能删除
      if (curId === 'START_NODE' || curId === 'END_NODE') {
        return
      }

      const contextMenu = document.querySelector('.g6-contextMenu')
      // const container = document.querySelector('.g6-process-container')

      // const offsetX = getElementLeft(container)
      // const offsetY = getElementTop(container)

      const position = graph.getClientByPoint(evt.x, evt.y)

      // console.log(offsetX, offsetY)

      // const scrollInfo = getScrollOffset()

      // console.log(scrollInfo.x, scrollInfo.y)

      // contextMenu.style.left = `${position.x - offsetX + scrollInfo.x}px`
      // contextMenu.style.top = `${position.y - offsetY + scrollInfo.y}px`

      contextMenu.style.left = `${position.x}px`
      contextMenu.style.top = `${position.y}px`

      contextMenu.classList.add('node-menu')
      contextMenu.classList.remove('edge-menu')

      graph.set('_contextMenuSelected', evt.item)
    },

    onNodeMouseLeave () {
      const self = this
      const graph = self.graph

      const contextMenu = document.querySelector('.g6-contextMenu')

      contextMenu.style.left = '-150px'

      graph.set('_contextMenuSelected', null)
    },

    onEdgeContextMenu (evt) {
      evt.preventDefault()
      evt.stopPropagation()

      const self = this
      const graph = self.graph

      const contextMenu = document.querySelector('.g6-contextMenu')
      // const container = document.querySelector('.g6-process-container')

      // const offsetX = getElementLeft(container)
      // const offsetY = getElementTop(container)

      const position = graph.getClientByPoint(evt.x, evt.y)

      // console.log(offsetX, offsetY)

      // const scrollInfo = getScrollOffset()

      // console.log(scrollInfo.x, scrollInfo.y)

      // contextMenu.style.left = `${position.x - offsetX + scrollInfo.x}px`
      // contextMenu.style.top = `${position.y - offsetY + scrollInfo.y}px`

      contextMenu.style.left = `${position.x}px`
      contextMenu.style.top = `${position.y}px`

      contextMenu.classList.add('edge-menu')
      contextMenu.classList.remove('node-menu')

      graph.set('_contextMenuSelected', evt.item)
    },

    onEdgeMouseLeave () {
      const self = this
      const graph = self.graph

      const contextMenu = document.querySelector('.g6-contextMenu')

      contextMenu.style.left = '-150px'

      graph.set('_contextMenuSelected', null)
    }

  })
}
