import type { Target, Visibility } from "./assertion.types";
import type { Element } from "./elements.types";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Asserts against the attributes of an element
       *
       * @param target a map of key-value pairs to assert against
       * @param anitTarget a map of key-value pairs to assert the inverse
       * @example cy.get('selector').assertAttr({ 'aria-disabled': 'false', 'data-value': 50 })
       * // sugar for
       * //  cy.get('selector')
       * //    .should('have.attr', 'aria-disabled', 'false' })
       * //    .and('have.attr', 'data-value', 50)
       * @example cy.get('selector').assertAttr({ 'aria-disabled': 'false' }, { 'data-value': 50 })
       * // sugar for
       * //  cy.get('selector')
       * //    .should('have.attr', 'aria-disabled', 'false' })
       * //    .and('not.have.attr', 'data-value', 50)
       * @example cy.get('selector').assertAttr({}, { 'aria-disabled': 'false', 'data-value': 50 })
       * // sugar for
       * //  cy.get('selector')
       * //    .should('not.have.attr', 'aria-disabled', 'false' })
       * //    .and('not.have.attr', 'data-value', 50)
       */
      assertAttr<K extends keyof HTMLElementTagNameMap>(
        target: Target
      ): Element<K>;
      /**
       * Asserts against the css of an element
       *
       * @param target a map of key-value pairs to assert against
       * @param antiTarget a map of key-value pairs to assert the inverse
       * @example cy.get('selector').assertCss({ display: 'block', 'font-size': '10px' })
       * // sugar for
       * //  cy.get('selector')
       * //    .should('have.css', 'display', 'block' })
       * //    .and('have.css', 'font-size', '10px')
       * @example cy.get('selector').assertCss({ display: 'block' }, { 'font-size': '10px' })
       * // sugar for
       * //  cy.get('selector')
       * //    .should('have.css', 'display', 'block' })
       * //    .and('not.have.css', 'font-size', '10px')
       * @example cy.get('selector').assertCss({}, { display: 'block', 'font-size': '10px' })
       * // sugar for
       * //  cy.get('selector')
       * //    .should('not.have.css', 'display', 'block' })
       * //    .and('not.have.css', 'font-size', '10px')
       */
      assertCss<K extends keyof HTMLElementTagNameMap>(
        target: Target,
        antiTarget?: Target
      ): Element<K>;
      /**
       * Asserts on the visibility of an element for a given tag
       *
       * @param tag the string to build the selector with
       * @param visibility the expected visibility of the element
       * @param contains whether to filter the elements using `cy.contains()`
       *  * @example cy.assertVis('selector')
       * // sugar for cy.get('[data-test="selector"]').should('be.visible')
       * @example cy.assertVis('selector', 'checked')
       * // sugar for cy.get('[data-test="selector"]').should('be.checked')
       * @example cy.assertVis('selector', 'disabled', 'Unavailable')
       * // sugar for cy.get('[data-test="selector"]').contains('Unavailable').should('be.disabled')
       */
      assertVis<K extends keyof HTMLElementTagNameMap>(
        tag: string,
        visibility?: Visibility,
        contains?: string
      ): Element<K>;
      /**
       * Asserts that an element exists or not in the DOM for a given tag
       *
       * @param tag the string to build the selector with
       * @param positive whether the assertion should be positive or negative
       *
       * @example cy.exists('example')
       * // sugar for cy.get('[data-test="example"]').should('exist')
       * @example cy.exists('example', false)
       * // sugar for cy.get('[data-test="example"]').should('not.exist')
       */
      exists<K extends keyof HTMLElementTagNameMap>(
        tag: string,
        positive?: boolean
      ): Element<K>;
    }
  }
}

const matcher = (
  assertion: string,
  subject: JQuery<HTMLElement>,
  target: Target
) => {
  Object.entries(target).forEach(([k, v]) => {
    cy.wrap(subject).should(assertion, k, v);
  });
};

Cypress.Commands.add(
  "assertAttr",
  { prevSubject: "element" },
  (subject, target, antiTarget = {}) => {
    matcher("have.attr", subject, target);
    matcher("not.have.attr", subject, antiTarget);
  }
);

Cypress.Commands.add(
  "assertCss",
  { prevSubject: "element" },
  (subject, target, antiTarget = {}) => {
    matcher("have.css", subject, target);
    matcher("not.have.css", subject, antiTarget);
  }
);

Cypress.Commands.add(
  "assertVis",
  (tag, visibility = "visible", contains = "") => {
    let assertion = `be.${visibility}`;
    if (visibility === "exist") assertion = visibility;
    if (visibility === "nonExistent") assertion = "not.be.visible";
    if (visibility === "unchecked") assertion = "not.be.checked";
    cy.getTag(tag)
      .then((el) => (!!contains ? cy.wrap(el).contains(contains) : el))
      .should(assertion);
  }
);

Cypress.Commands.add("exists", (tag, positive = true) =>
  cy.getTag(tag).should(`${positive ? "" : "not."}exist`)
);
