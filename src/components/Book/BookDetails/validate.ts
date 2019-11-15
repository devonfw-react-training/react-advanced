interface Errors {
  [key: string]: string
}
interface Values {
  title: string
  authors: string
  [key: string]: string
}

export default (values: Values) => {
  const required: string[] = ["title"]
  return required.reduce(
    (acc: Errors, curr: string): Errors =>
      values[curr] ? acc : { ...acc, [curr]: "require" },
    {},
  )
}
