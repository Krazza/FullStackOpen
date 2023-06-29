describe('Blog app', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Kevin',
      username: 'kev',
      password: 'kappa123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
  })
  
  it('login form is displayed by default', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in')
  })

  describe("Login", async () => {
    
  })
})