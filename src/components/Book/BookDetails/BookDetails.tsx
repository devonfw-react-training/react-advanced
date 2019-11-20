import React, { FunctionComponent, useEffect, useState } from "react"
import { useParams, useHistory } from 'react-router-dom'
import { Form, ButtonToolbar, Button } from "react-bootstrap"
import { useForm } from "../../../common/hooks/useForm"
import { fetchData } from "../../../common/utils"
import { Book } from ".."
import { FormValues, FormTouched, initialState, validate, onSubmit } from "./initialState"

type Params = { id?: string | undefined }

const BookDetails: FunctionComponent<{}> = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const { state, getFieldProps, handleSubmit, dispatch, actions: { setFieldValue } } = useForm<FormValues, FormTouched>({
    initialState,
    validate,
    onSubmit,
  })
  const params: Params = useParams()
  const history = useHistory()
  useEffect(() => {
    fetchData(`books/${params.id}`)
      .then(({ title, authors }: Book): void => {
        dispatch(setFieldValue({ title, authors }))
        setErrorMessage("")
      })
      .catch(({ message }: Error): void => {
        setErrorMessage(message)
      })
  }, [params.id, dispatch, setFieldValue ])
  return (
    <div>
      {errorMessage || `Selected Book: ${state.values.title}`}
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
          <Form.Control required type="text" {...getFieldProps("title")}></Form.Control>
          <Form.Control.Feedback>{state.errors.title}</Form.Control.Feedback>
        </Form.Group>
        <ButtonToolbar>
          <Button variant="light" type="button" onClick={history.goBack}>Back</Button>
          <Button type="submit">Save</Button>
        </ButtonToolbar>
      </Form>
    </div>
  )
}
export default BookDetails
