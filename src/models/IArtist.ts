export interface IArtists {
  artists: {
    href: string
    items: IArtist[]
  }
}

export interface IArtist {
  followers: { href: string; total: number }
  genres: string[]
  href: string
  id: string
  name: string
  popularity: number
  uri: string
}
