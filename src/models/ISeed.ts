export interface ISeeds {
  seeds: ISeed[]
  tracks: []
}

export interface ISeed {
  afterFilteringSize: number
  afterRelinkingSize: number
  href: string
  id: string
  initialPoolSize: number
  type: string
}
