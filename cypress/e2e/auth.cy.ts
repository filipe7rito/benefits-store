import { generateUsername } from '../support/utils';

describe('Auth', () => {
  const username = generateUsername();
  beforeEach(() => {
    cy.visit('/');
  });

  it('should see the login page', () => {
    cy.contains(/username/i).should('be.visible');
  });

  it('should be able to login', () => {
    cy.get('#username-input').type(username);

    cy.findByRole('button', {
      name: /continue/i,
    }).click();

    cy.contains(/products/i).should('be.visible');
    cy.contains(/my orders/i).should('be.visible');
  });

  it('should be able to logout', () => {
    cy.get('#username-input').type(username);

    cy.findByRole('button', {
      name: /continue/i,
    }).click();

    cy.contains(/products/i).should('be.visible');
    cy.contains(/my orders/i).should('be.visible');

    cy.findByRole('button', {
      name: /logout/i,
    }).click();

    cy.contains(/products/i).should('not.exist');
    cy.contains(/my orders/i).should('not.exist');
  });
});
