import {RouteComponentProps} from 'react-router'
import React, {FC, useState, useEffect, useRef, useCallback} from 'react'
import {BooksService} from '../../services/BooksService'
import {Book} from '../../Book'
import {BookDetails} from './BookDetails'

interface RouteParams {
  id: string
}

interface BookDetailsContainerProps extends RouteComponentProps<RouteParams> {
  bookService: BooksService
}

interface BookDetailsContainerState {
  book: Book
}

const newBook: Book = {title: '', authors: ''}

function usePrevious(value: any) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export const BookDetailsContainer: FC<BookDetailsContainerProps> = ({
  location,
  match,
  history,
  bookService,
}) => {
  const [state, setState] = useState<BookDetailsContainerState>({
    book: newBook,
  })

  const previousValue = usePrevious(location.key)
  const bookIdAsNumber = +match.params.id

  useEffect(() => {
    if (previousValue !== location.key) {
      setState({
        book: newBook,
      })
    }
  }, [previousValue, setState, location])

  useEffect(() => {
    if (isNaN(bookIdAsNumber)) {
      history.push('/book-app/book')
    } else {
      bookService.findOne(bookIdAsNumber).then(
        book => setState({book}),
        () => history.push('/book-app/book'),
      )
    }
  }, [bookIdAsNumber, history, bookService, setState])

  const onBookChange = useCallback(
    async (book: Book): Promise<any> => {
      await bookService.save(book)
      return history.push('/book-app/books')
    },
    [bookService, history],
  )

  return (
    <BookDetails
      key={state.book.id}
      book={state.book}
      onBookChange={onBookChange}
    />
  )
}
