describe('tests for the building-block assertion commands', () => {
    beforeEach(() => {
        cy.visit('cypress/index.html?utm=blah')
    })
    
    it('test_attr', () => {
        cy.test_attr('test-div', {
            'attribute': 'test-attribute'
        })

        cy.test_attr('dropdown-div', {
            'class': 'a2j342mm',
            'data-form-name': 'test-form'
        })
    })

    it('test_content', () => {
        cy.test_content('test-div', 'Blah blah blah')
        cy.test_content('test-button', 'Click me!')
    })
    
    it('test_css', () => {
        cy.test_css('test-button', { 
            'background-color': 'rgb(0, 139, 139)',
            'display': 'inline-block',
            'font-family': 'Arial',
            'height': '21px'
        })
    })

    it('test_link', () => {
        cy.test_link('test-link', 'Test link', 'https://www.npmjs.com/package/cypress-tools', false)
    })
    
    it('test_text', () => {
        cy.test_text('test-heading', 'Blah blah blah', { 'color': 'rgb(0, 0, 0)', 'font-size': '32px', 'font-weight': '300' })
        cy.test_text('test-paragraph', 'Blah blah blah')
        cy.test_text('test-styled-paragraph', 'Blah blah blah', { 'color': 'rgb(0, 0, 255)' })
    })

    it('test_url', () => {
        cy.test_url('/cypress/index.html', '?utm=blah')
    })

    it('test_visibility', () => {
        cy.test_visibility('dropdown-div')
        cy.test_visibility('unrendered-div', false)
    })
})