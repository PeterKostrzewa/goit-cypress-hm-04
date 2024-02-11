/// <reference types="cypress" />

describe('basic CRUD tests', () => {

//1. GET - Sprawdź status 200:

it("Should return status 200 for GET request", () => {
  cy.request("GET", "https://httpbin.org/get").its("status").should("eq", 200);
});

//2. POST - Wyślij dane formularza:

it("Should submit form data using POST request", () => {
  const formData = {
    username: "testuser",
    password: "testpassword",
  };

  cy.request({
    method: "POST",
    url: "https://httpbin.org/post",
    form: true, 
    body: formData,
    timeout: 10000, 
  })
    .its("body.form")
    .should("deep.equal", formData);
});

//3. PUT - Zaktualizuj zasób:

it('Should update a resource using PUT request', () => {
    const updatedData = {
      key: 'new-value',
    };
  
    cy.request('PUT', 'https://httpbin.org/put', updatedData)
      .should((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.json.key).to.equal(updatedData.key);
      });
  });

//4. DELETE - Usuń zasób:

it('Should delete a resource using DELETE request', () => {
    cy.request('DELETE', 'https://httpbin.org/delete')
      .its('status')
      .should('eq', 200);
  });
});

//5. Sprawdzenie nagłówków:

describe.only('httpbin tests', () => {
    const request = {
      method: 'GET',
      url: 'https://httpbin.org/get',
      headers: {
        "customHeader": "customValue"
      },
      failOnStatusCode: false
    };
  
    it('test that header set correctly', () => {
      cy.request(request).then(response => {
        assert.equal(200, response.status);
        assert.equal("customValue", response.requestHeaders.customHeader);
        cy.log(JSON.stringify(response.requestHeaders.customHeader));
        //dlaczego nie zwraca prawidłowych wartości headers?
      });
    });
  });
  
  
//6. Niestandardowy nagłówek - Dodaj niestandardowy nagłówek:

it('Should send a request with a custom header', () => {
    const customHeader = 'X-Custom-Header: custom-value';
  
    cy.request({
      method: 'GET',
      url: 'https://httpbin.org/headers',
      headers: {
        'X-Custom-Header': 'custom-value',
      },
    })
      .its('headers')
      .should('include', { 'X-Custom-Header': 'custom-value' });
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  