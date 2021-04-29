
class Track {
  constructor (id: string, position: number, name: string, artists: string[], durationMs: number, url: string, image: string, previewUrl: string) {
    this.id = id
    this.position = position
    this.name = name
    this.artists = artists
    this.durationMs = durationMs
    this.url = url
    this.image = image
    this.previewUrl = previewUrl
    this.type = 'tracks'

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

class Artist {
  constructor (id: string, position: number, name: string, genres: string[], followers: number, url: string, image: string) {
    this.id = id
    this.position = position
    this.name = name
    this.genres = genres
    this.followers = followers
    this.url = url
    this.image = image
    this.type = 'artists'

    Object.freeze(this)
  }

    id: string
    position: number
    type: string
    name: string
    genres: string[]
    followers: number
    url: string
    image: string
}

export { Track, Artist }
