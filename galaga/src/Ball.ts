import { Game } from './Game'
import { Paddle } from './Paddle'
import { WallBick } from './WallBick'

export class Ball {
  private _x: number
  private _y: number
  private _radius: number = 5
  private move_x: number = 1
  private move_y: number = 1
  private paddle: Paddle
  private game: Game
  private wallBrick: WallBick = WallBick.getInstance()

  constructor(game: Game, paddle: Paddle) {
    this.paddle = paddle
    this.game = game
    this._x = game.get_width() / 2
    this._y = game.get_height() * 0.7 //-> inicio Y
  }

  public DrawBall(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.beginPath()
    ctx.arc(
      this._x + this._radius,
      this._y + this._radius,
      this._radius,
      0,
      Math.PI * 2
    )
    ctx.fillStyle = '#af649b'
    ctx.fill()
    ctx.restore()
  }

  public MoveBall() {
    if (this.IsTouchingRoof()) {
      this.set_move_y(-this.get_move_y())
    }

    if (this.IsTuochingLeftWall()) {
      this.set_move_x(-this.get_move_x())
    }

    if (this.IsTuochingRightWall()) {
      this.set_move_x(Math.abs(this.get_move_x()))
    }

    if (this.TouchFloor()) {
      this.set_move_x(0)
      this.set_move_y(0)
      this.set_y(-10)
      this.set_x(-10)
      location.reload()
    }

    if (this.IsTouchingPaddle()) {
      this.set_move_y(-this.get_move_y())
    }
    this.TouchBrick()
    this._y -= this.move_y
    this._x -= this.move_x
  }

  private TouchBrick() {
    const wall = WallBick.getInstance().get_wall()

    for (let i = 0; i < wall.length; i++) {
      for (let j = 0; j < wall[i].length; j++) {
        const isBallXAsLeftBrick =
          this._x > wall[i][j].get_x() &&
          this._x < wall[i][j].get_x() + wall[i][j].get_width() * 0.05

        const isBallXAsRigthBrick =
          this._x >
            wall[i][j].get_x() +
              wall[i][j].get_width() -
              wall[i][j].get_width() * 0.1 &&
          this._x < wall[i][j].get_x() + wall[i][j].get_width()

        const isBallXAsBrick =
          this._x > wall[i][j].get_x() &&
          this._x < wall[i][j].get_x() + wall[i][j].get_width()

        const isBallTouchYBrick =
          this._y > wall[i][j].get_y() &&
          this._y < wall[i][j].get_y() + wall[i][j].get_heigth()

        if (isBallXAsLeftBrick && isBallTouchYBrick) {
          wall[i].splice(j, 1)
          this.set_move_x(-this.get_move_x())
          continue
        }

        // if (isBallXAsRigthBrick && isBallTouchYBrick) {
        //   wall[i].splice(j, 1)

        //   this.set_move_x(Math.abs(this.get_move_x()))
        //   continue
        // }

        if (isBallXAsBrick && isBallTouchYBrick) {
          wall[i].splice(j, 1)
          this.set_move_y(-this.get_move_y())
          continue
        }
      }
    }
  }
  // private TouchBrick() {
  //   const wall = WallBick.getInstance().get_wall()

  //   for (let i = 0; i < wall.length; i++) {
  //     for (let j = 0; j < wall[i].length; j++) {
  //       const isBallXAsBrick =
  //         this._x > wall[i][j].get_x() &&
  //         this._x < wall[i][j].get_x() + wall[i][j].get_width()

  //       const isBallTouchYBrick =
  //         this._y > wall[i][j].get_y() &&
  //         this._y < wall[i][j].get_y() + wall[i][j].get_heigth()

  //       if (isBallXAsBrick && isBallTouchYBrick) {
  //         wall[i].splice(j, 1)
  //         this.set_move_y(-this.get_move_y())
  //       }
  //     }
  //   }
  // }

  private IsTouchingPaddle(): boolean {
    const isBallSameXAsPaddle =
      this._x > this.paddle.get_x() &&
      this._x < this.paddle.get_x() + this.paddle.get_width()
    const isBallTouchingPaddle =
      this._y > this.paddle.get_y() &&
      this._y < this.paddle.get_y() + this.paddle.get_height() / 2

    return isBallSameXAsPaddle && isBallTouchingPaddle
  }

  private TouchFloor(): boolean {
    return this._y > this.game.get_height()
  }

  private IsTouchingRoof(): boolean {
    return this._y < 0
  }

  private IsTuochingRightWall(): boolean {
    return this._x > this.game.get_width()
  }

  private IsTuochingLeftWall(): boolean {
    return this._x < 0
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
  public get_move_y(): number {
    return this.move_y
  }
  public set_move_y(value: number) {
    this.move_y = value
  }
  public get_move_x(): number {
    return this.move_x
  }
  public set_move_x(value: number) {
    this.move_x = value
  }

  public get_radius(): number {
    return this._radius
  }
  public set_radius(value: number) {
    this._radius = value
  }
}
