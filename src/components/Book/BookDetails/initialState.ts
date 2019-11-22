export interface FormValues {
  title: string
  authors: string
  [key: string]: string
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
    {},
  )
}

export const initialState = {
  values: { title: "", authors: "" },
  touched: { title: false, authors: false },
  errors: {},
  isSubmitting: false,
  formError: { message: "" },
}

export const onSubmit = (values: FormValues) => {
  console.log(values)
}
