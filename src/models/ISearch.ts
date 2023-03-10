import type { IArtist } from './IArtist'
import type { ITrack } from './ITrack'

export interface ISearch {
  tracks: {
    href: string
    items: ITrack[]
    limit: number
    next: string
    offset: number
    previous: string
    total: number
  }
  artists: {
    href: string
    items: IArtist[]
    limit: number
    next: string
    offset: number
    previous: string
    total: number
  }
}
