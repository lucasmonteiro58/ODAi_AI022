<template>
  <div class="container rect-big">
    <div :class="image" draggable="false"></div>
    <div class="name">{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: 'SelectedObject',
  props: {
    image: {
      type: String,
      default: 'cubo-inteiro'
    },
    name: {
      type: String,
      default: 'cubo'
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .name {
    font-family: MavenProBlack;
    font-size: 24px;
    margin-top: 20px;
    text-align: center;
    line-height: 24px;
    width: 80%;
  }
}
</style>
