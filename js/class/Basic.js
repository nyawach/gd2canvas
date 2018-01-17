import * as PIXI from 'pixi.js'
import { TweenMax, Bounce } from 'gsap'

export default class Basic {
  constructor(opts = {}) {
    if (!opts.canvas) throw new Error('no canvas.')

    this.app = new PIXI.Application(opts.w, opts.h, {
      view: opts.canvas,
      transparent: false,
    })

    this.g = null
    this.width = opts.w
    this.height = opts.h

    this.initGraphic()

    this.app.stage.addChild(this.g)

    this.initListener()
  }

  initListener() {
    this.g.on('click', () => this.animate())
  }

  initGraphic() {
    this.g = new PIXI.Graphics()
    this.g.beginFill(0xfffff, 1)
    this.g.lineStyle(10, 0x00ff00, 1)
    this.g.drawRect(100, 100, 50, 50)
    this.g.endFill()
    this.g.interactive = true
    this.g.cursor = 'pointer'
  }

  animate() {
    // 動いてたら特に何もしない
    if (this.tw || !this.g) return
    this.tw = TweenMax.to(this.g, 1.4, {
      x: this.width - 200,
      y: this.height - 200,
      ease: Bounce.easeOut,
    })
  }

  start() {
    this.app.start()
  }

  stop() {
    if (this.app) this.app.stop()
  }
}
