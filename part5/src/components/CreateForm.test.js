import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateForm from './CreateForm'

describe('<CreateForm />', () => {
  test('<CreateForm /> updates parent state and calls onSubmit', () => {
    const handleCreateForm = jest.fn()

    const component = render(<CreateForm handleCreateForm={handleCreateForm} />)

    const title = component.container.querySelector('#formTitle')
    const author = component.container.querySelector('#formAuthor')
    const url = component.container.querySelector('#formUrl')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'Here we go again' }
    })
    fireEvent.change(author, {
      target: { value: 'Nikita Kukshynsky' }
    })
    fireEvent.change(url, {
      target: { value: 'http://localhost:3000/' }
    })
    fireEvent.submit(form)
    expect(handleCreateForm.mock.calls).toHaveLength(1)
    expect(handleCreateForm).toHaveBeenCalledWith({
      title: 'Here we go again',
      author: 'Nikita Kukshynsky',
      url: 'http://localhost:3000/'
    })
  })
})
