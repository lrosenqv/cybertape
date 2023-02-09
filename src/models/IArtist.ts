export interface IArtist {
  followers: { href: string; total: number }
  genres: string[]
  href: string
  id: string
  name: string
  popularity: number
  type: string
  uri: string
}
