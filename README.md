[![NPM](https://nodei.co/npm/cypress-tools.png?compact=true)](https://nodei.co/npm/cypress-tools/)

![tests](https://github.com/joshuajtward/cypress-tools/actions/workflows/tests.yml/badge.svg)

# cypress-tools

This is a repo containg some simple Cypress commands, intended for use as simplifying building blocks for more complicated/realistic testing scenarios. The aim is that using these commands makes writing, reading and debugging tests much easier. 

Please note, this repo is in no way affliated or approved by Cypress, it is purely to help me use Cypress for the various testing projects I am involved with. Cypress is an awesome testing framework for modern web applications, if you haven't then you should definietly check them out: https://www.cypress.io/

## Getting started

Add this module to your project using `npm install cypress-tools --save-dev` and then import this module in your Cypress support file (usually found at `./cypress/support/index.js`). Alternatively, you can import it in each test file where it's needed if that better suits your usage. 

Most of the commands (currently at least) use `data-testid` as the selector to find and assert on elements. This means that as long as you are using the `data-testid` tag on all of the elements you are testing, you only need to pass the value, instead of `'[data-testid="some-data-testid"]'`. 

## Interacting with elements

### `get_element` 
This is the most simple command in this repo, but most other commands re-use it

Usage:
`cy.get_element('some-data-testid')`

### `click_element`
As you might expect, this uses `get_element` to click on an element 

Usage:
`cy.click_element('some-data-testid')`

### `select_from_dropdown`
This selects options from valid elements, for example a dropdown list

Usage:
`cy.select_from_dropdown('some-data-testid', 'the desired option')`

### `type_into_element`
This uses `get_element` to select an element and then type into it

Usage:
`cy.type_into_element('some-data-testid', 'any text you want')`

## Various assertions

### `test_attr`
This command uses `get_element` to assert the attributes of an element

Usage:
`cy.test_attr('some-data-testid', { 
    'attribute_1': value_1,
    'attribute_2': value_2,
 })`

### `test_content`
Asserts that an element contains the text specified 

Usage:
`cy.test_content('some-data-testid', 'any text you want')`

### `test_css`
This command uses `get_element` to assert the css proprties of an element

Usage:
`cy.test_css('some-data-testid', { 
    'attribute_1': value_1,
    'attribute_2': value_2,
})`

### `test_link`
This command checks that a link has the right text, url, and if specified, whether it opens in a new tab

Usage:

Normally:
`cy.test_link('some-data-testid', 'some url text', 'some-url.com')`

Link should open in a new tab:
`cy.test_link('some-data-testid', 'some url text', 'some-url.com', true)`
    
### `test_text`
This command checks the content, and CSS of the text in an element

Usage:
`cy.test_text('some-data-testid', 'some text', { 'color': 'rgb(0, 0, 0)', 'font-size': '16px' })`

You can use any valid CSS element in the styles object
    
### `test_url`
This command checks the url is as expected. It accepts an optional argument to test query params

Usage:

No query params:
`cy.test_url('some-url.com')`

Query params:
`cy.test_url('some-url.com', '?utm=take-all-my-data')`

### `test_visibility`
This command check whether the element is either visible on the page, or doesn't exist in the DOM

Usage:

Visible:
`cy.test_visibility('some-data-testid')`

Not:
`cy.test_visibility('some-data-testid', false)`

## Page metadata assertions

### `test_meta_description`
This command verifies that the page's meta description is correct

Usage:
`cy.test_meta_description('this is a great website')`

### `test_page_title`
This command verifies that the page's meta title is correct

Usage:
`cy.test_page_title('The greatest website of them all')`


## More examples

More examples of these commands and their usage can be found in the test suite for this package, under the `cypress/intergration` directory
