// import cloneDeep from 'lodash.clonedeep'

class Command {
  constructor(graph) {
    this.graph = graph
  }

  addNode (model) {
    this.graph.add('node', model)
  }

  addEdge (model) {
    this.graph.add('edge', model)
  }
}

export default Command