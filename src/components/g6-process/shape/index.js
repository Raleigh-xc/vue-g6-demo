import baseNode from './baseNode'
import baseNode2 from './baseNode2'
import startNode from './startNode'
import endNode from './endNode'

function registerShape(G6){
  baseNode(G6)
  baseNode2(G6)
  startNode(G6)
  endNode(G6)
}

export default registerShape