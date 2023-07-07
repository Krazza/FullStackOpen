describe('Blog app', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Kevin',
      username: 'kev',
      password: 'kappa123'
    }

    const anotherUser = {
      name: 'Joe',
      username: 'joe',
      password: 'kappa123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.request('POST', 'http://localhost:3003/api/users/', anotherUser) 
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

    describe("A blog exists", function () {
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

      it("creator of a blog can delete it", function () {
        cy.contains("Kevin is logged in");
        cy.contains("view").click();
        cy.contains("Added by: Kevin");
        cy.contains("remove").click();
        cy.get(".blogContainer")
          .should("not.contain", "Mistborn");
          cy.get(".notification")
        .should("contain", `Successfully removed a blog`)
        .and("have.css", "color", "rgb(0, 128, 0)")
      })

      it(`only the creator sees the "remove" button`, function () {
        cy.contains("Kevin is logged in");
        cy.contains("view").click();
        cy.contains("Added by: Kevin");
        cy.contains("remove");

        cy.contains("log out").click();;

        cy.contains("Log in");
        cy.get("#userName").type("joe");
        cy.get("#password").type("kappa123");
        cy.get("#loginButton").click();

        cy.get(".notification")
          .should("contain", "Welcome Joe!")
          .and("have.css", "color", "rgb(0, 128, 0)");
        
        cy.contains("view").click();

        cy.get(".Mistborn")
          .should("not.contain", "remove");
      })
    })
    describe("Multiple blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({ title: "Mistborn", author: "Brandon Sanderson", url: "http://FictionalSanderson.com", likes: "1" });
        cy.createBlog({ title: "The Dark Tower", author: "Stephen King", url: "http://FictionalKing.com", likes: "5" });
        cy.createBlog({ title: "The Martian", author: "Andy Weir", url: "http://FictionalWeir.com", likes: "6" });
      })
      it("blogs are ordered by likes", function () {
        cy.get(".blog").eq(0).should("contain", "The Martian");
        cy.get(".blog").eq(1).should("contain", "The Dark Tower");
        cy.get(".blog").eq(2).should("contain", "Mistborn");
      })
    })
  })
})