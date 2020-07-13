import { fittingString } from '../utils/fittingString'

export default {
  debug: true,
  state: {
    name: 'nothing here ~~~',

    graph: null,

    currentZoom: 1,
    maxZoom: 10,
    minZoom: 0.2,

    stackList: [],
    stackIndex: -1,
    maxStack: 20,

    nodeSelectedList: [],
    edgeSelectedList: [],

    fullScreen: false

  },

  addStack () {

    console.log('addStack')

    const { graph, stackList, maxStack } = this.state
    stackList.push(graph.save())

    if (stackList.length > maxStack) {
      stackList.shift()
    }

    this.state.stackIndex = stackList.length - 1
  },

  resetStack () {
    const lastStack = this.state.stackList.pop()
    this.state.stackList = [lastStack]
    this.state.stackIndex = 0
  },

  initGraph (graph) {
    this.state.graph = graph

    this.state.currentZoom = graph.getZoom();
    this.state.maxZoom = graph.getMaxZoom()
    this.state.minZoom = graph.getMinZoom()

    graph.on('nodeselectchange', e => {
      e.selectedItems.nodes.forEach(item => {
        if (['START_NODE', 'END_NODE'].includes(item.getModel().id)) {
          graph.setItemState(item, 'selected', false)
        }
      })
      this.itemSelectChange()
    })

    window.addEventListener('resize', () => {
      this.changeSize()
    })

  },

  readData (value) {

    const { graph } = this.state

    if (value) {
      const data = JSON.parse(value)
      console.log(data)
      let isBeyond = false
      data.nodes && data.nodes.forEach(node => {
        const label = node.label
        node._label = label
        node.label = fittingString(label, 160, 16)
        console.log(node.x < 0, node.y < 0)
        // 有越界之后就不重新取值了
        !isBeyond && (isBeyond = node.x < 0 || node.y < 0)
      })
      graph.read(data);
      isBeyond && this.fitView()
    } else {
      const graphWidth = graph.getWidth()
      const graphHeight = graph.getHeight()
      const startNode = {
        id: 'START_NODE',
        x: graphWidth / 2 - 240,
        y: graphHeight / 2 - 100,
        label: '开 始',
        type: 'start-node'
      }
      const endNode = {
        id: 'END_NODE',
        x: graphWidth / 2 + 240,
        y: graphHeight / 2 - 100,
        label: '结 束',
        type: 'end-node'
      }
      graph.add('node', startNode)
      graph.add('node', endNode)
    }

    this.addStack()
  },

  addNode () {
    this.addStack()
  },

  addEdge () {
    this.addStack()
  },

  // deleteNode () { },
  // deleteEdge () { },
  // selectNode () { },
  // unselectNode () { },
  // selectEdge () { },
  // unSelectEdge () { },

  itemSelectChange () {
    const { graph } = this.state
    this.state.nodeSelectedList = graph.findAllByState("node", "selected");
    this.state.edgeSelectedList = graph.findAllByState("edge", "selected");
  },

  undo () {
    const { graph, stackList, stackIndex } = this.state
    const data = stackList[stackIndex - 1]
    graph.read(data);
    this.state.stackIndex--
  },

  redo () {
    const { graph, stackList, stackIndex } = this.state
    const data = stackList[stackIndex + 1]
    graph.read(data);
    this.state.stackIndex++
  },

  delete () {
    const { graph, nodeSelectedList, edgeSelectedList } = this.state
    const nodes = nodeSelectedList
    // 删除选中对的节点
    nodes.forEach(node => {
      // 删除节点相关的边
      const edges = node.getEdges();
      edges.forEach(edge => {
        graph.removeItem(edge);
      });
      graph.removeItem(node);
    });

    const edges = edgeSelectedList
    console.log(edges);
    // 删除选中对的边
    edges.forEach(edge => {
      !edge.destroyed && graph.removeItem(edge);
    });

    this.itemSelectChange()
    this.addStack()
  },

  edit () {

  },

  zoomIn () {
    const { graph } = this.state
    const currentZoom = graph.getZoom();
    const maxZoom = graph.getMaxZoom()
    const newZoom = currentZoom + 0.5 > maxZoom ? maxZoom : currentZoom + 0.5
    graph.zoomTo(newZoom);
    this.state.currentZoom = newZoom
  },

  zoomOut () {
    const { graph } = this.state
    const currentZoom = graph.getZoom();
    const minZoom = graph.getMinZoom()
    const newZoom = currentZoom - 0.5 < minZoom ? minZoom : currentZoom - 0.5
    graph.zoomTo(newZoom);
    this.state.currentZoom = newZoom
  },

  changeZoom () {
    const { graph } = this.state
    const currentZoom = graph.getZoom();
    this.state.currentZoom = currentZoom

    console.log(currentZoom)
  },

  changeSize () {
    const { graph } = this.state
    const container = window.getComputedStyle(document.querySelector('.graph.myGraph'));
    const height = parseInt(container.height)
    const width = parseInt(container.width)
    console.log(height, width)
    graph.changeSize(width, height);
  },

  full () {
    document.querySelector(".g6-process-container").requestFullscreen()
    this.state.fullScreen = true
    // this.changeSize()
  },

  exit () {
    document.exitFullscreen()
    this.state.fullScreen = false
  },

  fitView () {
    const { graph } = this.state
    graph.fitView(30);
    setTimeout(() => {
      this.changeZoom()
    }, 0);
  }

}