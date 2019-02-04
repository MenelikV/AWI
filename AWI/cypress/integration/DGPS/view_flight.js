const URL = "http://localhost:1337/Activities/DGPS/flightOverview/N6464V0192DGPS_DF"
describe("View Flight", function(){
    it("Access the second tab and one flight", function(){
        cy.visit(URL)
        cy.get('#nav-profile-tab').click().then(
            cy.get('[data-target="#demo_9"] > :nth-child(1)').click(),
            cy.get('#subtable_9 > tbody > .odd > [style="white-space: nowrap"] > [data-mr="/perf/N6464V0192DGPS_DF"] > .fa')
        )
        
    })
})