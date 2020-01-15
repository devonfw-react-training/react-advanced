import { fetchData } from "../common/utils"

export interface FormValues {
  id?: number | undefined
  title: string
  authors: string
  [key: string]: string | number | undefined
}

export interface FormTouched {
  title: boolean
  authors: boolean
  [key: string]: boolean
}

interface Errors {
  [key: string]: string
}

export const initialState = {
  values: { title: "", authors: "" },
  touched: { title: false, authors: false },
  errors: {},
  isSubmitting: false,
  formError: { message: "" },
}

export const validate = (values: { [key: string]: string }) => {
  const required: string[] = ["title"]
  return required.reduce(
    (acc: Errors, curr: string): Errors =>
      values[curr] ? acc : { ...acc, [curr]: "require" },
    {},
  )
}

export const onSubmit = (
  path: string,
  method: string,
  values: {
    [key: string]: string
  },
) => {
  const abortController = new AbortController()
  return fetchData(path, {
    method,
    body: values,
    signal: abortController.signal,
  }).finally(() => abortController.abort())
}
