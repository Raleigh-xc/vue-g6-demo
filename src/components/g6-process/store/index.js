export default {
  debug: true,
  state: {
    name: 'nothing here ~~~',

    graph: null,

    stackList: [],
    stackIndex: 0,
    maxStack: 20,

    nodeSelectedList: [],
    edgeSelectedList: [],

  },

  addStack () {
    const { graph, stackList } = this.state
    stackList.push(graph.save())
    this.state.stackIndex++
    console.log(this.state.stackIndex)
  },

  initGraph (graph) {
    this.state.graph = graph
    this.addStack()
  },

  addNode (node) {
    const { graph } = this.state
    graph.add('node', node)
    this.addStack()
  },

  addEdge () { },

  deleteNode () { },

  deleteEdge () { },

  selectNode () { },

  unselectNode () { },

  selectEdge () { },

  unSelectEdge () { },

  toolbar: {
    undo () {
console.log(this)
    },

    redo () {

    },

    delete () {

    },

    edit () {

    }
  }

}