class Artist {
  constructor(
    id: string,
    position: number,
    name: string,
    genres: string[],
    followers: number,
    url: string,
    image: string
  ) {
    this.id = id
    this.position = position
    this.name = name
    this.genres = genres
    this.followers = followers
    this.url = url
    this.image = image
    this.type = "artist"

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

export default Artist
