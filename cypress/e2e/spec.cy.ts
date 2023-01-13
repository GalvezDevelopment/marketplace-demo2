describe('BasketComponent', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show an empty basket message with a link to return back', () => {
    cy.get('a[data-cy=basket]').click();
    cy.get('[data-cy=empty-basket]')
      .should('be.visible')
      .and('contain.html', 'mat-icon')
      .and('contain.html', 'a')
      .and('have.css', 'flex');
    cy.get('a[data-cy=redirectHomePage]')
      .should('exist')
      .and('include.text', 'Go to the products page')
      .click();
    cy.url().should('not.include', 'basket')
  });

  it('should show the selected products in the basket', () => {
    cy.get('button[data-cy=add-product]:first').click();
    cy.get('button[data-cy=add-product]:last').click();
    cy.get('a[data-cy=basket]').click();
    cy.get('[data-cy=product-item]').should('have.length', 2);
  });

  it('should remove the product previously added', () => {
    cy.get('button[data-cy=add-product]:first').click();
    cy.get('a[data-cy=basket]').click();
    cy.get('button[data-cy=remove-product]').click();
    cy.get('[data-cy=product-item]').should('not.exist');
  });

  it('should not allow going to the checkout form when insufficient funds', () => {
    cy.get('button[data-cy=add-product]').first().click();
    cy.get('button[data-cy=add-product]').eq(2).click();
    cy.get('a[data-cy=basket]').click();
    cy.get('button[data-cy=pay]').should('exist').and('be.disabled');
  });
})
