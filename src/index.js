////////////////////////////////////////////////////////////////////////////////////
// INTERACTING WITH ELEMENTS
////////////////////////////////////////////////////////////////////////////////////

// use the data-testid to get an element
const get_element = (dataTestId, instance) => {
    if (instance) {
        // `instance - 1` is to offest zero-indexing
        cy.get(`[data-testid="${dataTestId}"]`).eq(instance - 1)
    } else {
        cy.get(`[data-testid="${dataTestId}"]`)
    }
}
Cypress.Commands.add('get_element', get_element)

// using get_element to click on an element
const click_element = (dataTestId, instance) => {
    switch (instance) {
        case 'all':
            cy.get_element(dataTestId).click({ multiple: true })
            break
        case undefined:
            cy.get_element(dataTestId).click()
            break
        default:
            cy.get_element(dataTestId, instance).click()
            break
    }
}
Cypress.Commands.add('click_element', click_element)

// using get_element to select a value from a dropdown list
const select_from_dropdown = (dataTestId, value) => {
    cy.get_element(dataTestId).select(value)
}
Cypress.Commands.add('select_from_dropdown', select_from_dropdown)

// using get_element to type into a field
const type_into_element = (dataTestId, text, instance) => {
    if (instance) {
        cy.get_element(dataTestId, instance).type(text)
    } else {
        cy.get_element(dataTestId).type(text)
    }
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
const test_content = (dataTestId, text, instance) => {
    if (instance) {
        cy.get_element(dataTestId, instance)
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
    cy.test_attr(dataTestId, { 'href': href })
    if (new_tab) {
        cy.test_attr(dataTestId, { 'target': '_blank' })
    }
}
Cypress.Commands.add('test_link', test_link)
  
// checks that the element has the right text, and optionally verify the CSS
const test_text = (dataTestId, text, style, instance) => {
    if (style === undefined) {
        style = {}
    }

    if (instance) {
        cy.test_content(dataTestId, text, instance)
        for (const [key, value] of Object.entries(style)) {
            cy.get_element(dataTestId, instance)
              .should('have.css', key, value)
        }
    } else {
        cy.test_content(dataTestId, text)
        for (const [key, value] of Object.entries(style)) {
            cy.get_element(dataTestId)
              .should('have.css', key, value)
        }
    }
}
Cypress.Commands.add('test_text', test_text)

// assert that the url is as expected
// (note: must be on same domain as config.baseURL)
const test_url = (url, params) => {
    cy.location('pathname').should('eq', url, { timeout: 15000 })
    if (params) {
        cy.location('search').should('eq', params)
    }
}
Cypress.Commands.add('test_url', test_url)

// assert that an element is visible, hidden, or not rendered
const test_visibility = (dataTestId, options) => {
    if (options === undefined) {
        cy.get_element(dataTestId)
          .scrollIntoView()
          .should('be.visible')
    } else { 
        // if nothing is passed for visibility option then default to true
        const visibility = (options.visible === undefined ? true : options.visible)
        // offset the zero-index
        const instance = options.instance - 1

        switch (visibility) {
            case 'hidden':
                cy.get(`[data-testid="${dataTestId}"]`).eq(instance).should('be.hidden')
                break
            case 'nonexistant':
                cy.get(`[data-testid="${dataTestId}"]`).should('not.exist')
                break
            default:
                cy.get(`[data-testid="${dataTestId}"]`).eq(instance).scrollIntoView().should('be.visible')
                break
        }
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