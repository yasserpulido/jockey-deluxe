describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });

  it.only("Select a country", () => {
    cy.visit("http://localhost:3000/");
  });
});
