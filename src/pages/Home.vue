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
      <Button :color="'#6c6c6c'" :name="'ajuda'"></Button>
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
      <div class="center-content">
        <div class="title">MOSTRE QUE FORMAS FALTAM PARA MONTAR UM(A):</div>
        <div class="actual-el">{{ actualMontagem.label }}</div>
        <div class="stage">
          <div
            v-if="!showMontado"
            class="stage-imagem-metade"
            :style="{
              top: actualMontagem.imgPosition.y,
              marginLeft: actualMontagem.imgPosition.x
            }"
            :class="actualMontagem.imgMetade"
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
          <span @click="montarClick">
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
          <div v-if="showShapes" class="el-container">
            <div v-for="el in shapes" :key="el.name" class="el-item">
              <div v-for="x in repetition" :key="x" class="el-repetition">
                <Drag
                  :id="'ID-' + el.name"
                  class="shape"
                  :data-transfer="el.name"
                  :img-name="el.name"
                  :img-src="el.path"
                >
                </Drag>
              </div>
            </div>
          </div>
        </transition>
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
  </section>
</template>
<script>
import { shapes, montagem } from '../consts/home'
export default {
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
      nextMontagem: []
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
        return '<b>MUITO BEM!</b></br>VOCÊ CONSEGUIU MONTAR O(A) <b>#actual</b> E CONCLUIU A ATIVIDADE. QUER REINCIAR?'.replace(
          '#actual',
          actual.label
        )
      }
    }
  },
  mounted() {
    this.$store.commit('changeBackground', 'bg-menu')
    this.getNextMontagem()
  },
  methods: {
    expandShapes() {
      this.isExpandShapes = true
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
      this.showShapes = false
      setTimeout(() => {
        this.showShapes = true
      }, 10)
    },
    closePopUp() {
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
        }, 1500)
      } else {
        this.popUpText =
          'A planificação ainda não está correta. Que tal tentar de novo?'
        this.popUpImage = ''
        this.showPopUp = true
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
