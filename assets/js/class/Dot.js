import * as PIXI from 'pixi.js'
// import { TweenMax, Quint } from 'gsap'
import fs from '../../materials/fs/dot.fs'
import vs from '../../materials/vs/dot.vs'

class DotFilter extends PIXI.Filter {
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
  }

  initGraphic() {
    this.g = PIXI.Sprite.fromImage('/img/poly.png')
    this.g.x = (this.width / 2)
    this.g.y = (this.height / 2)
    this.app.stage.addChild(this.g)
  }

  initFilter() {
    this.filter = new DotFilter()
    this.g.filters = [this.filter]
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
