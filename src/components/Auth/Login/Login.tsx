import React, { FunctionComponent } from "react"
import { Form, ButtonToolbar, Button } from "react-bootstrap"
import { useForm } from "../../../common/hooks"
import { FormValues, FormTouched, initialState, validate, onSubmit } from "./initialState"

interface State {}
const Login: FunctionComponent<{}> = () => {
  const { getFieldProps, handleSubmit } = useForm<FormValues, FormTouched>({
    initialState,
    validate,
    onSubmit,
  })
  return (<div>
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
  </div>)
}
export default Login
