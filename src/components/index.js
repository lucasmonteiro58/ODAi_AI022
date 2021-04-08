import LoadingScreen from '@/components/LoadingScreen.vue'
import Button from '@/components/Button.vue'
import SelectedObject from '@/components/SelectedObject.vue'
// import ListObjects from '@/components/ListObjects.vue'
// import Drag from '@/components/Drag.vue'
// import Drop from '@/components/Drop.vue'
// import PopUp from '@/components/PopUp.vue'

const Components = {
  install: (Vue) => {
    Vue.component('LoadingScreen', LoadingScreen)
    Vue.component('Button', Button)
    Vue.component('SelectedObject', SelectedObject)
    // Vue.component('Drga', Drag)
    // Vue.component('Drop', Drop)
    // Vue.component('PopUp', PopUp)
    // Vue.component('ListObjects', ListObjects)
  }
}

export default Components
