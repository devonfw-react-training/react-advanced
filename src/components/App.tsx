import React, { FunctionComponent } from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import "./App.css"
import {
  BookOverView,
  BookDetails,
  initialState,
  validate,
  onSubmit,
} from "./Book"
import { Form } from "../common/hooks/form"

const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/overview" />
        <Route path="/overview">
          <BookOverView />
        </Route>
        <Route path="/details/:id?">
          <Form {...{ initialState, validate, onSubmit }}>
            <BookDetails />
          </Form>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
