<template>
  <div class="drop-el">
    <slot />
  </div>
</template>
<script>
import interact from 'interactjs'
import { shapes } from '../consts/home'
export default {
  props: {
    expected: {
      type: [String, Object],
      required: true
    },
    selectedObjects: {
      type: Array,
      required: true
    },
    replaceOndrop: {
      type: Function,
      required: false,
      default: null
    },
    replaceOnLeave: {
      type: Function,
      required: false,
      default: null
    },
    snap: {
      type: Object,
      required: false,
      default() {
        return undefined
      }
    }
  },
  data() {
    return {
      dropped: [],
      initialSnapTarget: {
        targets: [{ x: 0, y: 0, range: Infinity }],
        relativePoints: [
          { x: 0, y: 0 } // snap relative to the element's top-left,
        ],
        enabled: true,
        endOnly: true,
        offset: 'self'
      },
      dropzoneSnap: this.snap || { x: 0, y: 0 },
      draggableElements: [],
      shapes
    }
  },
  mounted() {
    //  const snap = this.initialSnapTarget;
    interact(this.$el).dropzone({
      accept: '.drag-el',
      overlap: 0.75,
      snap: {
        enabled: true
      },
      ondropactivate: (event) => this.ondropactivate(event),
      ondropdeactivate: (event) => this.ondropdeactivate(event),
      ondragenter: (event) => this.ondragenter(event),
      ondragleave: (event) => this.ondragleave(event),
      ondrop: (event) => this.ondrop(event)
    })
  },
  methods: {
    ondropactivate(event) {
      const item = event.relatedTarget
      item.classList.add('dragging')
    },
    ondropdeactivate(event) {
      const item = event.relatedTarget
      item.classList.remove('dragging', 'cannot-drop')
    },
    ondragenter(event) {
      const item = event.relatedTarget
      const parent = event.relatedTarget.parentElement.parentElement
      item.classList.remove('cannot-drop')
      item.classList.add('can-drop')

      const elemento = event.relatedTarget.getAttribute('data-transfer')

      event.relatedTarget.firstElementChild.src = this.getUrlBig(elemento)

      event.relatedTarget.firstElementChild.classList.remove(
        this.getUrlSmall(elemento)
      )
      event.relatedTarget.firstElementChild.classList.add(
        this.getUrlBig(elemento)
      )

      parent.style.zIndex = '105'
    },
    ondragleave(event) {
      const item = event.relatedTarget
      const parent = event.relatedTarget.parentElement.parentElement
      item.classList.remove('can-drop')
      item.classList.add('cannot-drop')

      const elemento = event.relatedTarget.getAttribute('data-transfer')

      event.relatedTarget.firstElementChild.style.transform = 'rotate(0)'

      event.relatedTarget.firstElementChild.classList.add(
        this.getUrlSmall(elemento)
      )
      event.relatedTarget.firstElementChild.classList.remove(
        this.getUrlBig(elemento)
      )
      parent.style.zIndex = '110'
    },
    getUrlBig(el) {
      const i = this.shapes.map((x) => x.name).indexOf(el)
      return this.shapes[i].pathBig
    },
    getUrlSmall(el) {
      const i = this.shapes.map((x) => x.name).indexOf(el)
      return this.shapes[i].path
    },
    ondrop() {
      // console.log(event);
    },
    resetOptionsState() {
      const element = this.draggableElements[0]
      element.el.draggable({ enabled: true })
      element.el.draggable({
        snap: {
          targets: [{ x: 0, y: 0, range: Infinity }],
          relativePoints: [{ x: 0, y: 0 }],
          enabled: true,
          endOnly: true,
          offset: 'self'
        }
      })
      element.dropped.length = 0
      const selector = `#ID-${element.nome}`
      const draggable = document.querySelector(selector).firstElementChild
      console.log(draggable)

      draggable.setAttribute('data-x', 0)
      draggable.setAttribute('data-y', 0)
      draggable.style.opacity = '0'
      setTimeout(() => {
        draggable.style.transform = 'translate(0px, 0px)'
      }, 500)
      setTimeout(() => {
        draggable.style.opacity = '1'
      }, 600)
    },
    resetOptionsStateWrong() {
      const element = this.draggableElements[0]
      element.el.draggable({ enabled: true })
      element.el.draggable({
        snap: {
          targets: [{ x: 0, y: 0, range: Infinity }],
          relativePoints: [{ x: 0, y: 0 }],
          enabled: true,
          endOnly: true,
          offset: 'self'
        }
      })
      element.dropped.length = 0
      const selector = `#ID-${element.nome}`
      const draggable = document.querySelector(selector).firstElementChild
      console.log(draggable)

      draggable.setAttribute('data-x', 0)
      draggable.setAttribute('data-y', 0)
      draggable.style.filter = 'drop-shadow(0px 0px 6px #ff0000)'
      setTimeout(() => {
        draggable.style.transform = 'translate(0px, 0px)'
      }, 500)
    }
  }
}
</script>
<style lang="scss">
.drop {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 222px;
  height: 218px;

  &.over {
    filter: brightness(90%);
  }
}
</style>
