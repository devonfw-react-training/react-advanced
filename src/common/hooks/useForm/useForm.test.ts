import React from "react"
import { renderHook, act } from "@testing-library/react-hooks"
import { useForm } from "./useForm"

export const initialState = {
  values: { title: "", authors: "" },
  touched: { title: false, authors: false },
  errors: {},
  isSubmitting: false,
  formError: { message: "" },
}

export const validate = (values: any) =>
  ["title"].reduce(
    (
      acc: typeof initialState.errors,
      curr: string,
    ): typeof initialState.errors =>
      values[curr] ? acc : { ...acc, [curr]: "require" },
    {},
  )

it("at the beginning state values should be empty", () => {
  const { result } = renderHook(() =>
    useForm({
      initialState,
      onSubmit: jest.fn(),
      validate,
    }),
  )
  expect(result.current.state.values.title).toEqual(initialState.values.title)
  expect(result.current.state.values.authors).toEqual(
    initialState.values.authors,
  )
})
it("at the beginning in state.errors should be title", () => {
  const { result } = renderHook(() =>
    useForm({
      initialState,
      onSubmit: jest.fn(),
      validate,
    }),
  )
  expect(result.current.state.errors.title).toEqual("require")
})
it("at the beginning every fields should be untouched", () => {
  const { result } = renderHook(() =>
    useForm({
      initialState,
      onSubmit: jest.fn(),
      validate,
    }),
  )
  expect(Object.values(result.current.state.touched).every(x => !x)).toEqual(
    true,
  )
})
it("should change value", () => {
  const event = {
    persist: () => {},
    currentTarget: { value: "text" },
  } as React.FormEvent<HTMLInputElement>
  const fieldName = "title"
  const { result } = renderHook(() =>
    useForm({
      initialState,
      onSubmit: jest.fn(),
      validate,
    }),
  )
  act(() => {
    result.current.getFieldProps(fieldName).onChange(event)
  })
  expect(result.current.state.values.title).toEqual("text")
})
it("should field to touched", () => {
  const event = {
    persist: () => {},
    currentTarget: { value: "text" },
  } as React.FormEvent<HTMLInputElement>
  const fieldName = "title"
  const { result } = renderHook(() =>
    useForm({
      initialState,
      onSubmit: jest.fn(),
      validate,
    }),
  )
  act(() => {
    result.current.getFieldProps(fieldName).onBlur(event)
  })
  expect(result.current.state.touched.title).toEqual(true)
})
