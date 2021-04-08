<template>
  <div
    :title="name"
    class="container"
    :class="['rect-small', { 'is-complete': isComplete }]"
  >
    <div class="container-image">
      <div class="object" :class="image"></div>
    </div>
    <div class="name">{{ name }}</div>
    <div
      v-if="isComplete"
      draggable="false"
      class="checked"
      :class="'icon-check'"
      alt=""
    ></div>
  </div>
</template>

<script>
export default {
  name: 'ListObject',
  props: {
    name: {
      type: String,
      default: 'cubo'
    },
    image: {
      type: String,
      default: 'cubo-inteiro'
    },
    isComplete: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  position: relative;

  &.is-complete {
    opacity: 1;
  }

  &:hover {
    cursor: pointer;
    opacity: 1;
  }

  .container-image {
    width: 30px;
    position: absolute;
    left: 8px;
    transform: scale(0.27);

    .prisma-basepentagonal-inteiro {
      margin-left: 30px;
    }

    .cilindro-inteiro {
      margin-left: 20px;
    }
  }

  .name {
    font-family: MavenProBold;
    font-size: 20px;
    width: 122px;
    height: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 10px;
    margin-left: 36px;
  }

  .checked {
    position: absolute;
    top: -2px;
    right: 0px;
  }
}
</style>
