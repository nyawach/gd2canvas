<template lang="pug">
section.container
  h1.title テスト
  canvas#canvas(ref="canvas")
</template>

<script>
import * as PIXI from 'pixi.js'

export default {
  name: 'index-1',
  data: () => ({
    app: null,
    width: window.innerWidth,
    height: window.innerHeight,
  }),
  mounted () {
    this.app = new PIXI.Application(
      this.width,
      this.height,
      {
        view: this.$refs.canvas,
      },
    )
    const g = new PIXI.Graphics()
    g.beginFill(0xfffff, 1)
    g.lineStyle(10, 0x00ff00, 1)
    g.drawRect(100, 100, 50, 50)
    g.endFill()
    this.app.stage.addChild(g)
    this.app.render(this.app.stage)
    this.app.start()
  },
}
</script>

<style lang="scss" scoped>
</style>
