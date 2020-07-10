import G6 from "@antv/g6";
import addEdge from './addEdge'
import clickItem from './clickItem'
import hoverNode from './hoverNode'
import contextMenu from './contextMenu'
import wheel from './wheel'

function registerBehavior(){
  addEdge(G6)
  clickItem(G6)
  hoverNode(G6)
  contextMenu(G6)
  wheel(G6)
}

export default registerBehavior