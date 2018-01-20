<template lang="pug">
section.container
  canvas#canvas(ref="canvas")
</template>

<script>
import Basic from '../../assets/js/class/Basic'

export default {
  name: 'index-1',

  data: () => ({
    basic: null,
  }),

  mounted () {
    this.basic = new Basic({
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
