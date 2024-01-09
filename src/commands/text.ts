Cypress.Commands.add("text", (tag, options = {}) => {
  const { index = 0 } = options;
  cy.getTag(tag).eq(index).invoke("text");
});

Cypress.Commands.add("typeText", (tag, text, options = {}) => {
  const { blur = true, clear = true, index = 0 } = options;
  if (clear) cy.getTag(tag).eq(index).clear();
  cy.getTag(tag).eq(index).type(text);
  if (blur) cy.getTag(tag).eq(index).blur();
});
