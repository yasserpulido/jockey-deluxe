const genders = require("../../../src/mocks/genders.json");
const countries = require("../../../src/mocks/countries.json");
const humans = require("../../../src/mocks/humans.json");

describe("Human Form", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3002/genders", {
      body: genders,
    }).as("getGenders");
    cy.intercept("GET", "http://localhost:3002/countries", {
      body: countries,
    }).as("getCountries");
    cy.intercept("GET", "http://localhost:3001/humans", {
      body: humans,
    }).as("getHumans");
  });

  it("Should Successfully Save Human Data When Data Is Submitted", () => {
    cy.intercept("POST", "http://localhost:3001/humans", {
      statusCode: 200,
    }).as("createHuman");
    cy.visit("http://localhost:3000/");
    cy.get("#firstname").type("Peter");
    cy.get("#lastname").type("Wolff");
    cy.get("#birth").type("1992-07-12");
    cy.get("#gender").click();
    cy.contains("Male").click();
    cy.get("#nationality").click();
    cy.contains("Bolivia").click();
    cy.get("label").contains("Jockey").click();
    cy.get("label").contains("Trainer").click();
    cy.contains("Save").click();
    cy.contains("Yes").click();
    cy.wait("@createHuman").its("response.statusCode").should("eq", 200);
    cy.contains("Human successfully created!").should("be.visible");
  });

  it("Should Display 'First Name is required.' Error Message When Attempting to Save Empty Form", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#lastname").type("Wolff");
    cy.get("#birth").type("1992-07-12");
    cy.get("#gender").click();
    cy.contains("Male").click();
    cy.get("#nationality").click();
    cy.contains("Bolivia").click();
    cy.get("label").contains("Jockey").click();
    cy.get("label").contains("Trainer").click();
    cy.contains("Save").click();
    cy.contains("First Name is required.").should("be.visible");
  });

  it("Should Display 'First Name must be at least 3 characters long.' Error Message When Attempting to Save Empty Form", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#firstname").type("Pe");
    cy.get("#lastname").type("Wolff");
    cy.get("#birth").type("1992-07-12");
    cy.get("#gender").click();
    cy.contains("Male").click();
    cy.get("#nationality").click();
    cy.contains("Bolivia").click();
    cy.get("label").contains("Jockey").click();
    cy.get("label").contains("Trainer").click();
    cy.contains("Save").click();
    cy.contains("First Name must be at least 3 characters long.").should("be.visible");
  });

  it.only("Should Display 'Last Name must be at least 3 characters long.' Error Message When Attempting to Save Empty Form", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#firstname").type("Peter");
    cy.get("#lastname").type("Wo");
    cy.get("#birth").type("1992-07-12");
    cy.get("#gender").click();
    cy.contains("Male").click();
    cy.get("#nationality").click();
    cy.contains("Bolivia").click();
    cy.get("label").contains("Jockey").click();
    cy.get("label").contains("Trainer").click();
    cy.contains("Save").click();
    cy.contains("Last Name must be at least 3 characters long.").should("be.visible");
  });

  it("Should Display 'Last Name is required.' Error Message When Attempting to Save Empty Form", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#firstname").type("Peter");
    cy.get("#birth").type("1992-07-12");
    cy.get("#gender").click();
    cy.contains("Male").click();
    cy.get("#nationality").click();
    cy.contains("Bolivia").click();
    cy.get("label").contains("Jockey").click();
    cy.get("label").contains("Trainer").click();
    cy.contains("Save").click();
    cy.contains("Last Name is required.").should("be.visible");
  });

  it("Should Display 'Birth Date is required.' Error Message When Attempting to Save Empty Form", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#firstname").type("Peter");
    cy.get("#lastname").type("Wolff");
    cy.get("#gender").click();
    cy.contains("Male").click();
    cy.get("#nationality").click();
    cy.contains("Bolivia").click();
    cy.get("label").contains("Jockey").click();
    cy.get("label").contains("Trainer").click();
    cy.contains("Save").click();
    cy.contains("Birth Date is required.").should("be.visible");
  });

  it("Should Display 'Gender is required.' Error Message When Attempting to Save Empty Form", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#firstname").type("Peter");
    cy.get("#lastname").type("Wolff");
    cy.get("#birth").type("1992-07-12");
    cy.get("#nationality").click();
    cy.contains("Bolivia").click();
    cy.get("label").contains("Jockey").click();
    cy.get("label").contains("Trainer").click();
    cy.contains("Save").click();
    cy.contains("Gender is required.").should("be.visible");
  });

  it("Should Display 'Nationality is required.' Error Message When Attempting to Save Empty Form", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#firstname").type("Peter");
    cy.get("#lastname").type("Wolff");
    cy.get("#birth").type("1992-07-12");
    cy.get("#gender").click();
    cy.contains("Male").click();
    cy.get("label").contains("Jockey").click();
    cy.get("label").contains("Trainer").click();
    cy.contains("Save").click();
    cy.contains("Nationality is required.").should("be.visible");
  });

  it("Should Display 'At least one job should be selected.' Error Message When Attempting to Save Empty Form", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#firstname").type("Peter");
    cy.get("#lastname").type("Wolff");
    cy.get("#birth").type("1992-07-12");
    cy.get("#gender").click();
    cy.contains("Male").click();
    cy.get("#nationality").click();
    cy.contains("Bolivia").click();
    cy.contains("Save").click();
    cy.contains("At least one job should be selected.").should("be.visible");
  });
});
