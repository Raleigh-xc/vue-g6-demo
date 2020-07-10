import baseNode from './baseNode'
import startNode from './startNode'
import endNode from './endNode'

function registerShape(G6){
  baseNode(G6)
  startNode(G6)
  endNode(G6)
}

export default registerShape