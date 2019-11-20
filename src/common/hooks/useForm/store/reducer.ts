import {
  Errors,
  SetFieldValue,
  SetFieldTouched,
  SubmitSuccess,
  SubmitAttempt,
  SubmitFailure,
  SetErrors,
  types,
} from "./types"

export interface State<S, T> {
  values: S
  touched: T
  errors: Errors
  isSubmitting: boolean
  submitError: Errors
}

export const setFieldValue = <S, T>(
  state: State<S, T>,
  action: SetFieldValue,
): State<S, T> => ({
  ...state,
  values: {
    ...state.values,
    ...action.payload,
  },
})
export const setFieldTouched = <S, T>(
  state: State<S, T>,
  action: SetFieldTouched,
): State<S, T> => ({
  ...state,
  touched: {
    ...state.touched,
    [action.payload]: true,
  },
})
export const submitSuccess = <S, T>(
  state: State<S, T>,
  action: SubmitSuccess,
): State<S, T> => ({
  ...state,
  isSubmitting: true,
})
export const submitAttempt = <S, T>(
  state: State<S, T>,
  action: SubmitAttempt,
): State<S, T> => ({
  ...state,
  isSubmitting: false,
})
export const submitFailure = <S, T>(
  state: State<S, T>,
  action: SubmitFailure,
): State<S, T> => ({
  ...state,
  isSubmitting: false,
  submitError: action.payload,
})
export const setErrors = <S, T>(
  state: State<S, T>,
  action: SetErrors,
): State<S, T> => ({
  ...state,
  errors: { ...action.payload },
})

export const reducer = <S, T>(state: State<S, T>, action: any): State<S, T> => {
  switch (action.type) {
    case types.FORM_SET_FIELD_VALUE:
      return setFieldValue(state, action)
    case types.FORM_SET_FIELD_TOUCHED:
      return setFieldTouched(state, action)
    case types.FORM_SUBMIT_SUCCESS:
      return submitSuccess(state, action)
    case types.FORM_SUBMIT_ATTEMPT:
      return submitAttempt(state, action)
    case types.FORM_SUBMIT_FAILURE:
      return submitFailure(state, action)
    case types.FORM_SET_ERRORS:
      return setErrors(state, action)
    default:
      return state
  }
}
