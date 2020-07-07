import addEdge from './addEdge'
import clickEdge from './clickEdge'
import hoverNode from './hoverNode'
// import hoverEdge from './hoverEdge'

function registerBehavior(G6){
  addEdge(G6)
  clickEdge(G6)
  hoverNode(G6)
  // hoverEdge(G6)
}

export default registerBehavior