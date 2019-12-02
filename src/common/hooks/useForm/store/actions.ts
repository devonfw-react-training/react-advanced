import {
  types,
  SetFieldValue,
  SetFieldTouched,
  SubmitAttempt,
  SubmitSuccess,
  SubmitFailure,
  SetErrors,
  Field,
  Errors,
} from "./types"

const setFieldValue = (payload: Field): SetFieldValue => ({
  type: types.FORM_SET_FIELD_VALUE,
  payload,
})
const setFieldTouched = (payload: string): SetFieldTouched => ({
  type: types.FORM_SET_FIELD_TOUCHED,
  payload,
})
const submitAttempt = (): SubmitAttempt => ({
  type: types.FORM_SUBMIT_ATTEMPT,
})
const submitSuccess = (): SubmitSuccess => ({
  type: types.FORM_SUBMIT_SUCCESS,
})
const submitFailure = (payload: Errors): SubmitFailure => ({
  type: types.FORM_SUBMIT_FAILURE,
  payload,
})
const setErrors = (payload: Errors): SetErrors => ({
  type: types.FORM_SET_ERRORS,
  payload,
})

export const actions = {
  setFieldValue,
  setFieldTouched,
  submitAttempt,
  submitSuccess,
  submitFailure,
  setErrors,
}
