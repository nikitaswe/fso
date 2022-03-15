import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    id: '123456789d',
    title: 'Component testing is done with react-testing-library',
    url: 'http://localhost:3000/',
    author: 'Nikita Kukshynsky',
    likes: 12
  }
  const likeHandler = jest.fn()
  const deleteHandler = jest.fn()
  let component
  beforeEach(() => {
    component = render(
      <Blog key={blog.id} blog={blog} likeBlog={likeHandler} deleteBlog={deleteHandler} />
    )
  })

  test('the component renders the blog title and author, but does not render its url or number of likes by default', () => {
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent('Nikita Kukshynsky')
    expect(component.container).not.toHaveTextContent('http://localhost:3000/')
  })

  test('blog url and number of likes are shown when the button controlling the shown details has been clicked', () => {
    expect(component.container).not.toHaveTextContent('http://localhost:3000/')
    expect(component.container).not.toHaveTextContent('12')

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('http://localhost:3000/')
    expect(component.container).toHaveTextContent('12')
  })

  test('if the like button is clicked twice, the event handler the component received as prop likeBlog is called twice', () => {
    let button = component.getByText('view')
    fireEvent.click(button)
    button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})
