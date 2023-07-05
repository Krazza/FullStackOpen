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

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({username: "kev", password: "kappa123"})
    })

    it("user can add a new blog", function () {
      cy.contains("new blog").click();

      cy.get(".newBlogTitle").type("Mistborn");
      cy.get(".newBlogAuthor").type("Brandon Sanderson");
      cy.get(".newBlogUrl").type("http://FictionalSanderson.com");
      cy.get(".newBlogLikes").type("5000");

      cy.contains("add").click();

      cy.get(".notification")
        .should("contain", "A new blog created by Brandon Sanderson!")
        .and("have.css", "color", "rgb(0, 128, 0)")
      cy.contains("Mistborn");
    })

    describe("A note exists", function () {
      beforeEach(function () {
        cy.createBlog({ title: "Mistborn", author: "Brandon Sanderson", url: "http://FictionalSanderson.com", likes: "5000" });
      })

      it("user can like a blog", function () {
        cy.contains("view").click();
        cy.get(".blogLikeButton").click();
        cy.get(".notification")
        .should("contain", `Successfully updated blog "Mistborn"!`)
        .and("have.css", "color", "rgb(0, 128, 0)")
      })
    })
  })
})