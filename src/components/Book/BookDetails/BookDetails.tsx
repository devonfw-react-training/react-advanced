import React, {
  FunctionComponent,
  useEffect,
  useContext,
  FormEvent,
} from "react"
import { useHistory, useParams } from "react-router-dom"
import { fetchData } from "../../../common/utils"
import { Errors, FormContext } from "../../../common/hooks/form"
import { Field } from "../../../common/UI"
import { Book } from ".."

type Params = { id?: string | undefined }
const BookDetails: FunctionComponent<{}> = () => {
  const history = useHistory()
  const params: Params = useParams()
  const method = params.id ? "PUT" : "POST"
  const path = params.id ? `books/${params.id}` : "books"
  const {
    state: { errors, touched, formError },
    handleSubmit,
    dispatch,
    actions: { setFieldValue, setErrors },
  } = useContext(FormContext)

  useEffect(() => {
    params.id &&
      fetchData(`books/${params.id}`)
        .then(({ id, title, authors }: Book): void => {
          dispatch(setFieldValue({ id, title, authors }))
        })
        .catch((error: Errors): void => {
          dispatch(setErrors(error))
        })
  }, [params.id, dispatch, setFieldValue, setErrors])
  
  const submitWithRedirect = (e: FormEvent<HTMLFormElement>) => {
    handleSubmit(path, method)(e)
    history.goBack()
  }
  return (
    <form onSubmit={submitWithRedirect}>
      <div>{formError.message}</div>
      <div>
        <label htmlFor="authors">Authors:</label>
        <Field fieldName="authors" type="text" />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <Field fieldName="title" type="text" required />
        {touched.title && <div>{errors.title}</div>}
      </div>
      <div>
        <button type="button" onClick={history.goBack}>
          Back
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  )
}
export default BookDetails
