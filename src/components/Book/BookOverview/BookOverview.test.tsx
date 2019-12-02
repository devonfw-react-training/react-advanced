import React from "react"
import { act } from "@testing-library/react-hooks"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { BookOverview } from "."
import { fetchData } from "../../../common/utils"

jest.mock("../../../common/utils", () => {
  return {
    fetchData: () =>
      Promise.resolve([{ id: 1, title: "book 1", authors: "authors" }]),
  }
})

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

  it("should render error message for emty title field", async () => {
    const wrapper = ({ children }: any) => (
      <MemoryRouter>{children}</MemoryRouter>
    )
    const { container, rerender } = render(<BookOverview />, {
      wrapper,
    })
    await act(async () => {
      await fetchData("books")
    })
    rerender(<BookOverview />)
    expect(container).toHaveTextContent("book 1")
  })
})
