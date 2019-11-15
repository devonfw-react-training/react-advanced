import { ActionFactory } from "../../../utils"

export type Field = {
  [key: string]: string
}

export interface Errors {
  [key: string]: string
}

export interface Action {
  type: string
  payload: Payload
}

export type Payload = Field | Errors | null

export const actionCreators = {
  setFieldValue: ActionFactory<Field>("FORM_SET_FIELD_VALUE"),
  submitAttempt: ActionFactory<null>("FORM_SUBMIT_ATTEMPT"),
  submitSuccess: ActionFactory<null>("FORM_SUBMIT_SUCCESS"),
  submitFailure: ActionFactory<null>("FORM_SUBMIT_FAILURE"),
  setErrors: ActionFactory<Errors>("FORM_SET_ERRORS"),
}
