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
    beforeEach(function() {
      cy.visit('http://localhost:3000')
    })

    it("user successfully logs in", function () {
      cy.contains("Log in");
      cy.get("#userName").type("kev");
      cy.get("#password").type("kappa123");
      cy.get("#loginButton").click();

      cy.get(".notification")
        .should("contain", "Welcome Kevin!")
        .and("have.css", "color", "rgb(0, 128, 0)");
    })

    it("login fails with wrong credentials", function () {
      cy.contains("Log in");
      cy.get("#userName").type("kev");
      cy.get("#password").type("123");
      cy.get("#loginButton").click();

      cy.get(".errorNotification")
        .should("contain", "Wrong credentials!")
        .and("have.css", "color", "rgb(255, 0, 0)");
    })
  })
})