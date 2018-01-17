<template lang="pug">
section.container
  h1.title テスト
  canvas#canvas(ref="canvas")
</template>

<script>
import Basic from '../../js/class/Basic'

export default {
  name: 'index-1',

  data: () => ({
    basic: null,
  }),

  mounted () {
    this.basic = new Basic({
      width: this.width,
      height: this.height,
      canvas: this.$refs.canvas,
    })

    this.basic.start()
  },

  destroyed() {
    if (this.basic) this.basic.stop()
  },

  head: () => ({
    title: '',
    meta: [
      { hid: 'description', name: 'description', content: '' },
    ],
  }),
}
</script>

<style lang="scss" scoped>
</style>
