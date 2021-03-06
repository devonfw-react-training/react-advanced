import {Book} from '../Book'
import {BooksService} from './BooksService'

export class LocalBooksService implements BooksService {
  private sequencer = 0

  private books: Book[] = []

  constructor() {
    this.saveNew({
      authors: 'John Example',
      title: 'Example Book',
    })

    this.saveNew({
      authors: 'Joe Smith',
      title: 'Another Book',
    })
  }

  findAll(): Promise<Book[]> {
    return new Promise(resolve =>
      setTimeout(() => resolve([...this.books]), 2000),
    )
  }

  findOne(id: number): Promise<Book> {
    let bookCopy: Book
    const originalBook = this.books.find(book => book.id === id)
    if (originalBook) {
      bookCopy = {...originalBook}
    }

    return new Promise<Book>((resolve, reject) =>
      setTimeout(
        () =>
          bookCopy
            ? resolve(bookCopy)
            : reject(`book with id: ${id} not found`),
        1000,
      ),
    )
  }

  save(bookToSave: Book): Promise<Book> {
    if (bookToSave.id != null) {
      const book = this.books.find(book => book.id === bookToSave.id)
      if (book) {
        Object.assign(book, bookToSave)
        return this.findOne(bookToSave.id)
      }
    }
    return this.saveNewAndFindOne(bookToSave)
  }

  private saveNewAndFindOne(bookToSave: Book) {
    const {id} = this.saveNew(bookToSave)
    return this.findOne(id!)
  }

  private saveNew(bookToSave: Book): Book {
    const savedBook = {...bookToSave, id: this.nextId()}
    this.books.push(savedBook)
    return savedBook
  }

  private nextId() {
    return this.sequencer++
  }
}
