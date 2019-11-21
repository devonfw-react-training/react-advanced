import { Errors, types } from './types';

export interface State<S, T> {
  values: S;
  touched: T;
  errors: Errors;
  isSubmitting: boolean;
  submitError: Errors;
}

export const reducer = <S, T>(state: State<S, T>, action: any): State<S, T> => {
  switch (action.type) {
    case types.FORM_SET_FIELD_VALUE:
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload,
        },
      };
    case types.FORM_SET_FIELD_TOUCHED:
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.payload]: true,
        },
      };
    case types.FORM_SUBMIT_SUCCESS:
      return {
        ...state,
        isSubmitting: true,
      };
    case types.FORM_SUBMIT_ATTEMPT:
      return {
        ...state,
        isSubmitting: false,
      };
    case types.FORM_SUBMIT_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        submitError: action.payload,
      };
    case types.FORM_SET_ERRORS:
      return {
        ...state,
        errors: { ...action.payload },
      };
    default:
      return state;
  }
};
