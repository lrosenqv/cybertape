import type { IArtist } from './IArtist'

export interface ITracks {
  href: string
  tracks: ITrackItem[]
}

export interface ITrackItem {
  track: ITrack
}

export interface ITrack {
  album: {
    album_type: string
    artists: IArtist[]
    avaliable_markets: string[]
    href: string
    id: string
    name: string
    release_date: string
    uri: string
  }
  artists: IArtist[]
  avaliable_markets: string[]
  href: string
  id: string
  name: string
  popularity: number
  type: string
  uri: string
}
