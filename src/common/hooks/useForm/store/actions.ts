import { types, Field, Errors } from "./types"

const setFieldValue = (payload: Field) => ({
  type: types.FORM_SET_FIELD_VALUE,
  payload,
})
const setFieldTouched = (payload: string) => ({
  type: types.FORM_SET_FIELD_TOUCHED,
  payload,
})
const submitAttempt = () => ({
  type: types.FORM_SET_FIELD_VALUE,
})
const submitSuccess = () => ({
  type: types.FORM_SET_FIELD_VALUE,
})
const submitFailure = (payload: Errors) => ({
  type: types.FORM_SET_FIELD_VALUE,
  payload,
})
const setErrors = (payload: Errors) => ({
  type: types.FORM_SET_FIELD_VALUE,
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
