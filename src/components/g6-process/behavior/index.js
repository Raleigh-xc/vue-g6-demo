import addEdge from './addEdge'
import clickEdge from './clickEdge'
import hoverNode from './hoverNode'
import contextMenu from './contextMenu'

function registerBehavior(G6){
  addEdge(G6)
  clickEdge(G6)
  hoverNode(G6)
  contextMenu(G6)
}

export default registerBehavior