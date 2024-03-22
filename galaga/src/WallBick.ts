import { Bricks } from './Brick'
import { Game } from './Game'
import { bricksData } from './debug'

export class WallBick {
  private wall: Bricks[][] = []
  private last_x: number = 0
  private last_y: number = 25
  private _width: number = 70
  private _heigth: number = 50
  private game: Game = Game.getInstance()
  private _box_x: number = Math.floor(this.game.get_width() / this._width) + 1
  private _box_y: number = Math.floor(this.game.get_height() / this._heigth / 2)
  private static instance: WallBick

  public static getInstance() {
    if (!this.instance) {
      this.instance = new WallBick()
    }

    return this.instance
  }

  public GenWall(): void {
    for (let i = 0; i < this._box_y; i++) {
      const wallBrick = []
      for (let j = 0; j < this._box_x; j++) {
        const randomsBrick = Math.random() * bricksData.length
        const { sh, sw, sy, sx } = bricksData[Math.floor(randomsBrick)]
        const brick = new Bricks(
          0 + this.last_x,
          0 + this.last_y,
          sw,
          sh,
          sy,
          sx
        )
        wallBrick.push(brick)
        this.last_x += this._width
      }
      this.last_x = 0
      this.last_y += this._heigth
      this.wall.push(wallBrick)
    }
  }

  public DrawWall(ctx: CanvasRenderingContext2D): void {
    for (let i = 0; i < this.wall.length; i++) {
      for (let j = 0; j < this.wall[i].length; j++) {
        ctx.drawImage(
          this.wall[i][j].get_image(),
          this.wall[i][j].get_sx(),
          this.wall[i][j].get_sy(),
          this.wall[i][j].get_sw(),
          this.wall[i][j].get_sh(),
          this.wall[i][j].get_x(),
          this.wall[i][j].get_y(),
          this.wall[i][j].get_width(),
          this.wall[i][j].get_heigth()
        )
      }
    }
  }

  public get_last_x(): number {
    return this.last_x
  }

  public set_last_x(value: number): void {
    this.last_x = value
  }

  public get_last_y(): number {
    return this.last_y
  }

  public set_last_y(value: number): void {
    this.last_y = value
  }

  public get_wall(): Bricks[][] {
    return this.wall
  }

  public set_wall(value: Bricks[][]) {
    this.wall = value
  }
}
