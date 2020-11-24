export interface Category {
  key: string,
  name: string,
  subcategory: Category,
  subsubcategory: Category,
  published: boolean,
  publishedOnHomepage: boolean,

  createdAt: number,
  updatedAt: number
}
