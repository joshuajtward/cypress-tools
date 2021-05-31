////////////////////////////////////////////////////////////////////////////////////
// INTERACTING WITH ELEMENTS
////////////////////////////////////////////////////////////////////////////////////

// use the data-testid to get an element
const get_element = (dataTestId) => {
    cy.get(`[data-testid="${dataTestId}"]`)
}
Cypress.Commands.add('get_element', get_element)

// using get_element to click on an element
const click_element = (dataTestId) => {
    cy.get_element(dataTestId).click()
}
Cypress.Commands.add('click_element', click_element)

// using get_element to select a value from a dropdown list
const select_from_dropdown = (dataTestId, value) => {
    cy.get_element(dataTestId).select(value)
}
Cypress.Commands.add('select_from_dropdown', select_from_dropdown)

// using get_element to type into a field
const type_into_element = (dataTestId, text) => {
    cy.get_element(dataTestId).type(text)
}
Cypress.Commands.add('type_into_element', type_into_element)

////////////////////////////////////////////////////////////////////////////////////
// VARIOUS ASSERTIONS 
////////////////////////////////////////////////////////////////////////////////////


// assert that an element has certain attributes
// expects a 'tests' object with the desired key/value pairs to assert on
const test_attr = (dataTestId, tests) => {
    for (const [key, value] of Object.entries(tests)) {
        cy.get_element(dataTestId)
          .should('have.attr', key, value)
    }
}
Cypress.Commands.add('test_attr', test_attr)

// assert that an element contains the text provided
// pass false as the third argument to test this even if the element is not visible
const test_content = (dataTestId, text, visible=true) => {
    if (visible) {
        cy.get_element(dataTestId)
          .should('be.visible')
          .should('contain', text)
    } else {
        cy.get_element(dataTestId)
          .should('contain', text)
    }
}
Cypress.Commands.add('test_content', test_content)

// assert that an element has css properties
// expects a 'tests' object with the desired key/value pairs to assert on
const test_css = (dataTestId, tests) => {
    for (const [key, value] of Object.entries(tests)) {
        cy.get_element(dataTestId)
          .should('have.css', key, value)
    }
}
Cypress.Commands.add('test_css', test_css)

// custom command to test that a DOM element exists and contains a string and a link
const test_link = (dataTestId, content, href, new_tab=false) => {
    cy.test_content(dataTestId, content)
    cy.test_attr(dataTestId, { 'ref': href })
    if (new_tab) {
        cy.test_attr(dataTestId, { 'target': '_blank' })
    }
}
Cypress.Commands.add('test_link', test_link)
  
// assert that an element contains the text provided, with (some of) the right styling
// checks that the element has the right text, it is the right size and colour
const test_text = (dataTestId, text, fontsize='16px', color='rgb(0, 0, 0)') => {
    cy.test_content(dataTestId, text)
    cy.test_css(dataTestId, {
        'color': color,
        'font-size': fontsize
    })
}
Cypress.Commands.add('test_text', test_text)

// assert that the url is as expected
// (note: must be on same domain as config.baseURL)
const test_url = (url) => {
    cy.location('pathname').should('eq', url, { timeout: 15000 })
    if (params) {
        cy.location('search').should('eq', params)
    }
}
Cypress.Commands.add('test_url', test_url)

// assert that an element is visible (or not)
// pass false as the second argument to test that an element doesn not exist
const test_visibility = (dataTestId, visible=true) => {
    if (visible) {
        cy.get_element(dataTestId)
          .should('be.visible')
    } else {
        cy.get_element(dataTestId)
          .should('not.exist')
    }
}
Cypress.Commands.add('test_visibility', test_visibility)

////////////////////////////////////////////////////////////////////////////////////
// PAGE METADATA ASSERTIONS 
////////////////////////////////////////////////////////////////////////////////////

// assert that the page has the right meta title 
const test_page_title = (title) => {
    cy.title().should('eq', title)
}
Cypress.Commands.add('test_page_title', test_page_title)

// assert that the page has the right meta description 
const test_meta_description = (desc) => {
    cy.get('meta[name="description"]')
      .should('exist')
      .and('have.length', 1)
    cy.get('meta[name="description"]').then(meta_desc => {
        cy.wrap(meta_desc[0].content).should('eq', desc)
    })
}
Cypress.Commands.add('test_meta_description', test_meta_description)

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
    test_page_title
}