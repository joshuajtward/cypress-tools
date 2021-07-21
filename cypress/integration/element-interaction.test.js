describe('tests for the commands focused on interacting with elements', () => {
    beforeEach(() => {
        cy.visit('cypress/index.html')
    })

    describe('click_element', () => {
        it('clicks on an element by data-testid', () => {
            // initial state
            cy.test_content('test-button', 'Click me!')
            cy.click_element('test-button')
            // check the correct button has been clicked
            cy.test_content('test-button', 'Clicked!')
            // check that no other buttons have been clicked
            cy.test_content('test-dupe-button', 'Click me!')
            cy.test_content('test-dupe-button', 'No click me!')
        })

        it('clicks on the nth element with that data-testid', () => {
            // initial state
            cy.test_content('test-dupe-button', 'Click me!', 1)
            cy.test_content('test-dupe-button', 'No click me!', 2)

            cy.click_element('test-dupe-button', 2)
            
            // first button hasn't been clicked
            cy.test_content('test-dupe-button', 'Click me!', 1)
            // but the second one has
            cy.test_content('test-dupe-button', 'Clicked!', 2)
        })

        it('clicks all the elements with that data-testid', () => {
            // initial state
            cy.test_content('test-dupe-button', 'Click me!', 1)
            cy.test_content('test-dupe-button', 'No click me!', 2)

            cy.click_element('test-dupe-button', 'all')

            // both buttons have been clicked
            cy.test_content('test-dupe-button', 'Clicked!', 1)
            cy.test_content('test-dupe-button', 'Clicked!', 2)
        })
    })
    
    describe('get_element', () => {
        it('gets an element by data-testid', () => {
            cy.get('[data-testid="test-div"]').then(cypress_get => {
                cy.get_element('test-div').then(get_element_command => {
                    // A is the element fetched using cy.get
                    let A = cypress_get[0].outerHTML
                    // B is the element fetched using cy.get_element
                    let B = get_element_command[0].outerHTML
                    expect(A).to.equal(B)
                })
            })
        })

        it('gets the nth element with that data-testid', () => {
            cy.get('[data-testid="test-paragraph"]').filter(':contains("Second paragraph with duplicate data-testid")').then(cypress_get => {
                cy.get_element('test-paragraph', 2).then(get_element_command => {
                    // A is the element fetched using cy.get
                    let A = cypress_get[0].outerHTML
                    // B is the element fetched using cy.get_element
                    let B = get_element_command[0].outerHTML
                    expect(A).to.equal(B)
                })
            })
        })
    })

    describe('select_from_dropdown', () => {
        it('clicks an option from a dropdown box', () => {
            const option = 'Hamster'
            cy.select_from_dropdown('test-dropdown', option)
            cy.get_element('test-dropdown').should('have.value', option)
        })
    })

    describe('type_into_element', () => {
        it('types into an element by data-testid', () => {
            const input_string = 'Testing 123'
            cy.type_into_element('test-input', input_string)
            cy.get_element('test-input').should('have.value', input_string)
        })

        it('types into the nth element with that data-testid', () => {
            const input_string = 'Testing 123'
            const element_instance = 2
            cy.type_into_element('test-dupe-input', input_string, element_instance)
            cy.get_element('test-dupe-input', element_instance).should('have.value', input_string)
        })
    })
})