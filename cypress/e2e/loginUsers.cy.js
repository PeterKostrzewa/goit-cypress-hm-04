describe("User opens the GoIT page", () => {
  beforeEach("go to page", () => {
    cy.visit("https://www.edu.goit.global/account/login");
  });

  it("succesfully login user1 to the GoIT page", () => {
    cy.fixture("user1.json").then((user) => {
      const useremail = user.email;
      const password = user.password;

      cy.loginUser(useremail, password);
      cy.url().should('include', "homepage");
    });
  });

  it("succesfully login user2 to the GoIT page", () => {
    cy.fixture("user2.json").then((user) => {
      const useremail = user.email;
      const password = user.password;

      cy.loginUser(useremail, password);
      cy.url().should('include', "homepage");
    });
  });
});
