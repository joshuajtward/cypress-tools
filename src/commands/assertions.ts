import type { Target } from "../types";

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
