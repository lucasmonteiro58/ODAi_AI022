<template>
  <div class="help-container">
    <div class="backdrop"></div>
    <div class="fechar-tutorial" @click="closeHelp">
      <p>Fechar Tutorial</p>
      <div class="icon-fechar"></div>
    </div>
    <div class="text-tutorial" :class="classText">
      {{ textAjudas[index] }}
    </div>
    <div class="button-section" :class="classText">
      <div
        class="btn icon-prev"
        :class="{ disable: index === 0 }"
        @click="prevClick"
      ></div>
      <div class="text">{{ index + 1 + ' de 3' }}</div>
      <div class="btn" :class="classBotaoPass" @click="nextClick"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      textAjudas: [
        '1.Observe a figura ao lado e complete as formas que faltam para completar a sua planificação.',
        '2. Arraste as formas do painel ao lado para completar a figura no centro. Se precisar apagar, clique na lixeira.',
        '3. Depois, clique em montar para conferir a sua resposta.'
      ]
    }
  },
  computed: {
    classText() {
      return 'ajuda' + this.index
    },
    classBotaoPass() {
      if (this.index === 2) {
        return 'icon-check-orange'
      } else return 'icon-pass'
    }
  },
  methods: {
    prevClick() {
      this.$emit('prevHelp')
    },
    nextClick() {
      this.$emit('nextHelp')
    },
    closeHelp() {
      this.$emit('closeHelp')
    }
  }
}
</script>

<style lang="scss" scoped>
.help-container {
  width: 980px;
  height: 720px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;

  .backdrop {
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.7;
    position: absolute;
    top: 0;
    left: 0;
  }
  .fechar-tutorial {
    position: absolute;
    cursor: pointer;
    z-index: 1010;

    top: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    p {
      font-size: 26px;
      color: white;
      font-family: MavenProBlack;
      opacity: 0.7;
    }

    .icon-fechar {
      opacity: 0.7;
    }
  }
}

.text-tutorial {
  position: absolute;
  color: white;
  font-family: MavenProBlack;
  text-transform: initial;
  font-size: 26px;

  &.ajuda0 {
    width: 450px;
    top: 260px;
    left: 254px;
  }

  &.ajuda1 {
    width: 537px;
    top: 532px;
    left: 302px;
    text-align: center;
  }

  &.ajuda2 {
    width: 487px;
    top: 463px;
    left: 447px;
    text-align: center;
  }
}

.button-section {
  position: absolute;
  display: flex;
  align-items: center;
  width: 220px;
  justify-content: space-between;

  .btn {
    cursor: pointer;
    z-index: 1010;

    &:hover {
      transform: scale(1.02);
    }

    &.disable {
      cursor: initial;
      opacity: 0.5;

      &:hover {
        transform: scale(1);
      }
    }
  }

  &.ajuda0 {
    top: 392px;
    left: 252px;
  }

  &.ajuda1 {
    top: 642px;
    left: 446px;
  }

  &.ajuda2 {
    top: 546px;
    left: 583px;
  }

  .text {
    color: white;
    font-family: MavenProBlack;
    text-transform: initial;
    font-size: 26px;
  }
}
</style>
