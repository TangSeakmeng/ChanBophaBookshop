export interface Category {
  key: string,
  name: string,
  subcategory: Category,
  subsubcategory: Category,

  createdAt: number,
  updatedAt: number
}
