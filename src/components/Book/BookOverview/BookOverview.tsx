import React, { FunctionComponent, useState, useEffect } from "react"
import { Row, Container, Col, Table } from "react-bootstrap"
import { fetchData } from "../../../common/utils"
import { Book, BookDetails } from ".."

interface State {
  books: Book[]
  selectedBook: Book | null
  message: string
}

const BookOverview: FunctionComponent<{}> = () => {
  const [state, setState] = useState<State>({
    books: [],
    selectedBook: null,
    message: "no books",
  })
  const selectBook = (book: Book): void => {
    console.log("selectBook")
    setState(state => ({
      ...state,
      selectedBook: book,
    }))
  }

  useEffect(() => {
    fetchData("books")
      .then((books: Book[]): void => {
        setState(state => ({ ...state, books }))
      })
      .catch((error: Error): void => {
        setState(state => ({ ...state, message: error.message }))
      })
  }, [])
  return (
    <Container>
      <Row>
        <Col md={8}>
          <Table hover striped>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Authors</th>
                <th scope="col">Title</th>
              </tr>
            </thead>
            <tbody>
              {state.books.length ? (
                state.books.map((book, i) => (
                  <tr key={book.id} onClick={() => selectBook(book)}>
                    <th scope="row">{i + 1}</th>
                    <td>{book.authors}</td>
                    <td>{book.title}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>{state.message}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
        <Col md={4}>
          {state.selectedBook && (
            <BookDetails selectedBook={state.selectedBook} />
          )}
        </Col>
      </Row>
    </Container>
  )
}
export default BookOverview
