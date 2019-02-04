const URL = "http://localhost:1337/Settings/DGPS"
describe("Settings change should not break the app", function(){
    beforeEach(function(){
        // Reset to test default the location of folder
        cy.visit(URL)
        cy.get('#csv_dir').clear().type("assets/test_files/dgps/csv/")
        cy.get('#change_csv').click()
    })
    after(function(){
        // Back to normal
        cy.visit(URL)
        cy.get('#csv_dir').clear().type("assets/test_files/dgps/csv/")
        cy.get('#discipline_dir').clear().type("/perf/")
    })
    it("Change to Dummy CSV Folder", function(){
        var unusable_folder = "C:\\Users\\mvero-ext\\Documents\\"
        cy.get('#csv_dir').clear().type(unusable_folder)
        cy.get('#change_csv').click().should("have.text", "Changes Saved")
        cy.visit("http://localhost:1337/Activities/DGPS/flights")
    })
    it("Change to Dummy CSV Folder 2", function(){
        var unusable_folder = "TOTO"
        cy.get('#csv_dir').clear().type(unusable_folder)
        cy.get('#change_csv').click().should("have.text", "Changes Saved")
        cy.visit("http://localhost:1337/Activities/DGPS/flights")
    })
    it("Change Discipline", function(){
        var non_existant_discipline = "/prout/"
        cy.get('#discipline_dir').clear().type(non_existant_discipline)
        cy.get('#change_discipline').click().should("have.text", "Changes Saved")
        cy.visit("http://localhost:1337/Activities/DGPS/flightOverview/N6464V0192DGPS_DF")
    })
})