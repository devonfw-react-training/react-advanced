import React, { FunctionComponent } from "react"
import { Book } from ".."

interface Props {
  selectedBook: Book
}

const BookDetails: FunctionComponent<Props> = ({ selectedBook }) => {
  return <div>Selected Book: {selectedBook.title}</div>
}
export default BookDetails
