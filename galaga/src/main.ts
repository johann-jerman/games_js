import { Ball } from './Ball'
import { Game } from './Game'
import { Paddle } from './Paddle'
import { WallBick } from './WallBick'
const game = Game.getInstance()

const canvas = document.getElementById('canvas') as HTMLCanvasElement
canvas.width = game.get_width()
canvas.height = game.get_height()

const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

const paddle = new Paddle()
const wallBricks = WallBick.getInstance()
wallBricks.GenWall()
const ball = new Ball(game, paddle)

function update() {
  setInterval(() => {
    // window.requestAnimationFrame(update)
    ctx.clearRect(0, 0, game.get_width(), game.get_height())
    ball.MoveBall()
    ball.DrawBall(ctx)
    paddle.MovePaddle()
    paddle.DrawPaddle(ctx)
    wallBricks.DrawWall(ctx)
    //debug mode
    game.set_debug(true)
    if (game.get_debug()) debug()
  }, 1000 / 60)
}
update()

window.addEventListener('keydown', (event) => paddle.HandleKeyDown(event))
window.addEventListener('keyup', (event) => paddle.HandleKeyUp(event))

function debug() {
  const debug = document.getElementById('debug') as HTMLElement
  debug.innerHTML = `
  <p>paddle y ${paddle.get_y()}</p>
  <p>ball y ${ball.get_y()}</p>
`
}
