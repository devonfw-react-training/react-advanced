import React from 'react'
import ReactDOM from 'react-dom'
import {App, Routes} from './App'
import {MemoryRouter} from 'react-router'
import {render, fireEvent, cleanup} from '@testing-library/react'

afterEach(cleanup)

describe('App', () => {
  it('renders without crashing', () => {
    // given
    const div = document.createElement('div')
    // when
    ReactDOM.render(<App />, div)
    // then no errors thrown
    ReactDOM.unmountComponentAtNode(div)
  })

  it('initial Path should redirect to Book Details Overview', () => {
    const {container} = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    )

    expect(container.querySelector('.table')).not.toBeNull()
    expect(container.querySelector('form')).toBeNull()
  })

  it('should navigate to new Book page after clicking NEW BOOK link', () => {
    const {container, getByText} = render(
      <MemoryRouter initialEntries={['/book-app/books']}>
        <Routes />
      </MemoryRouter>,
    )

    expect(container.querySelector('form')).toBeNull()

    const newBookLink = getByText('New Book')
    fireEvent.click(newBookLink, {button: 0})

    expect(container.querySelector('form')).not.toBeNull()
  })
})
