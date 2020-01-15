import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { act } from "@testing-library/react-hooks"
import { MemoryRouter } from "react-router-dom"
import React from "react"
import { fetchData } from "../../../common/utils"
import { FormContext } from "../../../common/hooks/form"

import { BookDetails } from "."

jest.mock("../../../common/utils", () => {
  return {
    fetchData: () =>
      Promise.resolve({ id: 1, title: "book 1", authors: "authors" }),
  }
})
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "1",
  }),
}))

describe("BookDetails", () => {
  // // /**
  // //  * Suppress React 16.12.0 act() warnings globally.
  // //  */
  const originalError = console.error
  beforeAll(() => {
    console.error = jest.fn()
  })
  afterAll(() => {
    console.error = originalError
  })
  it("should render error text if title was not input", () => {
    const values = { title: "", authors: "authors 1" }
    const ctx = { 
      state: { values, errors: { title: "require" }, touched: { title: true }, isSubmitting: false, formError: {} },
      actions: { setFieldValue: jest.fn(), setErrors: jest.fn() },
      getFieldProps: (name) => ({ id: name, name, value: values[name]  }),
      dispatch: jest.fn(),
      handleSubmit: jest.fn()
      }
    const wrapper = ({ children }: any) => (
      <FormContext.Provider value={ctx}>
        <MemoryRouter>{children}</MemoryRouter>
      </FormContext.Provider>
    )
    const { getByLabelText, debug } = render(<BookDetails />, {
      wrapper,
    })
    debug()
    const titleInput = getByLabelText("Title:")
    fireEvent.blur(titleInput)
    expect(titleInput.nextSibling).toHaveTextContent("require")
  })
  it("should set book details to inputs", async () => {
    const values = { title: "book 1", authors: "authors 1" }
    const ctx = {
      state: { values, errors: {}, touched: {}, isSubmitting: false, formError: {} },
      actions: { setFieldValue: jest.fn(), setErrors: jest.fn() },
      getFieldProps: (name) => ({ id: name, name, value: values[name] }),
      dispatch: jest.fn(),
      handleSubmit: jest.fn()
      }
    const wrapper = ({ children }: any) => (
      <FormContext.Provider value={ctx}>
        <MemoryRouter>{children}</MemoryRouter>
      </FormContext.Provider>
    )
    const { getByDisplayValue, rerender } = render(<BookDetails />, {
      wrapper,
    })
    await act(async () => {
      await fetchData("book/1")
    })
    rerender(<BookDetails />)
    expect(getByDisplayValue("book 1")).not.toBeNull()
  })
})
