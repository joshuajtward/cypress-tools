describe("tests for the building-block assertion commands", () => {
  before(() => {
    cy.visit("cypress/index.html");
  });

  it("test_meta_description", () => {
    cy.test_meta_description(
      "A test file for verifying all the commands work as expected"
    );
  });

  it("test_page_title", () => {
    cy.test_page_title("cypress-tools test file");
  });
});
