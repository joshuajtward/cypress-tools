let selector = "";
Cypress.env("customSelector")
  ? (selector = Cypress.env("customSelector"))
  : (selector = "data-testid");

////////////////////////////////////////////////////////////////////////////////////
// INTERACTING WITH ELEMENTS
////////////////////////////////////////////////////////////////////////////////////

// use the chosen selector to get an element
const get_element = (selectorValue, instance) => {
  if (instance) {
    // `instance - 1` is to offest zero-indexing
    cy.get(`[${selector}="${selectorValue}"]`).eq(instance - 1);
  } else {
    cy.get(`[${selector}="${selectorValue}"]`);
  }
};
Cypress.Commands.add("get_element", get_element);

// using get_element to click on an element
const click_element = (selectorValue, instance) => {
  switch (instance) {
    case "all":
      cy.get_element(selectorValue).click({ multiple: true });
      break;
    case undefined:
      cy.get_element(selectorValue).click();
      break;
    default:
      cy.get_element(selectorValue, instance).click();
      break;
  }
};
Cypress.Commands.add("click_element", click_element);

// using get_element to select a value from a dropdown list
const select_from_dropdown = (selectorValue, value) => {
  cy.get_element(selectorValue).select(value);
};
Cypress.Commands.add("select_from_dropdown", select_from_dropdown);

// using get_element to type into a field
const type_into_element = (selectorValue, text, instance) => {
  if (instance) {
    cy.get_element(selectorValue, instance).type(text);
  } else {
    cy.get_element(selectorValue).type(text);
  }
};
Cypress.Commands.add("type_into_element", type_into_element);

////////////////////////////////////////////////////////////////////////////////////
// VARIOUS ASSERTIONS
////////////////////////////////////////////////////////////////////////////////////

// assert that an element has certain attributes
// expects a 'tests' object with the desired key/value pairs to assert on
const test_attr = (selectorValue, tests) => {
  for (const [key, value] of Object.entries(tests)) {
    cy.get_element(selectorValue).should("have.attr", key, value);
  }
};
Cypress.Commands.add("test_attr", test_attr);

// assert that an element contains the text provided
const test_content = (selectorValue, text, instance) => {
  if (instance) {
    cy.get_element(selectorValue, instance)
      .should("be.visible")
      .should("contain", text);
  } else {
    cy.get_element(selectorValue).should("contain", text);
  }
};
Cypress.Commands.add("test_content", test_content);

// assert that an element has css properties
// expects a 'tests' object with the desired key/value pairs to assert on
const test_css = (selectorValue, tests) => {
  for (const [key, value] of Object.entries(tests)) {
    cy.get_element(selectorValue).should("have.css", key, value);
  }
};
Cypress.Commands.add("test_css", test_css);

// custom command to test that a DOM element exists and contains a string and a link
const test_link = (selectorValue, content, href, new_tab = false) => {
  cy.test_content(selectorValue, content);
  cy.test_attr(selectorValue, { href: href });
  if (new_tab) {
    cy.test_attr(selectorValue, { target: "_blank" });
  }
};
Cypress.Commands.add("test_link", test_link);

// checks that the element has the right text, and optionally verify the CSS
const test_text = (selectorValue, text, style, instance) => {
  if (style === undefined) {
    style = {};
  }

  if (instance) {
    cy.test_content(selectorValue, text, instance);
    for (const [key, value] of Object.entries(style)) {
      cy.get_element(selectorValue, instance).should("have.css", key, value);
    }
  } else {
    cy.test_content(selectorValue, text);
    for (const [key, value] of Object.entries(style)) {
      cy.get_element(selectorValue).should("have.css", key, value);
    }
  }
};
Cypress.Commands.add("test_text", test_text);

// assert that the url is as expected
// (note: must be on same domain as config.baseURL)
const test_url = (url, params) => {
  cy.location("pathname").should("eq", url, { timeout: 15000 });
  if (params) {
    cy.location("search").should("eq", params);
  }
};
Cypress.Commands.add("test_url", test_url);

// assert that an element is visible, hidden, or not rendered
const test_visibility = (selectorValue, options) => {
  if (options === undefined) {
    cy.get_element(selectorValue).scrollIntoView().should("be.visible");
  } else {
    // if nothing is passed for visibility option then default to true
    const visibility = options.visible === undefined ? true : options.visible;

    let instance = 1;
    if (options.instance) {
      // offset the zero-index
      instance = options.instance;
    }

    switch (visibility) {
      case "hidden":
        cy.get_element(selectorValue, instance).should("be.hidden");
        break;
      case "nonexistant":
        if (instance === 1) {
          cy.get_element(selectorValue).should("not.exist");
        } else {
          cy.get_element(selectorValue, instance).should("not.exist");
        }
        break;
      case false:
        cy.get_element(selectorValue, instance).should("not.be.visible");
        break;
      default:
        cy.get_element(selectorValue, instance)
          .scrollIntoView()
          .should("be.visible");
        break;
    }
  }
};
Cypress.Commands.add("test_visibility", test_visibility);

////////////////////////////////////////////////////////////////////////////////////
// PAGE METADATA ASSERTIONS
////////////////////////////////////////////////////////////////////////////////////

// assert that the page has the right meta title
const test_page_title = (title) => {
  cy.title().should("eq", title);
};
Cypress.Commands.add("test_page_title", test_page_title);

// assert that the page has the right meta description
const test_meta_description = (desc) => {
  cy.get('meta[name="description"]').should("exist").and("have.length", 1);
  cy.get('meta[name="description"]').then((meta_desc) => {
    cy.wrap(meta_desc[0].content).should("eq", desc);
  });
};
Cypress.Commands.add("test_meta_description", test_meta_description);

module.exports = {
  // interacting with elements
  get_element,
  click_element,
  select_from_dropdown,
  type_into_element,
  // various assertions
  test_attr,
  test_content,
  test_css,
  test_link,
  test_text,
  test_url,
  test_visibility,
  // page metadata assertions
  test_meta_description,
  test_page_title,
};
