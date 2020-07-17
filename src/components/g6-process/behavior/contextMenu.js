// function getElementLeft (element) {
//   var actualLeft = element.offsetLeft
//   var current = element.offsetParent

//   while (current !== null) {
//     actualLeft += current.offsetLeft
//     current = current.offsetParent
//   }

//   return actualLeft
// }

// function getElementTop (element) {
//   var actualTop = element.offsetTop
//   var current = element.offsetParent

//   while (current !== null) {
//     actualTop += current.offsetTop
//     current = current.offsetParent
//   }

//   return actualTop
// }

/**
  *  @description 获取滚动条滑动的距离
  *  document.documentElement.scrollTop  | document.body.scrollTop
  *  document.documentElement.scrollLeft  | document.body.scrollLeft
  *  IE8 和 IE8 以下的浏览器不兼容
  *  window.pageYOffset
  *  window.pageXOffset
  * @returns {x:0,y:0}
  */
// function getScrollOffset () {
//   if (window.pageXOffset) {
//     return {
//       x: window.pageXOffset,
//       y: window.pageYOffset
//     }
//   } else {
//     return {
//       x: document.body.scrollLeft + document.documentElement.scrollLeft,
//       y: document.body.scrollTop + document.documentElement.scrollTop
//     }
//   }
// }

export default function (G6) {
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
