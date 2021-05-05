<template>
  <div class="pop-up">
    <div class="backdrop" @click.prevent="closeCreditos"></div>
    <div class="content">
      <div class="content-center">
        <div class="title-popup">Créditos</div>
        <div class="text">
          <p>Sons - Freesound</p>
          <p>Vetores - Freepik</p>
        </div>
      </div>
      <div class="btn-close icon-fechar" @click.prevent="closeCreditos"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopUp',
  methods: {
    closeCreditos() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.title-popup {
  font-size: 32px;
}
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
    width: 445px;
    height: 214px;
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
      flex-direction: column;
      margin-top: -40px;

      .image {
        margin-top: 30px;
      }
    }

    .text {
      margin-top: 30px;
      font-size: 18px;
      width: 352px;
      font-family: MavenProBlack;
      text-align: center;
      p {
        text-transform: capitalize;
      }
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
