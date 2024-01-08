describe("tests for the building-block assertion commands", () => {
  beforeEach(() => {
    cy.visit("cypress/index.html");
  });

  describe("test_attr", () => {
    it("tests the attributes of a given element", () => {
      cy.test_attr("test-div", {
        attribute: "test-attribute",
      });

      cy.test_attr("dropdown-div", {
        class: "a2j342mm",
        "data-form-name": "test-form",
      });
    });
  });

  describe("test_content", () => {
    it("tests the content of a given element", () => {
      cy.test_content("test-div", "Blah blah blah");
      cy.test_content("test-dropdown", "Cat");
      cy.test_content("test-button", "Click me!");
    });
  });

  describe("test_css", () => {
    it("tests the css of a given element", () => {
      cy.test_css("test-button", {
        "background-color": "rgb(0, 139, 139)",
        display: "inline-block",
        "font-family": "Arial",
        height: "21px",
      });
    });
  });

  describe("test_link", () => {
    it("tests that a link contains the right text and href", () => {
      cy.test_link(
        "test-link",
        "Test link",
        "https://www.npmjs.com/package/cypress-tools",
        false
      );
    });
  });

  describe("test_text", () => {
    it("tests the text content and styling of a given element", () => {
      // no styling
      cy.test_text("test-paragraph", "Blah blah blah");
      //just font colour
      cy.test_text("test-styled-paragraph", "Blah blah blah", {
        color: "rgb(0, 0, 255)",
      });
      // just font weight
      cy.test_text("test-heading", "Blah blah blah", { "font-weight": "300" });
      // multiple styling attributes
      cy.test_text("test-heading", "Blah blah blah", {
        color: "rgb(0, 0, 0)",
        "font-size": "32px",
        "font-weight": "300",
      });
    });

    it("tests the text content and styling of the nth element with that data-testid", () => {
      cy.test_text(
        "test-paragraph",
        "Second paragraph with duplicate data-testid",
        { color: "rgb(128, 0, 128)" },
        2
      );
    });
  });

  describe("test_url", () => {
    it("tests the url is correct", () => {
      cy.test_url("/cypress/index.html");
    });

    it("tests the url and query params are correct", () => {
      cy.visit("/cypress/index.html?utm=blah");
      cy.test_url("/cypress/index.html", "?utm=blah");
    });
  });

  describe("test_visibility", () => {
    it("tests the visibility of an element", () => {
      cy.test_visibility("dropdown-div");
    });

    it("tests the visibility of the nth element with that data-testid", () => {
      cy.test_visibility("test-paragraph", { instance: 1 }).should(
        "contain",
        "Blah blah blah"
      );
      cy.test_visibility("test-paragraph", { instance: 2 }).should(
        "contain",
        "Second paragraph with duplicate data-testid"
      );
    });

    it("tests that an element is hidden", () => {
      cy.test_visibility("hidden-paragraph", { visible: "hidden" });
      cy.test_visibility("test-paragraph", { instance: 3, visible: "hidden" });
    });

    it("tests that an element doesn't exist in the DOM", () => {
      cy.test_visibility("unrendered-div", { visible: "nonexistant" });
      cy.test_visibility("test-paragraph", {
        visible: "nonexistant",
        instance: 11,
      });
    });
  });
});
