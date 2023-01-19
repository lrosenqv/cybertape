export interface IUser {
  country: string
  display_name: string
  href: string
  id: string
  images: [
    {
      url: string
      height: number
      width: number
    }
  ]
  type: string
  uri: string
}
