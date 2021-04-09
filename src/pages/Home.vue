<template>
  <section class="hero">
    <div class="top">
      <span @click="restart">
        <Button
          :color="'#6c6c6c'"
          :imagem="'icon-reiniciar'"
          :name="'reiniciar'"
        ></Button>
      </span>
      <span @click="openHelp">
        <Button :color="'#6c6c6c'" :name="'ajuda'"></Button>
      </span>
      <div draggable="false" class="titulo-box"></div>
      <Button
        :color="'#6c6c6c'"
        :imagem="'icon-creditos'"
        :name="'créditos'"
      ></Button>
    </div>
    <div class="bottom">
      <div class="left-content">
        <SelectedObject
          :image="actualMontagem.imgCompleta"
          :name="actualMontagem.label"
          :class="help0Class"
        ></SelectedObject>
        <span
          v-for="el in montagemFiltered"
          :key="el.nome"
          @click="changeEl(el)"
        >
          <ListObjects
            :image="el.imgCompleta"
            :name="el.label"
            :is-complete="el.isComplete"
          ></ListObjects>
        </span>
      </div>
      <div class="center-content ">
        <div class="title" :class="help1Class">
          MOSTRE QUE FORMAS FALTAM PARA MONTAR UM(A):
        </div>
        <div class="actual-el" :class="help1Class">
          {{ actualMontagem.label }}
        </div>
        <div class="stage" :class="help1Class + 'z-stage'">
          <div
            v-if="!showMontado"
            class="stage-imagem-metade"
            :style="{
              top: actualMontagem.imgPosition.y,
              marginLeft: actualMontagem.imgPosition.x
            }"
            :class="[actualMontagem.imgMetade, help1Class]"
          ></div>
          <div
            v-else
            class="stage-imagem-metade-montado"
            :style="{
              top: actualMontagem.imgPositionMontado.y,
              marginLeft: actualMontagem.imgPositionMontado.x
            }"
            :class="actualMontagem.imgMontado"
          />
          <Drop
            class="drop-container"
            :expected="'quadrado'"
            :selected-objects="[]"
          ></Drop>
        </div>
        <div class="buttons-section">
          <span @click="deleteAll">
            <Button
              :color="'#6c6c6c'"
              :imagem="'icon-apagartudo'"
              :name="'Apagar tudo'"
              is-big
            ></Button>
          </span>
          <span :class="help2Class" @click="montarClick">
            <Button :imagem="'icon-montar'" :name="'Montar'" is-big></Button>
          </span>
        </div>
      </div>
      <div class="right-content">
        <div
          v-if="isExpandShapes"
          class="icon-contrair"
          :class="[expandShapeClass, 'icon-contrair']"
          @click="contratShapes"
        ></div>
        <div
          v-else
          class="icon-contrair"
          :class="[expandShapeClass, 'icon-expandir']"
          @click="expandShapes"
        ></div>
        <transition name="no-fade">
          <div v-if="showShapes" class="el-container" :class="help1Class">
            <div v-for="el in shapes" :key="el.name" class="el-item">
              <div
                v-for="x in repetition"
                :key="x"
                class="el-repetition"
                :class="help1Class"
              >
                <Drag
                  :id="'ID-' + el.name"
                  class="shape"
                  :class="help1Class"
                  :data-transfer="el.name"
                  :img-name="el.name"
                  :img-src="el.path"
                  @audioclick="audioClick.play()"
                  @audioencaixar="audioEncaixar.play()"
                  @audioapagar="audioApagar.play()"
                >
                </Drag>
              </div>
            </div>
          </div>
        </transition>
        <div class="prevent-arrastar" :class="help1Class"></div>
        <transition name="slide-fade">
          <div
            v-if="isExpandShapes"
            class="el-container-expand"
            @click="contratShapes"
            @mouseleave="contratShapes"
          >
            <div v-for="el in shapes" :key="el.name" class="el-item">
              <div class="el-repetition">
                <div :class="[el.name, el.path]"></div>
              </div>
              <span :class="expandShapeClass">{{ el.label }}</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <PopUp
      v-if="showPopUp"
      :text="popUpText"
      :image="popUpImage"
      @close="closePopUp"
      @closewrong="closePopUpWrong"
    ></PopUp>
    <Help
      v-if="showHelp"
      :index="indexHelp"
      @closeHelp="closeHelp"
      @prevHelp="prevHelp"
      @nextHelp="nextHelp"
    ></Help>
  </section>
