export interface IPlaylist {
  collaborative: boolean
  description: string
  href: string
  id: string
  images: []
  name: string
  owner: { display_name: string; href: string; id: string; type: string; uri: string }
  primary_color: string
  snapshot_id: string
  tracks: { href: string; total: number }
  type: string
  uri: string
}

export interface IPlaylists {
  href: string
  items: IPlaylist[]
  next: string
}

export interface IPlaylistResponse {
  playlists: IPlaylists
}
