describe('User opens the GoIT page', () => {
  beforeEach('go to page', () => {
    cy.visit('https://www.edu.goit.global/account/login');
  });

  it('succesfully login to the GoIT page', () => {
    cy.loginUser('user888@gmail.com', '1234567890');
    cy.get('.next-7afvtf').click();
    cy.contains('Log out').click();

  })

  it('succesfully login to the GoIT page with other data', () => {
    cy.loginUser('testowyqa@qa.team', 'QA!automation-1');
    cy.get('.next-7afvtf').click();
    cy.contains('Log out').click();
  })




})