</template>
<script>
import { shapes, montagem } from '../consts/home'
import audios from '../mixins/audios'

export default {
  mixins: [audios],
  data() {
    return {
      shapes,
      montagem,
      isExpandShapes: false,
      repetition: ['a', 'b', 'c', 'd'],
      showPopUp: false,
      index: 0,
      showShapes: true,
      showMontado: false,
      popUpText: '',
      popUpImage: '',
      textCorrect:
        '<b>MUITO BEM!</b></br>VOCÊ CONSEGUIU MONTAR O(A) <b>#actual</b>. QUE TAL MONTAR O(A) <b>#next</b>?',
      nextMontagem: [],
      showHelp: false,
      indexHelp: 0
    }
  },
  computed: {
    expandShapeClass() {
      if (this.isExpandShapes) {
        return 'is-expand'
      } else {
        return ''
      }
    },
    montagemFiltered() {
      return this.montagem.filter((el) => el.index !== this.index)
    },
    actualMontagem() {
      return this.montagem[this.index]
    },
    textCorretoPopUp() {
      const actual = this.actualMontagem
      const next = this.nextMontagem
      if (next) {
        let temp = this.textCorrect.replace('#actual', actual.label)
        temp = temp.replace('#next', next.label)
        return temp
      } else {
        return '<b>MUITO BEM!</b></br>VOCÊ CONSEGUIU MONTAR O(A) <b>#actual</b> E CONCLUIU A ATIVIDADE. QUER REINICIAR?'.replace(
          '#actual',
          actual.label
        )
      }
    },
    help0Class() {
      if (this.showHelp && this.indexHelp === 0) {
        return 'help-0-class'
      } else return ''
    },
    help1Class() {
      if (this.showHelp && this.indexHelp === 1) {
        return 'help-1-class'
      } else return ''
    },
    help2Class() {
      if (this.showHelp && this.indexHelp === 2) {
        return 'help-2-class'
      } else return ''
    }
  },
  mounted() {
    this.$store.commit('changeBackground', 'bg-menu')
    this.getNextMontagem()
  },
  methods: {
    expandShapes() {
      this.isExpandShapes = true
      this.audioClick.play()
    },
    closeHelp() {
      this.showHelp = false
      this.indexHelp = 0
      this.audioClick.play()
    },
    openHelp() {
      this.showHelp = true
      this.audioClick.play()
    },
    prevHelp() {
      if (this.indexHelp > 0) {
        this.indexHelp--
        this.audioClick.play()
      }
    },
    nextHelp() {
      if (this.indexHelp < 2) {
        this.indexHelp++
        this.audioClick.play()
      } else {
        this.closeHelp()
      }
    },
    contratShapes() {
      this.isExpandShapes = false
    },
    restart() {
      this.index = 0
      this.deleteAll()
      // eslint-disable-next-line array-callback-return
      this.montagem.map((el) => {
        el.isComplete = false
      })
    },
    changeEl(el) {
      this.index = el.index
      this.deleteAll()
    },
    deleteAll() {
      const selectedElements = []
      ;[...document.getElementsByClassName('can-drop')].forEach((el) => {
        selectedElements.push(el.getAttribute('data-transfer'))
      })

      if (selectedElements.length > 0) {
        this.audioApagar.play()
      } else {
        this.audioClick.play()
      }

      this.showShapes = false
      setTimeout(() => {
        this.showShapes = true
      }, 10)
    },
    closePopUp() {
      this.audioClick.play()
      this.showPopUp = false
      this.showMontado = false

      if (this.nextMontagem) {
        this.index = this.nextMontagem.index
      } else {
        this.restart()
        console.log('reiniciar')
      }
    },
    closePopUpWrong() {
      this.audioClick.play()
      this.showPopUp = false
      this.showMontado = false
    },
    montarClick() {
      const selectedElements = []
      ;[...document.getElementsByClassName('can-drop')].forEach((el) => {
        selectedElements.push(el.getAttribute('data-transfer'))
      })

      if (this.arraysEqual(this.actualMontagem.pecasName, selectedElements)) {
        this.deleteAll()
        this.showMontado = true
        this.marcarComoCompleto()
        this.getNextMontagem()
        setTimeout(() => {
          this.popUpText = this.textCorretoPopUp
          this.popUpImage = 'medalha'
          this.showPopUp = true
          this.audioSuccess.play()
        }, 1500)
      } else {
        this.popUpText =
          'A planificação ainda não está correta. Que tal tentar de novo?'
        this.popUpImage = ''
        this.showPopUp = true
        this.audioError.play()
      }
    },
    getNextMontagem() {
      const next = this.montagem.filter((el) => el.isComplete === false)
      this.nextMontagem = next[0]
    },
    marcarComoCompleto() {
      this.montagem[this.index].isComplete = true
    },
    arraysEqual(_arr1, _arr2) {
      if (
        !Array.isArray(_arr1) ||
        !Array.isArray(_arr2) ||
        _arr1.length !== _arr2.length
      ) {
        return false
      }
      const arr1 = _arr1.sort()
      const arr2 = _arr2.sort()
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false
      }

      return true
    }
  }
}
</script>
<style lang="scss" scoped>
.hero {
  width: 980px;
  height: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.prevent-arrastar {
  z-index: 10000;
  width: 92px;
  height: 590px;
  position: absolute;
  right: 0px;
  top: 0px;
  display: none;
}

.help-0-class {
  z-index: 1001;
  background-color: white;
}

.help-1-class {
  z-index: 1001;
  color: rgba(255, 255, 255, 0.7);
  display: block;
}

.help-1-classz-stage {
  z-index: 1002;
  pointer-events: none !important;
  cursor: initial;
}

.help-2-class {
  z-index: 1001;
  pointer-events: none;
}

.top {
  padding-top: 3px;
  display: flex;
  gap: 18px;
}

.bottom {
  margin-top: 24px;
  display: flex;
  width: 100%;
  justify-content: flex-start;
}

.left-content {
  width: 235px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 19px;
}

.center-content {
  width: 613px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 16px;
    margin-top: -6px;
  }

  .actual-el {
    font-family: MavenProBlack;
    font-size: 24px;
  }

  .stage {
    height: 467px;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;

    .drop-container {
      width: 100%;
      height: 100%;
    }

    .stage-imagem-metade,
    .stage-imagem-metade-montado {
      position: absolute;
    }
  }

  .buttons-section {
    display: flex;
    gap: 24px;
  }
}

