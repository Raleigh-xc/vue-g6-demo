import processNode from './processNode'
import customNode from './customNode'

function registerShape(G6){
  processNode(G6)
  customNode(G6)
}

export default registerShape