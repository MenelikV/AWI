const URL = "http://localhost:1337/Settings/DGPS"
describe("Settings change should not break the app", function(){
    before(function() {
        cy.visit(URL)
    })
    afterEach(function(){
        // Test app not breaking after changes
        cy.visit("http://localhost:1337/Activities/DGPS/flights")
        cy.visit(URL)      
    })
    after(function(){
        // Back to normal
        cy.visit(URL)
        cy.get('#csv_dir').clear().type("\\\\AEC-AFR-FS-01.afr.corp.local\\bu-systems\\AEC\\4-OPERATIONS\\3-Production\\SOP_04377\\test_files\\dgps\\csv\\")
        cy.get('#change_csv').click()

        cy.get('#pvol_dir').clear().type("\\\\AEC-AFR-FS-01.afr.corp.local\\bu-systems\\AEC\\4-OPERATIONS\\3-Production\\SOP_04377\\test_files\\dgps\\pvol\\")
        cy.get('#change_pvol').click()

        cy.get('#info_dir').clear().type("\\\\AEC-AFR-FS-01.afr.corp.local\\bu-systems\\AEC\\4-OPERATIONS\\3-Production\\SOP_04377\\test_files\\dgps\\info\\")
        cy.get('#change_info').click()

        cy.get('#discipline_dir').clear().type("/perf/")
        cy.get('#change_discipline').click()

        cy.visit("http://localhost:1337/Activities/DGPS/flights")
    })

    it("Change to Dummy CSV Folder", function(){
        cy.get('#csv_dir').clear().type("assets/test_files/dgps/csv/")
        cy.get('#change_csv').click()

        var unusable_folder = "C:\\Users\\mvero-ext\\Documents\\"
        cy.get('#csv_dir').clear().type(unusable_folder)
        cy.get('#change_csv').click().should("have.text", "Invalid Directory")
        cy.visit("http://localhost:1337/Activities/DGPS/flights")
    })
    it("Change to Dummy PVOL Folder", function(){
        cy.get('#pvol_dir').clear().type("assets/test_files/dgps/pvol/")
        cy.get('#change_pvol').click()

        var unusable_folder = "C:\\Users\\mvero-ext\\Documents\\"
        cy.get('#pvol_dir').clear().type(unusable_folder)
        cy.get('#change_pvol').click().should("have.text", "Invalid Directory")
        cy.visit("http://localhost:1337/Activities/DGPS/flights")
    })
    it("Change to Dummy INFO Folder", function(){
        cy.get('#info_dir').clear().type("assets/test_files/dgps/info/")
        cy.get('#change_info').click()

        var unusable_folder = "C:\\Users\\mvero-ext\\Documents\\"
        cy.get('#info_dir').clear().type(unusable_folder)
        cy.get('#change_info').click().should("have.text", "Invalid Directory")
        cy.visit("http://localhost:1337/Activities/DGPS/flights")
    })
    it("Change Discipline", function(){
        var non_existant_discipline = "/prout/"
        cy.get('#discipline_dir').clear().type(non_existant_discipline)
        cy.get('#change_discipline').click().should("have.text", "Changes Saved")
        cy.visit("http://localhost:1337/Activities/DGPS/flightOverview/N6464V0192DGPS_DF")
    })
})