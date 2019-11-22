import { useReducer, useEffect, FormEvent } from "react"
import { reducer, State, actions, Errors } from "./store"

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

export const useForm = <S, T>({
  initialState,
  onSubmit,
  validate,
}: {
  initialState: State<S, T>
  onSubmit: (values: S) => void
  validate: (values: S) => Errors
}) => {
  const [state, dispatch]: any = useReducer(reducer, initialState)
  useEffect(
    () => {
      dispatch(setErrors(validate(state.values)))
    },
    [state.values, validate],
  )
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
    name: fieldName,
    value: state.values[fieldName],
    onInput: handleChange(fieldName),
    onBlur: handleBlur(fieldName),
    onChange: handleChange(fieldName),
  })
  const handleSubmit = async (e: FormElEvent) => {
    e.preventDefault()
    dispatch(submitAttempt())
    const errors = validate(state.values)
    if (!Object.keys(errors).length) {
      try {
        await onSubmit(state.values)
        dispatch(submitSuccess())
      } catch (submitError) {
        dispatch(submitFailure(submitError))
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
