export class Bricks {
  private _x: number
  private _y: number
  private _width: number = 70
  private _heigth: number = 50
  private _image: HTMLImageElement
  private _sw: number
  private _sh: number
  private _sx: number
  private _sy: number

  constructor(
    x: number,
    y: number,
    sw: number,
    sh: number,
    sy: number,
    sx: number,
    image?: HTMLImageElement
  ) {
    this._y = y
    this._x = x
    this._image =
      image ?? (document.getElementById('bricks-image') as HTMLImageElement)
    this._sh = sh ?? 70
    this._sw = sw ?? 70
    this._sx = sx
    this._sy = sy
  }

  public get_y(): number {
    return this._y
  }

  public set_y(y: number) {
    this._y = y
  }
  public get_x(): number {
    return this._x
  }

  public set_x(x: number) {
    this._x = x
  }

  public get_width(): number {
    return this._width
  }

  public get_heigth(): number {
    return this._heigth
  }

  public get_sy(): number {
    return this._sy
  }

  public get_sx(): number {
    return this._sx
  }

  public get_sw(): number {
    return this._sw
  }

  public get_sh(): number {
    return this._sh
  }

  public get_image() {
    return this._image
  }
}
