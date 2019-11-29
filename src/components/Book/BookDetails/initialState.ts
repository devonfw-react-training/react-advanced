import { fetchData } from "../../../common/utils"

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

export const validate = (values: FormValues) => {
  const required: string[] = ["title"]
  return required.reduce(
    (acc: Errors, curr: string): Errors =>
      values[curr] ? acc : { ...acc, [curr]: "require" },
    {}
  )
}

export const initialState = {
  values: { title: "", authors: "" },
  touched: { title: false, authors: false },
  errors: {},
  isSubmitting: false,
  formError: { message: "" }
}

export const onSubmit = (path: string, method: string) => (
  values: FormValues
) => {
  return fetchData(path, method, values)
}
