import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchData } from "../../../common/utils"
import {
  SetFieldValue,
  SetErrors,
  Errors,
  Action,
} from "../../../common/hooks/useForm"
import { FormValues } from "./initialState"

import { Book } from ".."

type Params = { id?: string | undefined }
type BookActionCreators = {
  setFieldValue: (payload: FormValues) => SetFieldValue
  setErrors: (payload: Errors) => SetErrors
}
type Dispatch = (action: Action) => void

export const useBooks = (dispatch: Dispatch, actions: BookActionCreators) => {
  const params: Params = useParams()
  const { setFieldValue, setErrors } = actions

  useEffect(() => {
    fetchData(`books/${params.id}`)
      .then(({ title, authors }: Book): void => {
        dispatch(setFieldValue({ title, authors }))
      })
      .catch((error: Errors): void => {
        dispatch(setErrors(error))
      })
  }, [params.id, dispatch, setFieldValue, setErrors])
}
