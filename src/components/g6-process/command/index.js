// import cloneDeep from 'lodash.clonedeep'

class Command {
  constructor(graph) {
    this.graph = graph
  }

  addNode(model) {
    this.graph.add('node', model)
  }
}

export default Command