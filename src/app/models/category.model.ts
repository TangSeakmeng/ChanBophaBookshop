export interface Category {
  key: string,
  name: string,
  icon: any,
  subcategory: Category,
  subsubcategory: Category,
  published: boolean,
  publishedOnHomepage: boolean,

  createdAt: number,
  updatedAt: number
}
