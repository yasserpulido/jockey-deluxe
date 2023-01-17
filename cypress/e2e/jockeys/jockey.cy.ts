const genders = require("../../../src/mocks/genders.json");
const countries = require("../../../src/mocks/countries.json");
const jockeys = require("../../../src/mocks/jockeys.json");

describe("Jockey Form", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/genders", {
      body: genders,
    }).as("getGenders");
    cy.intercept("GET", "http://localhost:3001/countries", {
      body: countries,
    }).as("getCountries");
    cy.intercept("GET", "http://localhost:3001/jockeys", {
      body: jockeys,
    }).as("getJockeys");
  });

  it("Should Successfully Save Jockey Data When Data is Submitted", () => {
    cy.intercept("POST", "http://localhost:3001/jockeys", {
      statusCode: 200,
    }).as("saveJockey");
    cy.visit("http://localhost:3000/");
    cy.get("#firstname").type("Peter");
    cy.get("#lastname").type("Wolff");
    cy.get("#birth").type("1992-07-12");
    cy.get("#gender").click();
    cy.contains("Male").click();
    cy.get("#nationality").click();
    cy.contains("Bolivia").click();
    cy.contains("Save").click();
    cy.contains("Ok").click();
    cy.wait("@saveJockey").its("response.statusCode").should("eq", 200);
  });

  it("Should Display 'Please enter a first name.' Error Message When Attempting to Save Empty Form", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#lastname").type("Wolff");
    cy.get("#birth").type("1992-07-12");
    cy.get("#gender").click();
    cy.contains("Male").click();
    cy.get("#nationality").click();
    cy.contains("Bolivia").click();
    cy.contains("Save").click();
    cy.contains("Please enter a first name.").should("be.visible");
  });

  it("Should Display 'Please enter a last name.' Error Message When Attempting to Save Empty Form", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#firstname").type("Peter");
    cy.get("#birth").type("1992-07-12");
    cy.get("#gender").click();
    cy.contains("Male").click();
    cy.get("#nationality").click();
    cy.contains("Bolivia").click();
    cy.contains("Save").click();
    cy.contains("Please enter a last name.").should("be.visible");
  });

  it("Should Display 'Please enter a birth date.' Error Message When Attempting to Save Empty Form", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#firstname").type("Peter");
    cy.get("#lastname").type("Wolff");
    cy.get("#gender").click();
    cy.contains("Male").click();
    cy.get("#nationality").click();
    cy.contains("Bolivia").click();
    cy.contains("Save").click();
    cy.contains("Please enter a birth date.").should("be.visible");
  });

  it("Should Display 'Please select a gender.' Error Message When Attempting to Save Empty Form", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#firstname").type("Peter");
    cy.get("#lastname").type("Wolff");
    cy.get("#birth").type("1992-07-12");
    cy.get("#nationality").click();
    cy.contains("Bolivia").click();
    cy.contains("Save").click();
    cy.contains("Please select a gender.").should("be.visible");
  });

  it("Should Display 'Please select a nationality.' Error Message When Attempting to Save Empty Form", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#firstname").type("Peter");
    cy.get("#lastname").type("Wolff");
    cy.get("#birth").type("1992-07-12");
    cy.get("#gender").click();
    cy.contains("Male").click();
    cy.contains("Save").click();
    cy.contains("Please select a nationality.").should("be.visible");
  });
});
