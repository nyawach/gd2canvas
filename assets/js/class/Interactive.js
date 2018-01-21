import * as PIXI from 'pixi.js'
import { TweenMax, Quint } from 'gsap'
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

export default class Interactive {
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

    this.initListener()
  }

  initListener() {
    this.g.on('click', () => this.animate())
  }

  initGraphic() {
    this.g = new PIXI.Graphics()
    this.g.beginFill(0xffffff, 1)
    this.g.drawRect(0, 0, 20, this.height)
    this.g.x = (this.width / 2) - 10
    this.g.interactive = true
    this.g.cursor = 'pointer'
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
      rotation: Math.PI * 2,
      ease: Quint.easeInOut,
      onComplete: () => {
        this.g.rotation = 0
        this.tw = null
      },
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
