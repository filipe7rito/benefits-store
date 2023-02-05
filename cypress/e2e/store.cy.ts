import { should } from 'chai';
import { generateUsername } from '../support/utils';

describe('Store', () => {
  const username = generateUsername();

  beforeEach(() => {
    cy.visit('/');

    cy.get('#username-input').type(username);

    cy.findByRole('button', {
      name: /continue/i,
    }).click();
  });

  it('It should see products available', () => {
    cy.contains(/products/i).should('be.visible');

    cy.findAllByTestId('product-item').should('have.length', 6);

    cy.findByText(/netflix/i).should('be.visible');
  });

  it('It should be able to add products to cart ', () => {
    cy.contains(/products/i).should('be.visible');

    cy.findByText(/netflix/i).should('be.visible');

    cy.findByText(/netflix/i)
      .parent()
      .parent()
      .findByRole('button', {
        name: /add to cart/i,
      })
      .click();

    cy.findByText(/netflix/i)
      .parent()
      .parent()
      .findByText(/remove from cart/i)
      .should('be.visible');

    cy.findByText(/spotify/i)
      .parent()
      .parent()
      .findByRole('button', {
        name: /add to cart/i,
      })
      .click();

    cy.findByTestId('cart-button').click();
  });

  it('It should be able to remove products from cart ', () => {
    cy.contains(/products/i).should('be.visible');

    cy.findByText(/netflix/i).should('be.visible');

    cy.findByText(/netflix/i)
      .parent()
      .parent()
      .findByRole('button', {
        name: /add to cart/i,
      })
      .click();

    cy.findByText(/netflix/i)
      .parent()
      .parent()
      .findByText(/remove from cart/i)
      .should('be.visible');

    cy.findByText(/spotify/i)
      .parent()
      .parent()
      .findByRole('button', {
        name: /add to cart/i,
      })
      .click();

    cy.findByTestId('cart-button').click();

    cy.findAllByTestId('remove-from-cart').eq(0).click();
  });

  it.only('It should be able to checkout ', () => {
    cy.contains(/products/i).should('be.visible');

    cy.findByText(/netflix/i).should('be.visible');

    cy.findByText(/netflix/i)
      .parent()
      .parent()
      .findByRole('button', {
        name: /add to cart/i,
      })
      .click();

    cy.findByText(/netflix/i)
      .parent()
      .parent()
      .findByText(/remove from cart/i)
      .should('be.visible');

    cy.findByText(/spotify/i)
      .parent()
      .parent()
      .findByRole('button', {
        name: /add to cart/i,
      })
      .click();

    cy.findByTestId('cart-button').click();

    cy.findByRole('button', {
      name: /checkout/i,
    }).click();

    cy.findByText(/my orders/i).click();

    cy.contains(/netflix/i).should('be.visible');
    cy.contains(/spotify/i).should('be.visible');
  });
});
