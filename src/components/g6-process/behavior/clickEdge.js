export default function (G6) {
  G6.registerBehavior('click-edge', {
    getEvents() {
      return {
        'edge:click': 'onEdgeClick'
      }
    },

    onEdgeClick(evt) {

      // const self = this;
      // const graph = self.graph;
      // this._clearSelected();
      // graph.setItemState(evt.item, 'selected', true);
      // let selectedItems = this.graph.get('selectedItems');
      // if(!selectedItems)
      //   selectedItems = [];
      // selectedItems = [e.item.get('id')];
      // this.graph.set('selectedItems',selectedItems);
      // this.graph.emit('afteritemselected',selectedItems);

      const edge = evt.item
      edge.setState('selected', !edge.hasState('selected'))
    },

    // onCanvasClick(evt) {
    //   const self = this;
    //   const graph = self.graph;
    //   console.log(graph)
    //   console.log(evt)
    // }
    // onNodeMouseOver(e){
    //   if(this.graph.getCurrentMode() === 'edit')
    //     this.graph.setItemState(e.item, 'hover', true);
    //   else
    //     this.graph.setItemState(e.item, 'hover', false);
    // },
    // onEdgeMouseOver(e){
    //   if(this.graph.getCurrentMode() === 'edit' && !e.item.hasState('selected'))
    //     this.graph.setItemState(e.item, 'hover', true);
    // },
    // onEdgeMouseLeave(e){
    //   if(this.graph.getCurrentMode() === 'edit' && !e.item.hasState('selected'))
    //     this.graph.setItemState(e.item, 'hover', false);
    // },
    // onCanvasClick(){
    //   this._clearSelected();
    // },
    // _clearSelected(){
    //   let selected = this.graph.findAllByState('node', 'selected');
    //   selected.forEach(node => {
    //     this.graph.setItemState(node, 'selected', false);
    //   });
    //   selected = this.graph.findAllByState('edge', 'selected');
    //   selected.forEach(edge => {
    //     this.graph.setItemState(edge, 'selected', false);
    //   });
    //   this.graph.set('selectedItems',[]);
    //   this.graph.emit('afteritemselected',[]);
    // }
  });
}