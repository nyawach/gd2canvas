import * as PIXI from 'pixi.js'
import { TweenMax, Bounce } from 'gsap'
import fs from '../../materials/fs/colorful.fs'
import vs from '../../materials/vs/basic.vs'

class BasicFilter extends PIXI.Filter {
  constructor() {
    const uniforms = {
      time: {
        type: '1f',
        value: 0.0,
      },
    }

    super(
      // vertex shader
      vs,
      // fragment shader
      fs,
      // uniforms
      uniforms,
    )
  }
}

export default class Basic {
  constructor(opts = {}) {
    if (!opts.canvas) throw new Error('no canvas.')

    this.g = null
    this.width = opts.w || window.innerWidth
    this.height = opts.h || window.innerHeight

    this.app = new PIXI.Application(this.width, this.height, {
      view: opts.canvas,
      transparent: false,
    })

    this.initGraphic()

    this.initFilter()

    // this.initListener()
  }

  // initListener() {
  //   this.g.on('click', () => this.animate())
  // }

  initGraphic() {
    this.g = new PIXI.Graphics()
    this.g.beginFill(0xffffff, 1)
    this.g.drawRect(0, 0, this.width, this.height)
    this.g.endFill()
    this.app.stage.addChild(this.g)
  }

  initFilter() {
    this.filter = new BasicFilter()
    this.app.stage.filters = [this.filter]
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
    this.app.ticker.add(() => {
      this.filter.uniforms.time += this.app.ticker.elapsedMS * 0.001;
    })
  }

  stop() {
    if (this.app) this.app.stop()
  }
}
