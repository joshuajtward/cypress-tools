Cypress.Commands.add("count", (tag, expected, modifier = undefined) => {
  if (expected !== undefined) return cy.getTag(tag).its("length");
  cy.getTag(tag).should(
    `have.length${modifier ? modifier + "." : ""}`,
    expected
  );
});

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
