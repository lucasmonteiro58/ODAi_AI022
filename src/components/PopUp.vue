<template>
  <div v-if="image" class="pop-up">
    <div class="backdrop" @click.prevent="close"></div>
    <div class="content">
      <div class="content-center">
        <div v-if="image" class="image" :class="image"></div>
        <div class="text-certo" v-html="text"></div>
      </div>
      <button class="btn-certo" @click.prevent="close">Vamos lá</button>
      <div class="btn-close icon-fechar" @click.prevent="close"></div>
    </div>
  </div>
  <div v-else class="pop-up">
    <div class="backdrop" @click.prevent="closeWrong"></div>
    <div class="content">
      <div class="content-center">
        <div class="text" v-html="text"></div>
      </div>
      <button @click.prevent="closeWrong">Vamos lá</button>
      <div class="btn-close icon-fechar" @click.prevent="closeWrong"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopUp',
  props: {
    text: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    closeWrong() {
      this.$emit('closewrong')
    }
  }
}
</script>

<style lang="scss" scoped>
.pop-up {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;

  .backdrop {
    position: absolute;
    background-color: #00000031;
    width: 100%;
    height: 100%;
  }

  .content {
    width: 533px;
    height: 268px;
    background-color: #f0f0f0;
    border-radius: 20px;
    z-index: 501;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    position: relative;

    .content-center {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;

      .image {
        margin-top: 30px;
      }
    }

    .text {
      margin-top: 30px;
      font-size: 26px;
      width: 352px;
      font-family: MavenProBlack;
      text-align: center;
    }

    .text-certo {
      margin-top: 20px;
      font-size: 24px;
      width: 402px;
      font-family: MavenProBlack;
      text-align: left;
    }

    .btn-close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 45px;
      filter: brightness(70%);
      cursor: pointer;
    }

    button {
      background-color: $orange;
      color: white;
      border-radius: 20px;
      width: 208px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 45px;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.3);
      font-size: 24px;
      font-family: MavenProBlack;

      &.btn-certo {
        margin-left: -50px;
      }

      &:hover {
        transform: scale(1.03);
      }

      &:active {
        filter: brightness(94%);
      }
    }
  }
}
</style>
