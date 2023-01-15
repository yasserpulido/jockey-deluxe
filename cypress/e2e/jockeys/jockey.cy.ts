describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });

  it.only("Llenar formulario", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#firstname").type("Yasser");
    cy.get("#lastname").type("Pulido");
    cy.get("#birth").type("1991-04-30");
    cy.get("#gender").click();
    cy.contains("Male").click();
    cy.get("#nationality").click();
    cy.contains("Venezuela").click();
    cy.contains("Save").click();
    cy.contains("Ok").click();
  });
});
