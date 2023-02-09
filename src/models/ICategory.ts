export interface ICategories {
  categories: {
    href: string
    items: ICategory[]
    next: string
  }
}
export interface ICategory {
  href: string
  icons: [{ height: number; url: string; width: number }]
  id: string
  name: string
}
export interface IGenres {
  genres: String[]
}
