class HomePage {
  get openMenuButton() {
    return cy.get('#open-navigation-menu-mobile');
  }

  get logoutButton() {
    return cy.contains('Log out');
  }

  logout() {
    this.openMenuButton.click();
    this.logoutButton.click();
  }
}

export default HomePage;
