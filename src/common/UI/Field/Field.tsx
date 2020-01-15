import { useContext, ReactNode, createElement } from "react"
import { FormContext } from "../../hooks/form"

interface Props {
  component?: string
  fieldName: string
  type?: string
  required?: boolean
  children?: ReactNode
}

export const Field = ({
  component = "input",
  fieldName,
  type = "text",
  children,
}: Props) => {
  const { getFieldProps } = useContext(FormContext)
  const fieldProps = {
    ...getFieldProps(fieldName),
    type,
  }
  return createElement(component, fieldProps, children)
}
