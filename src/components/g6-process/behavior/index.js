import addEdge from './addEdge'
import clickItem from './clickItem'
import hoverNode from './hoverNode'
import contextMenu from './contextMenu'
import wheel from './wheel'

function registerBehavior(){
  addEdge()
  clickItem()
  hoverNode()
  contextMenu()
  wheel()
}

export default registerBehavior