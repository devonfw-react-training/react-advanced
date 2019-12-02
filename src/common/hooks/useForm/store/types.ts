export const types = {
  FORM_SET_FIELD_VALUE: "FORM_SET_FIELD_VALUE",
  FORM_SET_FIELD_TOUCHED: "FORM_SET_FIELD_TOUCHED",
  FORM_SUBMIT_ATTEMPT: "FORM_SUBMIT_ATTEMPT",
  FORM_SUBMIT_SUCCESS: "FORM_SUBMIT_SUCCESS",
  FORM_SUBMIT_FAILURE: "FORM_SUBMIT_FAILURE",
  FORM_SET_ERRORS: "FORM_SET_ERRORS",
}

export interface SetFieldValue {
  type: typeof types.FORM_SET_FIELD_VALUE
  payload: Field
}
export interface SetFieldTouched {
  type: typeof types.FORM_SET_FIELD_TOUCHED
  payload: string
}
export interface SubmitAttempt {
  type: typeof types.FORM_SET_FIELD_VALUE
}
export interface SubmitSuccess {
  type: typeof types.FORM_SET_FIELD_VALUE
}
export interface SubmitFailure {
  type: typeof types.FORM_SET_FIELD_VALUE
  payload: Errors
}
export interface SetErrors {
  type: typeof types.FORM_SET_FIELD_VALUE
  payload: Errors
}

export type Field = {
  [key: string]: string | number
}

export interface Errors {
  [key: string]: string
}

export interface SubmitError {
  message: string
}

export type Action =
  | SetFieldValue
  | SetFieldTouched
  | SubmitAttempt
  | SubmitSuccess
  | SubmitFailure
  | SetErrors
