import { fittingString } from '../utils/fittingString'

const defaultConfig = () => {
  return {
    name: 'nothing here ~~~',
    graph: null,
    currentZoom: 1,
    maxZoom: 10,
    minZoom: 0.2,
    stackList: [],
    // layoutList: [],
    // offsetX: 0,
    // offsetY: 0,
    stackIndex: -1,
    savedIndex: 0,
    maxStack: 20,
    unique: true, // 节点唯一
    nodeSelectedList: [],
    edgeSelectedList: [],
    fullScreen: false,
    graphNodes: [],
    saveNodes: []
  }
}

export default {
  debug: true,
  state: {
    ...defaultConfig()
  },

  resetGraph () {
    Object.assign(this.state, { ...defaultConfig() })
  },

  initGraph (graph) {
    this.resetGraph();

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

    // graph.on('afteradditem', () => {
    //   this.updateGraphNodes()
    // })

    // graph.on('afterremoveitem', () => {
    //   this.updateGraphNodes()
    // })

    // let _x = 0;
    // let _y = 0
    // let _drag = false
    // graph.on('canvas:dragstart', e => {
    //   if (_drag) return
    //   _drag = true
    //   _x = e.canvasX
    //   _y = e.canvasY
    // })

    // graph.on('canvas:dragend', () => {
    //   // if (_drag) {
    //   //   const currentZoom = this.state.currentZoom 
    //   //   this.state.offsetX = (e.canvasX - _x)/currentZoom + this.state.offsetX
    //   //   this.state.offsetY = (e.canvasY - _y)/currentZoom + this.state.offsetY
    //   //   _x = 0;
    //   //   _y = 0
    //   //   _drag = false
    //   // }

    //   const client = document.querySelector('.graph.myGraph').getBoundingClientRect()
    //   const position = graph.getPointByClient(client.x, client.y)

    //   console.log('canvas:dragend', position.x, position.y)
    // })


    window.addEventListener('resize', () => {
      this.changeSize()
    })

  },

  updateGraphNodes () {
    const { graph } = this.state
    const nodes = graph.getNodes()
    this.state.graphNodes = nodes.map(node => node.get('model')._originId)
  },

  addStack () {

    const { graph, stackList, stackIndex, maxStack } = this.state

    const data = JSON.parse(JSON.stringify(graph.save()))
    const client = document.querySelector('.graph.myGraph').getBoundingClientRect()
    const position = graph.getPointByClient(client.x, client.y)

    const zoom = graph.getZoom()
    const layout = {
      x: position.x,
      y: position.y,
      zoom
    }

    const graphData = {
      data,
      layout
    }

    if (this.state.stackIndex + 1 >= maxStack) {
      stackList.push(graphData)
      stackList.shift()
      this.state.savedIndex--
    } else {
      this.state.stackList = stackList.slice(0, stackIndex + 1).concat(graphData)
    }

    this.state.stackIndex = this.state.stackList.length - 1

    this.updateGraphNodes()
  },

  resetStack () {
    const lastStack = this.state.stackList.pop()
    this.state.stackList = [lastStack]
    this.state.stackIndex = 0
  },

  // updateLatest(value){
  //   this.state.latest = value
  // },

  readData (value) {
    // this.updateLatest(value)

    const { graph } = this.state
    if (value) {
      const data = JSON.parse(value)
      let isBeyond = false
      data.nodes && data.nodes.forEach(node => {
        let label = node.label
        if (node.id === 'START_NODE') {
          label = '开 始'
        } else if (node.id === 'END_NODE') {
          label = '结 束'
        }
        node._label = label
        node.label = fittingString(label, 160, 16)
        // 判断越界
        !isBeyond && (isBeyond = node.x < 0 || node.y < 0)
      })
      graph.read(data);
      isBeyond && this.fitView()
    } else {
      // const graphWidth = graph.getWidth()
      // const graphHeight = graph.getHeight()
      // const startNode = {
      //   id: 'START_NODE',
      //   x: graphWidth / 2 - 240,
      //   y: graphHeight / 2 - 100,
      //   label: '开 始',
      //   type: 'start-node'
      // }
      // const endNode = {
      //   id: 'END_NODE',
      //   x: graphWidth / 2 + 240,
      //   y: graphHeight / 2 - 100,
      //   label: '结 束',
      //   type: 'end-node'
      // }
      // graph.add('node', startNode)
      // graph.add('node', endNode)
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

  _changeLayout (layout) {
    const { graph } = this.state
    graph.zoomTo(layout.zoom);
    this.state.currentZoom = layout.zoom
    const client = document.querySelector('.graph.myGraph').getBoundingClientRect()
    const position = graph.getPointByClient(client.x, client.y)
    graph.translate((position.x - layout.x) * layout.zoom, (position.x - layout.y) * layout.zoom)
  },

  undo () {
    const { graph, stackList, stackIndex } = this.state
    const graphData = stackList[stackIndex - 1]
    graph.read(JSON.parse(JSON.stringify(graphData.data)));
    this.state.stackIndex--
    this._changeLayout(graphData.layout)
    this.updateGraphNodes()
  },

  redo () {
    const { graph, stackList, stackIndex } = this.state
    const graphData = stackList[stackIndex + 1]
    graph.read(JSON.parse(JSON.stringify(graphData.data)));
    this.state.stackIndex++
    this._changeLayout(graphData.layout)
    this.updateGraphNodes()
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
  },

  changeSize () {
    // 更新画布大小
    const { graph } = this.state
    const graphStyle = window.getComputedStyle(document.querySelector('.graph.myGraph'));
    const height = parseInt(graphStyle.height)
    const width = parseInt(graphStyle.width)
    graph.changeSize(width, height);

    // 更新全屏状态
    const container = window.getComputedStyle(document.querySelector('.g6-process-container'));
    this.state.fullScreen = parseInt(container.width) === window.screen.width && parseInt(container.height) === window.screen.height
  },

  full () {
    document.querySelector(".g6-process-container").requestFullscreen()
  },

  exit () {
    this.state.fullScreen && document.exitFullscreen()
  },

  fitView () {
    const { graph } = this.state
    graph.fitView(30);
    setTimeout(() => {
      this.changeZoom()
    }, 0);
  },

  save () {
    this.state.savedIndex = this.state.stackIndex
  },

  hasChange () {
    const { stackList, stackIndex, savedIndex } = this.state;
    return stackList.length > 1 && stackIndex !== savedIndex;
  }

}