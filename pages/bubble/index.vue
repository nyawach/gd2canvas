<template lang="pug">
section.container
  canvas#canvas(ref="canvas")
</template>

<script>
import Bubble from '../../assets/js/class/Bubble'

export default {
  name: 'bubble',

  data: () => ({
    bubble: null,
  }),

  mounted () {
    this.bubble = new Bubble({
      canvas: this.$refs.canvas,
    })

    this.bubble.start()
  },

  destroyed() {
  },

  head: () => ({
    title: 'bubble',
    meta: [
      { hid: 'description', name: 'description', content: '' },
    ],
  }),
}
</script>

<style lang="scss" scoped>
</style>
