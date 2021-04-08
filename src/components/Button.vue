<template>
  <button v-if="isBig" class="is-big">
    <div :style="{ color: color }" class="name">{{ name }}</div>
    <div :class="imagem"></div>
  </button>
  <button v-else class="is-small">
    <div :class="imagem"></div>
    <div :style="{ color: color }" class="name">{{ name }}</div>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    name: {
      type: String,
      default: 'ajuda'
    },
    color: {
      type: String,
      default: '#ef7d00'
    },
    haveImage: {
      type: Boolean,
      default: true
    },
    imagem: {
      type: String,
      default: 'icon-ajuda'
    },
    isBig: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.is-small {
  background-color: $grey;
  width: 92px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: scale(1.03);
  }

  &:active {
    filter: brightness(94%);
  }

  .name {
    text-transform: uppercase;
    font-size: 16px;
  }
}

.is-big {
  background-color: $grey;
  width: 293px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 70px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: scale(1.03);
  }

  &:active {
    filter: brightness(94%);
  }

  .name {
    text-transform: uppercase;
    font-size: 28px;
    font-family: MavenProBlack;
  }
}
</style>
