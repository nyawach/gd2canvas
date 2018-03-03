<template lang="pug">
section.container
  canvas#canvas(ref="canvas")
</template>

<script>
import Dot from '../../assets/js/class/Dot'

export default {
  name: 'dot',

  data: () => ({
    dot: null,
  }),

  mounted () {
    this.dot = new Dot({
      canvas: this.$refs.canvas,
    })

    this.dot.start()
  },

  destroyed() {
    if (this.dot) this.dot.stop()
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
