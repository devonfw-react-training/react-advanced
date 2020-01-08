import React, {FC, useState, useEffect, useCallback} from 'react'
import {Book} from '../../Book'
import {BooksService} from '../../services/BooksService'
import {RouteComponentProps} from 'react-router'
import {BookOverview} from './BookOverview'

export interface Props extends RouteComponentProps {
  bookService: Pick<BooksService, 'findAll'>
}

interface State {
  books: Book[]
}

export const BookOverviewContainer: FC<Props> = ({bookService, history}) => {
  const [state, setState] = useState<State>({
    books: [],
  })

  useEffect(() => {
    bookService.findAll().then(books => setState({books}))
  }, [bookService, setState])

  const selectBook = useCallback(
    (book: Book) => {
      history.push(`/book-app/book/${book.id}`)
    },
    [history],
  )

  return <BookOverview books={state.books} selectBook={selectBook} />
}
