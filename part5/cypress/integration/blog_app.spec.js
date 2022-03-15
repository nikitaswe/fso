describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Nikita Kukshynsky',
      username: 'admin',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('button').contains('log in')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('button').contains('log in').click()
      cy.get('#loginUsername').type('admin')
      cy.get('#loginPassword').type('123456')
      cy.get('#loginSubmit').click()
      cy.contains('Loged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('button').contains('log in').click()
      cy.get('#loginUsername').type('hacker')
      cy.get('#loginPassword').type('123456')
      cy.get('#loginSubmit').click()
      cy.contains('Wrong credentials').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'admin', password: '123456' })
    })

    it('A blog can be created', function () {
      cy.createBlog({
        title: 'My first blog!',
        author: 'Nikita Kukshynsky',
        url: 'http://localhost:3000/'
      })

      cy.contains('My first blog!')
    })

    it('User can like a blog', function () {
      cy.createBlog({
        title: 'My first blog!',
        author: 'Nikita Kukshynsky',
        url: 'http://localhost:3000/'
      })

      cy.contains('view').click()
      cy.get('.numberOfLikes').as('likes')
      cy.get('@likes').contains('0')
      cy.get('.likeButton').click().click()
      cy.get('@likes').contains('2')
    })

    it('User can delete a blog', function () {
      cy.createBlog({
        title: 'My first blog!',
        author: 'Nikita Kukshynsky',
        url: 'http://localhost:3000/'
      })

      cy.contains('view').click()
      cy.contains('remove').click()
      cy.on('window:confirm', () => true)
      cy.contains('Blog has been deleted')
    })

    it.only('blogs are ordered according to likes with the blog with the most likes being first', function () {
      cy.createBlog({
        title: 'My first blog!',
        author: 'Nikita Kukshynsky',
        url: 'http://localhost:3000/'
      })
      cy.createBlog({
        title: 'My second blog!',
        author: 'Nikita Kukshynsky',
        url: 'http://localhost:3001/'
      })

      cy.get('.viewAndHide:first').click()
      cy.get('.viewAndHide:last').click()
      cy.get('.likeButton:first').as('firstLike')
      cy.get('.likeButton:last').as('secondLike')
      cy.get('@firstLike').click()
      cy.wait(1000)
      cy.get('@firstLike').click()
      cy.wait(1000)
      cy.get('@secondLike').click()
      cy.wait(1000)
      cy.get('@secondLike').click()
      cy.wait(1000)
      cy.get('@secondLike').click()
      cy.wait(1000)
      cy.get('@secondLike').click()
      cy.wait(1000)
      cy.reload()
      cy.get('strong:first').contains('My second blog!')
      cy.get('strong:last').contains('My first blog!')
    })
  })
})
