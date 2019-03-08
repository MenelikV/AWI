const URL = "http://localhost:1337/"
describe("Choose MCI activity on front page", function(){
    it('Choosing from combobox', function(){
        cy.visit(URL)
        cy.get('.sel').click()
        var name = "MCI"
        // Could be refractored with select ?
        cy.get("span.sel__box__options")
          .should(($e) => {
              expect($e).to.have.length(3)
              expect($e).to.be.visible
          })
          .contains(name)
          .click()
        cy.get("span.sel__placeholder").should("have.text", name)
        cy.get("#check").click()
        cy.url().should('have.string', name)
    })
    it("Choosing an activity from the dropdown", function(){
        cy.visit(URL)
        // Click does not seem to work
        // Maybe relted to https://github.com/cypress-io/cypress/issues/1461
        cy.get('#header-account-menu-link').trigger("mouseover").click()
        cy.get("a.dropdown-item.nav-drop").should(($e) =>{
            expect($e).to.have.length(3)
        }).contains("MCI").click()
        cy.url().should("have.string", "MCI")
    })
})