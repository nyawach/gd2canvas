<template lang="pug">
section.container
  canvas#canvas(ref="canvas")
</template>

<script>
import Interactive from '../../assets/js/class/Interactive'

export default {
  name: 'index-1',

  data: () => ({
    Interactive: null,
  }),

  mounted () {
    this.interactive = new Interactive({
      canvas: this.$refs.canvas,
    })

    this.interactive.start()
  },

  destroyed() {
    if (this.interactive) this.interactive.stop()
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
