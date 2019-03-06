const URL = "http://localhost:1337/Activities/DGPS/flights"
describe("Choose a flight from the flight table", function(){
    it("Click on the table", function(){
        cy.visit(URL)
        cy.get('tbody > :nth-child(5) > :nth-child(4)').then(($el)=>{
            const name = $el.text().trim(' ')
            console.log(name)
            cy.get("tbody > :nth-child(5)").trigger("mouseover", {force: true}).click()
            cy.url().should("have.string", name)
        })
    })
})