import React, { FunctionComponent } from "react"
import { Logo } from "."

interface Props {}

const Header: FunctionComponent<Props> = props => {
  return (
    <header className="App-header">
      <Logo color="tomato" height="40vmin" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  )
}
export default Header