.right-content {
  position: absolute;
  width: 92px;
  height: 590px;
  right: 18px;
  top: 118px;

  &.is-expand {
    width: 284px;
  }

  .icon-contrair {
    position: absolute;
    left: -25px;
    top: 20px;
    cursor: pointer;
    transition: left 0.3s ease;

    &.is-expand {
      left: -218px;
    }
  }

  .el-container-expand {
    background-color: $grey;
    width: 284px;
    height: 100%;
    border-radius: 20px;
    @include box-shadow;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 200;
    touch-action: none;
    user-select: none;

    .el-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;

      .el-repetition {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 20px;
        position: absolute;
        left: 25px;
      }

      span {
        width: 137px;
        font-size: 24px;
        font-family: MavenProMedium;
        position: absolute;
        left: 106px;
      }
    }
  }

  .el-container {
    background-color: $grey;
    width: 92px;
    height: 100%;
    border-radius: 20px;
    @include box-shadow;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    &.is-expand {
      width: 284px;
    }

    .el-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;

      .el-repetition {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 20px;
        position: absolute;
        z-index: 110;

        &.is-expand {
          left: 25px;
        }
      }

      span {
        width: 137px;
        font-size: 24px;
        font-family: MavenProMedium;
        position: absolute;
        left: 106px;
      }
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(187px);
}

.no-fade-enter-active {
  transition: all 0.5s ease;
}
.no-fade-leave-active {
  transition: all 0.5s ease;
}
.no-fade-enter {
  opacity: 1;
}
.no-fade-leave-to {
  opacity: 1;
}
</style>
