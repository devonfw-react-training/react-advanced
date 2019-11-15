import { useReducer, useEffect, FormEvent } from "react"
import { reducer, State, actionCreators } from "./store"

const { setFieldValue, setErrors } = actionCreators

export const useForm = <T>({
  initialState,
  validate,
}: {
  initialState: State<T>
  validate: any
}) => {
  const [state, dispatch]: any = useReducer(reducer, initialState)
  const handleChange = (fieldName: string) => (
    e: FormEvent<HTMLInputElement>,
  ) => {
    e.persist()
    dispatch(
      setFieldValue.create({
        [fieldName]: e.currentTarget.value,
      }),
    )
  }
  const getFieldProps = (fieldName: string) => ({
    name: fieldName,
    value: state.values[fieldName],
    onInput: handleChange(fieldName),
    onChange: handleChange(fieldName),
  })
  useEffect(() => {
    dispatch(setErrors.create(validate(state.values)))
  }, [state.values, validate])
  return {
    state,
    getFieldProps,
  }
}
