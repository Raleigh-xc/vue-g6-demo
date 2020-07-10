import G6 from "@antv/g6";
import store from '../store'

export default function () {
  G6.registerBehavior('wheel', {
    getEvents () {
      return {
        'wheelzoom': 'onWheel',
      }
    },

    onWheel () {
      store.changeZoom()
    },
  });
}