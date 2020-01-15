import React, {
  FunctionComponent,
  useReducer,
  createContext,
  useEffect,
  FormEvent,
  Dispatch,
} from "react"
import { reducer, State, actions, Errors, Actions } from "./store"

const {
  setFieldValue,
  setFieldTouched,
  submitAttempt,
  submitSuccess,
  submitFailure,
  setErrors,
} = actions

type InputEvent = FormEvent<HTMLInputElement>
type FormElEvent = FormEvent<HTMLFormElement>

interface FormParams {
  initialState: State
  onSubmit: (
    path: string,
    method: string,
    values: { [key: string]: string },
  ) => void
  validate: (values: { [key: string]: string }) => Errors
}

export type UseFormReducer = [State, Dispatch<unknown>]

interface FieldProps {
  id: string
  name: string
  value: string
  onInput: (e: InputEvent) => void
  onBlur: (e: InputEvent) => void
  onChange: (e: InputEvent) => void
}

export interface FormContext {
  state: State
  getFieldProps: (fieldName: string) => FieldProps
  handleSubmit: (path: string, method: string) => (e: FormElEvent) => void
  dispatch: Dispatch<unknown>
  actions: Actions
}

export const useForm = ({ initialState, onSubmit, validate }: FormParams) => {
  const [state, dispatch]: UseFormReducer = useReducer(reducer, initialState)
  useEffect(() => {
    dispatch(setErrors(validate(state.values)))
  }, [state.values, validate])
  const handleChange = (fieldName: string) => (e: InputEvent) => {
    e.persist()
    dispatch(
      setFieldValue({
        [fieldName]: e.currentTarget.value,
      }),
    )
  }
  const handleBlur = (fieldName: string) => (e: InputEvent) => {
    e.persist()
    dispatch(setFieldTouched(fieldName))
  }
  const getFieldProps = (fieldName: string) => ({
    id: fieldName,
    name: fieldName,
    value: state.values[fieldName],
    onInput: handleChange(fieldName),
    onBlur: handleBlur(fieldName),
    onChange: handleChange(fieldName),
  })
  const handleSubmit = (path: string, method: string) => async (
    e: FormElEvent,
  ) => {
    e.preventDefault()
    dispatch(submitAttempt())
    const errors = validate(state.values)
    if (!Object.keys(errors).length) {
      try {
        await onSubmit(path, method, state.values)
        dispatch(submitSuccess())
      } catch (submitError) {
        dispatch(submitFailure({ message: submitError.message }))
      }
    } else {
      dispatch(setErrors(errors))
      dispatch(submitFailure({ message: "Not valid" }))
    }
  }
  return {
    state,
    getFieldProps,
    handleSubmit,
    dispatch,
    actions,
  }
}

export const FormContext = createContext<FormContext>({} as FormContext)

export const Form: FunctionComponent<FormParams> = ({
  initialState,
  validate,
  onSubmit,
  children,
}) => {
  const ctx: FormContext = useForm({ initialState, onSubmit, validate })
  return <FormContext.Provider value={ctx}>{children}</FormContext.Provider>
}
