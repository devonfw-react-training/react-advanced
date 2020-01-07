export interface Book {
  id?: number
  title: string
  authors: string
}

export type BookProperties = Omit<Book, 'id'>
