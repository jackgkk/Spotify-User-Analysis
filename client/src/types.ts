class Track {
  constructor (position: number, name: string, artists: string[], durationMs: number, url: string, image: string, previewUrl: string) {
    this.position = position
    this.name = name
    this.artists = artists
    this.durationMs = durationMs
    this.url = url
    this.image = image
    this.previewUrl = previewUrl

    Object.freeze(this)
  }

  position: number
  name: string
  artists: string[]
  durationMs: number
  url: string
  image: string
  previewUrl: string
}

class Artist {
  constructor (name: string, genres: string[], followers: number, url: string, image: string) {
    this.name = name
    this.genres = genres
    this.followers = followers
    this.url = url
    this.image = image

    Object.freeze(this)
  }

    name: string
    genres: string[]
    followers: number
    url: string
    image: string
}

export { Track, Artist }
