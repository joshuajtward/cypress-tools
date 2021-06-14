describe('tests for the commands focused on interacting with elements', () => {
    beforeEach(() => {
        cy.visit('cypress/index.html')
    })

    it('click_element', () => {
        cy.test_content('test-button', 'Click me!')
        cy.click_element('test-button')
        cy.test_content('test-button', 'Clicked!')
    })
    
    it('get_element', () => {
        cy.get('[data-testid="test-div"]').then(cypress_get => {
            cy.get_element('test-div').then(get_element_command => {
                // A is the element fetched using cy.get
                let A = cypress_get[0].outerHTML
                // B is the element fetched using cy.get_element
                let B = get_element_command[0].outerHTML
                expect(A).to.equal(B)
            })
        })

        cy.get('[data-testid="test-paragraph"]').then(cypress_get => {
            cy.get_element('test-paragraph').then(get_element_command => {
                // A is the element fetched using cy.get
                let A = cypress_get[0].outerHTML
                // B is the element fetched using cy.get_element
                let B = get_element_command[0].outerHTML
                expect(A).to.equal(B)
            })
        })
    })

    it('select_from_dropdown', () => {
        const option = 'Hamster'
        cy.select_from_dropdown('test-dropdown', option)
        cy.get_element('test-dropdown').should('have.value', option)
    })

    it('type-into-element', () => {
        const input_string = 'Testing 123'
        cy.type_into_element('test-input', input_string)
        cy.get_element('test-input').should('have.value', input_string)
    })
})