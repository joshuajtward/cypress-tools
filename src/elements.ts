import type { Element } from "./elements.types";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Checks a checkbox with the given selector tag
       *
       * @param tag the string to build the selector with
       * @example cy.checkTag('example')
       * // sugar for cy.get('[data-testid="example"]').check()
       */
      checkTag(tag: string): Chainable<void>;
      /**
       * Clicks a checkbox with the given selector tag
       *
       * @param tag the string to build the selector with
       * @param options.index the index of the element to select
       * @example cy.clickTag('example')
       * // sugar for cy.get('[data-testid="example"]').click()
       * @example cy.clickTag('example', { index: 4 })
       * // sugar for cy.get('[data-testid="example"]').eq(4).click()
       */
      clickTag(
        tag: string,
        options?: {
          index?: number;
        }
      ): Chainable<void>;
      /**
       * Gets an element with the given selector tag
       *
       * @param tag the string to build the selector with
       * @example cy.getTag('example')
       * // sugar for cy.get('[data-testid="example"]')
       */
      getTag<K extends keyof HTMLElementTagNameMap>(tag: string): Element<K>;
      /**
       * Selects an option for an element with the given selector
       *
       * @param tag the string to build the selector with
       * @param value the option to select
       * @example cy.selectTag('example', 'option one')
       * // sugar for cy.get('[data-testid="example"]').select('option one')
       */
      selectTag<K extends keyof HTMLElementTagNameMap>(
        tag: string,
        value: string | number
      ): Element<K>;
    }
  }
}

Cypress.Commands.add("clickTag", (tag, options = {}) => {
  const { index = 0 } = options;
  cy.getTag(tag).eq(index).click();
});

Cypress.Commands.addQuery(
  "getTag",
  (tag: string) => () =>
    cy.$$(`[${Cypress.env("defaultSelector") || "data-testid"}="${tag}"]`)
);

Cypress.Commands.add("selectTag", (tag, value) => {
  cy.getTag(tag).select(value);
});
