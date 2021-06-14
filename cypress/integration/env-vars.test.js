describe('test_text with env-vars', () => {
    Cypress.env('default_font_colour', 'rgb(0, 0, 255)')
    Cypress.env('default_font_size', '12px')
    Cypress.env('default_font_weight', '800')

    before(() => {
        cy.visit('cypress/index.html')
    })

    it('picks up the default from the env vars', () => {
        cy.test_text('test-paragraph', 'Blah blah blah', { color: 'rgb(0, 0, 0)', font_size: '16px', font_weight: '300' })
        cy.test_text('test-styled-paragraph', 'Blah blah blah')
    })
})