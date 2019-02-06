const URL = "http://localhost:1337/Activities/DGPS/flightOverview/N6464V0192DGPS_DF"
describe("View Flight", function(){
    beforeEach(function(){
        cy.server()
        cy.reload()
        cy.visit(URL)
    })
    it("Access the second tab and one flight", function(){
        //cy.server()
        cy.route("**/Activities/flightOverview/plot*/**/*").as("plot")
        cy.get('#nav-profile-tab').click()
        cy.get('[data-target="#demo_9"] > :nth-child(1)').click(),
        cy.get('#subtable_9 > tbody > .odd > [style="white-space: nowrap"] > [data-mr="/perf/N6464V0192DGPS_DF"] >').click(),
        // Wait for the plot request to be complete
        cy.wait("@plot"),
        cy.get("#plotModal").should("be.visible")
        //cy.server({enable:false})
        
    })
    afterEach(function(){
        cy.server({enable: false})
    })
    it("Search", function(){
        cy.get('#nav-profile-tab').click()
        cy.get('[data-target="#demo_9"] > :nth-child(1)').click()
        cy.get('#subtable_9 > tbody > .odd > [style="white-space: nowrap"] > [data-id="search_par"] >').click()
    
    }),
    it("Filter", function(){
        cy.get('#nav-profile-tab').click()
        cy.get('[data-target="#demo_9"] > :nth-child(1)').click()
        cy.get('#subtable_9 > tbody > .odd > [style="white-space: nowrap"] > [data-id="search_par"] >').click()
    })
})