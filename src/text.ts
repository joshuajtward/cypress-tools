import { TypeTextOptions } from "./text.types";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Returns the value of the text in an element
       *
       * @param tag the string to build the selector with
       * @param options.index the index of the element to select
       *
       * @example cy.text('example')
       * // sugar for `cy.get('[data-testid="example"]').eq(0).invoke('text')
       * @example cy.text('example', { index: 2 })
       * // sugar for `cy.get('[data-testid="example"]').eq(2).invoke('text')
       */
      text(tag: string, options: { index: number }): Chainable<string>;
      /**
       * Types into an element, beforehand clearing it, and triggering blur afterwards
       * @param tag the string to build the selector with
       * @param text the text to type
       * @param options.blur whether to blur afterwards
       * @param options.clear whether to clear beforehand
       * @param options.index the index of the element to select
       *
       * @example cy.typeText('input', 'Hello World')
       * @example cy.typeText('input', 'Hello World', { clear: false })
       */
      typeText(
        tag: string,
        text: string,
        options: TypeTextOptions
      ): Chainable<void>;
    }
  }
}

Cypress.Commands.add("text", (tag, options) => {
  const { index = 0 } = options;
  cy.getTag(tag).eq(index).invoke("text");
});

Cypress.Commands.add("typeText", (tag, text, options) => {
  const { blur = true, clear = true, index = 0 } = options;
  if (clear) cy.getTag(tag).eq(index).clear();
  cy.getTag(tag).eq(index).type(text);
  if (blur) cy.getTag(tag).eq(index).blur();
});
