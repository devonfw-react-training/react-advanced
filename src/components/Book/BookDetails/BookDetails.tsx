import React, { FunctionComponent, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { Form, ButtonToolbar, Button } from "react-bootstrap"
import { fetchData } from "../../../common/utils"
import { useForm, Errors } from "../../../common/hooks"
import {
  FormValues,
  FormTouched,
  initialState,
  validate,
  onSubmit
} from "./initialState"
import { Book } from ".."

type Params = { id?: string | undefined }

const BookDetails: FunctionComponent<{}> = () => {
  const history = useHistory()
  const params: Params = useParams()
  const method = params.id ? "PUT" : "POST"
  const path = params.id ? `books/${params.id}` : "books"
  const {
    state: { errors, touched, formError },
    getFieldProps,
    handleSubmit,
    dispatch,
    actions: { setFieldValue, setErrors }
  } = useForm<FormValues, FormTouched>({
    initialState,
    validate,
    onSubmit: onSubmit(path, method)
  })
  useEffect(() => {
    fetchData(`books/${params.id}`)
      .then(({ id, title, authors }: Book): void => {
        dispatch(setFieldValue({ id, title, authors }))
      })
      .catch((error: Errors): void => {
        dispatch(setErrors(error))
      })
  }, [params.id, dispatch, setFieldValue, setErrors])
  return (
    <div>
      <div>{formError.message}</div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="authors">Authors:</Form.Label>
          <Form.Control
            type="text"
            {...getFieldProps("authors")}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="title">Title:</Form.Label>
          <Form.Control
            required
            type="text"
            {...getFieldProps("title")}
          ></Form.Control>
          {touched.title && (
            <Form.Control.Feedback>{errors.title}</Form.Control.Feedback>
          )}
        </Form.Group>
        <ButtonToolbar>
          <Button variant="light" type="button" onClick={history.goBack}>
            Back
          </Button>
          <Button type="submit">Save</Button>
        </ButtonToolbar>
      </Form>
    </div>
  )
}
export default BookDetails
