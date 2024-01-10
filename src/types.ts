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
      assertAttr(target: Record<string, unknown>): Chainable<unknown>;
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
      assertCss(
        target: Record<string, unknown>,
        antiTarget?: Record<string, unknown>
      ): Chainable<JQuery<HTMLElement>>;
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
      assertVis(
        tag: string,
        visibility?:
          | "checked"
          | "disabled"
          | "enabled"
          | "exist"
          | "hidden"
          | "nonExistent"
          | "visible"
          | "unchecked",
        contains?: string
      ): Chainable<JQuery<HTMLElement>>;
      /**
       * Checks a checkbox with the given selector tag
       *
       * @param tag the string to build the selector with
       * @example cy.checkTag('example')
       * // sugar for cy.get('[data-testid="example"]').check()
       */
      checkTag(tag: string): void;
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
      ): void;
      /**
       * Gets the count of elements with the given selector tag
       *
       * @param tag the string to build the selector with
       * @example cy.count('example')
       * // sugar for cy.get('[data-testid="example"]').its('length')
       * @example cy.count('example', 3)
       * // sugar for cy.get('[data-testid="example"]').should('have.length', 3)
       * @example cy.count('example', 3, 'above')
       * // sugar for cy.get('[data-testid="example"]').should('have.length.above', 3)
       */
      count(
        tag: string,
        expected?: number | undefined,
        modifier?: "above" | "below"
      ): Chainable<number>;
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
      exists(tag: string, positive?: boolean): Chainable<JQuery<HTMLElement>>;
      /**
       * Gets an element with the given selector tag
       *
       * @param tag the string to build the selector with
       * @example cy.getTag('example')
       * // sugar for cy.get('[data-testid="example"]')
       */
      getTag(tag: string): Chainable<JQuery<HTMLElement>>;
      /**
       * Selects an option for an element with the given selector
       *
       * @param tag the string to build the selector with
       * @param value the option to select
       * @example cy.selectTag('example', 'option one')
       * // sugar for cy.get('[data-testid="example"]').select('option one')
       */
      selectTag(
        tag: string,
        value: string | number
      ): Chainable<JQuery<HTMLElement>>;
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
      text(tag: string, options?: { index?: number }): Chainable<string>;
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
        options?: {
          blur?: boolean;
          clear?: boolean;
          index?: number;
        }
      ): void;
    }
  }
}

export {};
