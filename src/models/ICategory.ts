export interface ICategories {
  categories: ICategory
}

export interface ICategory {
  href: string
  items: ICategoryItem[]
  next: string
}

export interface ICategoryItem {
  href: string
  icons: [{ height: number; url: string; width: number }]
  id: string
  name: string
}
