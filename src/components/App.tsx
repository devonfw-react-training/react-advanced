import React, { FunctionComponent } from "react"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import "./App.css"
import { BookOverView, BookDetails } from "./Book"

const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
    <Switch>
    <Redirect exact from="/" to="/overview" />
      <Route path="/overview" component={BookOverView} />
      <Route path="/details/:id" component={BookDetails} />
    </Switch>
    </BrowserRouter>
  )
}

export default App
