const URL = "http://localhost:1337/Settings/MCI"
describe("Settings change should not break the app", function(){
    before(function() {
        cy.visit(URL)
    })
    afterEach(function(){
        // Test app not breaking after changes
        cy.visit("http://localhost:1337/Activities/MCI/flights")
        cy.visit(URL)      
    })
    after(function(){
        // Back to normal
        cy.visit(URL)
        cy.get('#csv_dir').clear().type("assets/test_files/mci/csv/")
        cy.get('#change_csv').click()

        cy.get('#discipline_dir').clear().type("/perf/")
        cy.get('#change_discipline').click()

        cy.visit("http://localhost:1337/Activities/MCI/flights")
    })
    it("Change to Dummy CSV Folder", function(){
        cy.get('#csv_dir').clear().type("assets/test_files/mci/csv/")
        cy.get('#change_csv').click()

        var unusable_folder = "C:\\Users\\mvero-ext\\Documents\\"
        cy.get('#csv_dir').clear().type(unusable_folder)
        cy.get('#change_csv').click().should("have.text", "Invalid Directory")
        cy.visit("http://localhost:1337/Activities/MCI/flights")
    })
    it("Change Discipline", function(){
        var non_existant_discipline = "/prout/"
        cy.get('#discipline_dir').clear().type(non_existant_discipline)
        cy.get('#change_discipline').click().should("have.text", "Changes Saved")
    })
})