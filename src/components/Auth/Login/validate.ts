import { FormValues } from "./initialState"

interface Errors {
  [key: string]: string
}

export default (values: FormValues) => {
  const required: string[] = ["username", "password"]
  return required.reduce(
    (acc: Errors, curr: string): Errors =>
      values[curr] ? acc : { ...acc, [curr]: "require" },
    {},
  )
}
