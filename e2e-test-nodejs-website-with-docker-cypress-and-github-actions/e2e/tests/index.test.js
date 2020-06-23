describe("Index Page", () => {
  before(() => {
    cy.visit("localhost:4040");
  });

  it("should contain a form element", () => {
    const form = cy.get("form");
    form.should("exist");
    form.get('input#username').should('exist');
    form.get('input#password').should('exist');
    form.get('button[type="submit"]').should('exist');
  });

  it("should send http request with login payload when submit button clicked", () => {
    cy.server();
    cy.route("POST", "/submit").as("submit");
    cy.get('input#username').type("test");
    cy.get('input#password').type("123abc");
    cy.get('button[type="submit"]').click();

    cy.wait("@submit").should("have.property", "status", 200);

    cy.get("@submit").should((xhr) => {
      expect(xhr.request.body).to.deep.equal({ username: "test", password: "123abc" });
      expect(xhr.response.body).to.equal("submit success!");
    });
  });
});
