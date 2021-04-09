<template>
  <div class="drag-wrap">
    <div
      ref="elDrag"
      :class="classname"
      :data-transfer="dataTransfer"
      class="slot drag-el"
      draggable="false"
    >
      <div
        ref="imageRotate"
        :class="[imgName, imgSrc]"
        :style="{ transform: 'rotate(' + angulo + 'deg)' }"
      ></div>
      <div
        v-if="showButtonRotate"
        class="button-rotate icon-reiniciar"
        @click.prevent="rotate"
      ></div>
      <div
        class="btn-apagar-forma icon-apagarforma"
        @click.prevent="resetPosition"
      ></div>
    </div>
  </div>
</template>
<script>
import interact from 'interactjs'
import { shapes } from '../consts/home'

export default {
  props: {
    dataTransfer: {
      type: [Object, String],
      required: true
    },
    dropped: {
      type: Boolean,
      required: false,
      default: false
    },
    classname: {
      type: [String, Array],
      required: false,
      default: 'idle'
    },
    imgName: {
      type: String,
      default: ''
    },
    imgSrc: {
      type: String,
      default: ''
    },
    onendEvent: {
      type: Function,
      required: false,
      default() {
        return undefined
      }
    },
    onstartEvent: {
      type: Function,
      required: false,
      default() {
        return undefined
      }
    },
    isSigmoid: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      dragging: false,
      initialSnapTarget: {
        targets: [{ x: 0, y: 0, range: Infinity }],
        relativePoints: [{ x: 0, y: 0 }],
        enabled: true,
        endOnly: true,
        offset: 'self'
      },
      sigmoidInterval: '',
      rotation: 0,
      translation: '',
      angulo: 0,
      shapes
    }
  },
  computed: {
    showButtonRotate() {
      if (this.imgName === 'circulo') {
        return false
      } else return true
    }
  },
  mounted() {
    interact(this.$el.firstChild).draggable({
      inertia: true,
      // snap: this.initialSnapTarget,
      restrict: {
        restriction: '.bottom'
      },
      onmove: (event) => this.onMove(event),
      onstart: (event) => this.onStart(event),
      onend: (event) => this.onEnd(event)
    })

    // console.log(
    //   Number(this.$refs.imageRotate.style.transform.replace(/([^\d])+/gim, ""))
    // );

    // this.angulo = this.$refs.
  },
  methods: {
    rotate() {
      this.angulo = this.angulo + 30
      this.$emit('audioclick')
    },
    resetPosition() {
      this.$emit('audioapagar')
      const target = this.$refs.elDrag
      target.style.transform = `translate(0px, 0px)`
      target.setAttribute('data-x', 0)
      target.setAttribute('data-y', 0)
      target.classList.remove('can-drop')

      this.angulo = 0
      const elemento = target.getAttribute('data-transfer')

      target.firstElementChild.classList.add(this.getUrlSmall(elemento))
      target.firstElementChild.classList.remove(this.getUrlBig(elemento))

      target.parentElement.parentElement.style.zIndex = '110'
    },
    getUrlSmall(el) {
      const i = this.shapes.map((x) => x.name).indexOf(el)
      return this.shapes[i].path
    },
    getUrlBig(el) {
      const i = this.shapes.map((x) => x.name).indexOf(el)
      return this.shapes[i].pathBig
    },
    onMove(event) {
      const target = event.target

      const dataX = target.getAttribute('data-x')
      const dataY = target.getAttribute('data-y')
      const initialX = parseFloat(dataX) || 0
      const initialY = parseFloat(dataY) || 0

      const deltaX = event.dx
      const deltaY = event.dy

      const newX = initialX + deltaX
      const newY = initialY + deltaY

      target.style.transform = `translate(${newX}px, ${newY}px)`

      target.setAttribute('data-x', newX)
      target.setAttribute('data-y', newY)
    },
    onStart(event) {
      const target = event.target
      target.classList.add('start-drag')
    },
    onEnd(event) {
      this.$emit('audioencaixar')
      const target = event.target
      target.classList.remove('start-drag')
      if (target.classList.contains('can-drop')) {
        target.classList.remove('start-drag')
      } else {
        setTimeout(() => {
          target.setAttribute('data-x', 0)
          target.setAttribute('data-y', 0)
          target.style.transform = 'translate(0px, 0px)'
        }, 10)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
[draggable='false'] > * {
  pointer-events: none;
  pointer-events: visible;
}

.slot {
  z-index: 100;
  touch-action: none;
  user-select: none;
  pointer-events: visible;
}

.button-rotate {
  display: none;
}

.btn-apagar-forma {
  display: none;
  position: absolute;
  cursor: pointer;
  transform: scale(0.9);
}

.drag-wrap {
  display: flex;
  align-items: center;
  justify-items: center;
  z-index: 102;
  pointer-events: visible;

  .can-drop {
    display: flex;
    align-items: center;
    justify-content: center;

    &:not(.dragging) {
      &:hover {
        .btn-apagar-forma {
          display: block;
        }
      }
    }

    .button-rotate {
      display: block;
      opacity: 0.28;
      transform: scale(0.8);
      position: absolute;
      top: -8px;
      right: -32px;
      cursor: pointer !important;
    }
  }

  .dragging {
    &.can-drop {
      filter: hue-rotate(74deg);
    }

    &.cannot-drop {
      filter: saturate(0%);
    }
  }
}

.empty-space {
  position: absolute;
  z-index: 10;
}

.class-can-drop {
  filter: brightness(350%) drop-shadow(0px 0px 5px rgb(255, 255, 62));
}
</style>
