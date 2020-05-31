Cypress.on("window:before:load", (win) => {
  fetch("https://unpkg.com/unfetch/dist/unfetch.umd.js")
    .then((stream) => stream.text())
    .then((response) => {
      win.eval(response);
      win.fetch = win.unfetch;
    });
});

describe("Home Page", () => {
  before(() => {
    cy.visit("/");
  });

  it("should contain a form element", () => {
    cy.get("div.form").should("exist");
    cy.get('div.form > input[type="text"]').should("exist");
    cy.get('div.form > button[type="submit"]').should("exist");
  });

  it("should send an ajax request when submit button clicked", () => {
    cy.server();
    cy.route("POST", "/submit").as("submit");
    cy.get('input[type="text"]').type("test input");
    cy.get('button[type="submit"]').click();

    cy.wait("@submit").should("have.property", "status", 200);

    cy.get("@submit").should((xhr) => {
      expect(xhr.request.body).to.deep.equal({ input: "test input" });
      expect(xhr.response.body).to.equal("submit success!");
    });
  });
});
