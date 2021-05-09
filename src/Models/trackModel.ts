class Track {
  constructor(
    id: string,
    position: number,
    name: string,
    artists: string[],
    durationMs: number,
    url: string,
    image: string,
    previewUrl: string
  ) {
    this.id = id
    this.position = position
    this.name = name
    this.artists = artists
    this.durationMs = durationMs
    this.url = url
    this.image = image
    this.previewUrl = previewUrl
    this.type = "track"

    Object.freeze(this)
  }

  id: string
  position: number
  type: string
  name: string
  artists: string[]
  durationMs: number
  url: string
  image: string
  previewUrl: string
}

export default Track 
