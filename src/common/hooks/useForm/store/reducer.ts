import { actionCreators, Errors, Action } from "./actionCreators"

export interface State<T> {
  values: T
  errors: Errors
}

export const reducer = <T>(
  state: State<T>,
  { type, payload }: Action,
): State<T> => {
  switch (type) {
    case actionCreators.setFieldValue.type:
      return {
        ...state,
        values: {
          ...state.values,
          ...payload,
        },
      }
    case actionCreators.setErrors.type:
      return { ...state, errors: { ...payload } }
    default:
      return state
  }
}
