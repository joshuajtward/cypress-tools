export type Element<K extends keyof HTMLElementTagNameMap> = Cypress.Chainable<
  JQuery<HTMLElementTagNameMap[K]>
>;
