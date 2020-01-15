import { Errors, types } from "./types"

export interface State {
  values: {
    [key: string]: string
  }
  touched: {
    [key: string]: boolean
  }
  errors: Errors
  isSubmitting: boolean
  formError: Errors
}

export const reducer = (state: State, action: any): State => {
  switch (action.type) {
    case types.FORM_SET_FIELD_VALUE:
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload,
        },
      }
    case types.FORM_SET_FIELD_TOUCHED:
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.payload]: true,
        },
      }
    case types.FORM_SUBMIT_SUCCESS:
      return {
        ...state,
        isSubmitting: true,
      }
    case types.FORM_SUBMIT_ATTEMPT:
      return {
        ...state,
        isSubmitting: false,
      }
    case types.FORM_SUBMIT_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        formError: action.payload,
      }
    case types.FORM_SET_ERRORS:
      return {
        ...state,
        errors: { ...action.payload },
      }
    default:
      return state
  }
}
