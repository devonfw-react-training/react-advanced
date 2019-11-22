export interface FormValues {
  username: string
  password: string
  [key: string]: string
}

export interface FormTouched {
  username: boolean
  password: boolean
  [key: string]: boolean
}

interface Errors {
  [key: string]: string
}

export const initialState = {
  values: { username: "", password: "" },
  touched: { username: false, password: false },
  errors: {},
  isSubmitting: false,
  formError: { message: "" },
}

export const validate = (values: FormValues) => {
  const required: string[] = ["username", "password"]
  return required.reduce(
    (acc: Errors, curr: string): Errors =>
      values[curr] ? acc : { ...acc, [curr]: "require" },
    {},
  )
}

export const onSubmit = (values: FormValues) => {
  console.log(values)
}
