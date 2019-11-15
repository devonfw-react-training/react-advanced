import React, { FunctionComponent, FormEvent } from "react"
import { Form, ButtonToolbar, Button } from "react-bootstrap"
import { useForm } from "../../../common/hooks/useForm"
import { Book } from ".."
import validate from "./validate"

interface Props {
  selectedBook: Book
}
interface FormValues {
  title: string
  authors: string
  [key: string]: string
}

const BookDetails: FunctionComponent<Props> = ({ selectedBook }) => {
  const { state, getFieldProps } = useForm<FormValues>({
    initialState: {
      values: { title: selectedBook.title, authors: selectedBook.authors },
      errors: {},
    },
    validate,
  })
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(state)
  }
  return (
    <div>
      Selected Book: {selectedBook.title}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Authors:</Form.Label>
          <Form.Control
            type="text"
            {...getFieldProps("authors")}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control type="text" {...getFieldProps("title")}></Form.Control>
        </Form.Group>
        <ButtonToolbar>
          <Button type="submit">Save</Button>
        </ButtonToolbar>
      </Form>
    </div>
  )
}
export default BookDetails
