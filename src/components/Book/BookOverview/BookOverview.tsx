import React, { FunctionComponent, useState, useEffect } from "react"
import { Row, Container, Col, Table, Button } from "react-bootstrap"

import { useHistory } from "react-router-dom"
import { fetchData } from "../../../common/utils"
import { Book } from ".."

interface State {
  books: Book[]
  message: string
}

const BookOverview: FunctionComponent<{}> = () => {
  const [state, setState] = useState<State>({
    books: [],
    message: "no books",
  })
  const history = useHistory()
  const selectBook = (book: Book): void => {
    history.push(`/details/${book.id}`)
  }
  const openNewForm = () => {
    history.push("/details")
  }
  useEffect(() => {
    fetchData("books")
      .then((books: Book[]): void => {
        setState(state => ({ ...state, books }))
      })
      .catch(({ message }: Error): void => {
        setState(state => ({ ...state, message }))
      })
  }, [])
  return (
    <Container>
      <Row>
        <Col md={2}>
          <div>
            <Button variant="light" type="button" onClick={openNewForm}>
              Add new
            </Button>
          </div>
        </Col>
        <Col md={10}>
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
      </Row>
    </Container>
  )
}
export default BookOverview
