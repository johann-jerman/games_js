import { Game } from './Game'

export class Paddle {
  private _x: number
  private _y: number
  private _width: number = 150
  private _movement: number = 10
  private _height: number = 25
  private _leftPressed: boolean = false
  private _rightPressed: boolean = false
  private game: Game = Game.getInstance()
  private image = document.getElementById('paddle-image') as HTMLImageElement

  constructor() {
    this._x = this.game.get_width() / 2 - this._width
    this._y = this.game.get_height() - this._height * 2
  }

  public DrawPaddle(ctx: CanvasRenderingContext2D): void {
    const ctxImage = {
      image: this.image,
      sx: 75,
      sy: 156,
      dx: this._x,
      dy: this._y,
      sw: 103,
      sh: 25,
      dw: this._width,
      dh: this._height,
    }

    ctx.drawImage(
      ctxImage.image,
      ctxImage.sx,
      ctxImage.sy,
      ctxImage.sw,
      ctxImage.sh,
      ctxImage.dx,
      ctxImage.dy,
      ctxImage.dw,
      ctxImage.dh
    )
  }

  public get_x(): number {
    return this._x
  }
  public set_x(value: number) {
    this._x = value
  }

  public get_y(): number {
    return this._y
  }
  public set_y(value: number) {
    this._y = value
  }

  public get_width(): number {
    return this._width
  }
  public set_width(value: number) {
    this._width = value
  }

  public get_height(): number {
    return this._height
  }
  public set_height(value: number) {
    this._height = value
  }

  public HandleKeyDown(event: KeyboardEvent): void {
    const { key } = event
    if (key === 'Right' || key === 'ArrowRight' || key.toLowerCase() === 'd') {
      this._rightPressed = true
    }
    if (key === 'Left' || key === 'ArrowLeft' || key.toLowerCase() === 'a') {
      this._leftPressed = true
    }
  }
  public HandleKeyUp(event: KeyboardEvent): void {
    const { key } = event
    if (key === 'Right' || key === 'ArrowRight' || key.toLowerCase() === 'd') {
      this._rightPressed = false
    }
    if (key === 'Left' || key === 'ArrowLeft' || key.toLowerCase() === 'a') {
      this._leftPressed = false
    }
  }

  public MovePaddle(): void {
    if (this._leftPressed && this._x > 0) {
      this._x -= this._movement
    }
    if (this._rightPressed && this._x + this._width < this.game.get_width()) {
      this._x += this._movement
    }
  }
}
