[![NPM](https://nodei.co/npm/cypress-tools.png?compact=true)](https://nodei.co/npm/cypress-tools/)

![CI](https://github.com/joshuajtward/cypress-tools/actions/workflows/ci.yml/badge.svg)

# cypress-tools

This is a repo containg some simple Cypress commands, intended for use as simplifying building blocks for more complicated/realistic testing scenarios. The aim is that using these commands makes writing, reading and debugging tests much easier.

Please note, this repo is in no way affliated or approved by Cypress, it is purely to help me use Cypress for the various testing projects I am involved with. Cypress is an awesome testing framework for modern web applications, if you haven't then you should definietly check them out: https://www.cypress.io/

## Getting started

Add this module to your project using `npm install cypress-tools --save-dev` and then import this module in your Cypress support file (usually found at `./cypress/support/index.js`). Alternatively, you can import it in each test file where it's needed if that better suits your usage.

Most of the commands use the default selector `data-testid` to find and assert on elements. This means that as long as you are using the `data-testid` tag on the elements you are testing, you only need to pass the value of the tag, instead of `'[data-testid="some-data-testid"]'`. To choose a different value, add the `defaultSelector` field to your Cypress env configuration:

```typescript
// cypress.config.ts
{
  e2e: {
    env: {
      defaultSelector: 'data-cy'
    }
  },
  ...
}
```

Or in a specific test file:

```typescript
// example.cy.ts
Cypress.env('defaultSelector', 'data-cy')

describe('tests' () => {
  ...
})
```

## Commands available

More info about these commands and their usage is available via their type definitions

| Command Name | Description                         |
| ------------ | ----------------------------------- |
| `assertAttr` | Assert the attributes of an element |
| `assertCss`  | Assert the CSS of an element        |
| `assertVis`  | Assert the visibility of an element |
| `checkTag`   | Check a checkbox                    |
| `clickTag`   | Click an element                    |
| `count`      | Get the count of an element by tag  |
| `exists`     | Check an element exists             |
| `getTag`     | Get an element                      |
| `selectTag`  | Select from a dropdown              |
| `text`       | Get the text from an element        |
| `typeText`   | Type into an element                |
