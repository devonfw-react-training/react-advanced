import React, { FunctionComponent } from "react"
import { useHistory } from "react-router-dom"
import { Form, ButtonToolbar, Button } from "react-bootstrap"
import { useForm } from "../../../common/hooks"
import {
  FormValues,
  FormTouched,
  initialState,
  validate,
  onSubmit,
} from "./initialState"
import { useBooks } from "./useBooks"

const BookDetails: FunctionComponent<{}> = () => {
  const history = useHistory()
  const {
    state: { values, errors },
    getFieldProps,
    handleSubmit,
    dispatch,
    actions: { setFieldValue, setErrors },
  } = useForm<FormValues, FormTouched>({
    initialState,
    validate,
    onSubmit,
  })
  useBooks(dispatch, { setFieldValue, setErrors })
  return (
    <div>
      <div>{values.formError}</div>
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
          <Form.Control
            required
            type="text"
            {...getFieldProps("title")}
          ></Form.Control>
          <Form.Control.Feedback>{errors.title}</Form.Control.Feedback>
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
