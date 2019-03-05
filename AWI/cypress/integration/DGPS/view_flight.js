const URL = "http://localhost:1337/Activities/DGPS/flightOverview/N6464V0192"
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
        cy.get('[data-target="#demo_2"] > :nth-child(1)').click({force: true}),
        cy.get('#subtable_2 > tbody > .odd > [style="white-space: nowrap;"] > [data-mr="/perf/N6464V0192DGPS_DF"] >').click({force: true}),
        // Wait for the plot request to be complete
        cy.wait("@plot"),
        cy.get("#plotModal").should("be.visible") 
        //cy.server({enable:false})
    })
    afterEach(function(){
        cy.server({enable: false})
    })
    it("Filter", function(){
        cy.get('#nav-profile-tab').click({force: true})
        cy.get('[data-target="#demo_2"] > :nth-child(1)').click({force: true})
        cy.get('#subtable_2 > tbody > .odd > [style="white-space: nowrap;"] > [data-id="filter_par"] >').click({force: true}),
        cy.get("#filterModalCenter").should("be.visible")
        cy.get('#filter').click().should("be.disabled")
    }),
    it("Search", function(){
        cy.get('#nav-profile-tab').click({force: true})
        cy.get('[data-target="#demo_2"] > :nth-child(1)').click({force: true})
        cy.get('#subtable_2 > tbody > .odd > [style="white-space: nowrap;"] > [data-id="search_par"] >').click({force: true}),
        cy.get("#searchModalCenter").should("be.visible")
        cy.get('#save').click()
        cy.url().should("eq", "http://localhost:1337/Activities/DGPS/search")
    })
})