import type { ITrack } from './ITrack'

export interface ISeeds {
  seeds: ISeed[]
  tracks: ITrack[]
}
export interface ISeed {
  afterFilteringSize: number
  afterRelinkingSize: number
  href: string
  id: string
  initialPoolSize: number
  type: string
}
