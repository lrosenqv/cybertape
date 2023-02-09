import type { IArtist } from './IArtist'

export interface ITracks {
  href: string
  items: [{ track: ITrack }]
}
export interface ITrack {
  album: {
    album_type: string
    artists: IArtist[]
    avaliable_markets: string[]
    href: string
    id: string
    images: IImage[]
    name: string
    release_date: string
    uri: string
  }
  artists: IArtist[]
  avaliable_markets: string[]
  href: string
  id: string
  images: IImage[]
  name: string
  popularity: number
  type: string
  uri: string
}
interface IImage {
  height: number
  url: string
  width: number
}
