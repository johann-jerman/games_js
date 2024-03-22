export class Game {
  private game_width: number = window.innerWidth * 0.9
  private game_height: number = window.innerHeight * 0.9
  private debug: boolean = false
  private static instance: Game

  private constructor() {}

  public static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game()
    }
    return Game.instance
  }

  public get_width(): number {
    return this.game_width
  }
  public set_width(value: number): void {
    this.game_width = value
  }
  public get_height(): number {
    return this.game_height
  }
  public set_height(value: number): void {
    this.game_height = value
  }
  public get_debug(): boolean {
    return this.debug
  }
  public set_debug(value: boolean): void {
    this.debug = value
  }
}
