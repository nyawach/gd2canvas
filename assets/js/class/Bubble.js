import * as PIXI from 'pixi.js'

class BubbleFilter extends PIXI.Filter {
  constructor() {
    super(
      // vertex shader
      null,
      // fragment shader
      null,
      // uniforms
      null,
    )
  }
}

const baseColor = 0x0db8cd

export default class Bubble {
  constructor(opts = {}) {
    if (!opts.canvas) throw new Error('no canvas.')

    this.bubbles = []
    this.width = opts.w || window.innerWidth
    this.height = opts.h || window.innerHeight
    this.running = false

    this.app = new PIXI.Application(this.width, this.height, {
      view: opts.canvas,
      transparent: false,
      backgroundColor: baseColor,
    })

    this.initGraphic()
    this.initListener()
  }

  initGraphic() {
    const BUBBLE_NUM = 10
    // n個PIXI.Graphics生成+初期化
    for (let i = 0; i < BUBBLE_NUM; i += 1) {
      const b = new PIXI.Graphics()
      const size = (Math.random() * 30) + 10
      b.beginFill(0xffffff)
      b.drawCircle(0, 0, size)
      b.alpha = (1 / (size ** 2)) + 1
      b.filters = [
        new BubbleFilter(),
      ]
      this.initBubble(b, Math.random())
      b.endFill()
      this.bubbles.push(b)
    }
    this.app.stage.addChild(...this.bubbles)
  }

  initBubble(b, seed) {
    b.x = parseInt(seed * this.width, 10)
    b.y = parseInt((this.height + b.height) - (seed * 50), 10)
    // 勝手に付ける
    b.vx = 0
    // b.vx = parseInt((seed * 5) - 10, 10)
    b.vy = parseInt(-seed * 10, 10)
  }

  initListener() {
    this.app.view.addEventListener('click', () => {
      this.running = !this.running
    })
  }

  start() {
    if (this.running) return
    this.app.start()
    this.app.ticker.add(() => {
      if (!this.running) return
      this.update()
    })
  }

  update() {
    this.bubbles.forEach((b) => {
      b.setTransform(b.x + b.vx, b.y + b.vy)
      b.vy -= 0.04
      if (b.y <= -b.height) this.initBubble(b, Math.random())
      if (b.x <= 0 || this.width <= b.x) this.initBubble(b, Math.random())
    })
  }

  stop() {
    if (this.app) this.app.stop()
  }

  dispose() {
    console.log('[dispose]', this)
  }
}
