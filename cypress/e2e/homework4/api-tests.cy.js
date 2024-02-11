/// <reference types="cypress" />

describe("basic CRUD tests", () => {
  //1. GET - Sprawdź status 200:

  it("Should return status 200 for GET request", () => {
    cy.request("GET", "https://httpbin.org/get")
      .its("status")
      .should("eq", 200);
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

  it("Should update a resource using PUT request", () => {
    const updatedData = {
      key: "new-value",
    };

    cy.request("PUT", "https://httpbin.org/put", updatedData).should(
      (response) => {
        expect(response.status).to.equal(200);
        expect(response.body.json.key).to.equal(updatedData.key);
      }
    );
  });

  //4. DELETE - Usuń zasób:

  it("Should delete a resource using DELETE request", () => {
    cy.request("DELETE", "https://httpbin.org/delete")
      .its("status")
      .should("eq", 200);
  });
});

//5. Sprawdzenie losowego nagłówka:

describe("httpbin tests", () => {
  const request = {
    method: "GET",
    url: "https://httpbin.org/get",
    headers: {
      customHeader: "customValue",
    },
    failOnStatusCode: false,
  };

  it("test that header set correctly", () => {
    cy.request(request).then((response) => {
      const currentStatus = response.status;
      const expectedStatus = 200;

      const currentHeaderValue = response.requestHeaders.customHeader;

      assert.equal("customValue", currentHeaderValue);
      assert.equal(expectedStatus, currentStatus);

      cy.log(response.requestHeaders);
      cy.log(JSON.stringify(response.requestHeaders));
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
    }).then(response => {
          
          expect(response.requestHeaders['X-Custom-Header']).to.include('custom-value');
        });
      });

// 7. Sprawdzenie nagłówka User-Agent:

describe("GET - API User-Agent", () => {
    const request = {
      method: "GET",
      url: "https://httpbin.org/get",
      headers: {
        "User-Agent": "My-test-user-agent",
      },
      failOnStatusCode: false,
    };
  
    it("response and user Agent should be correct", () => {
      cy.request(request).then((response) => {
        const currentStatus = response.status;
        const expectedStatus = 200;

        const currentUserAgentValue = response.requestHeaders['User-Agent']

        assert.equal('My-test-user-agent', currentUserAgentValue);
        assert.equal(expectedStatus, currentStatus);

        cy.log(JSON.stringify(response.requestHeaders));
      });
    });
  });

 // 8. Sprawdzenie czasu odpowiedzi:
 
 describe('GET - Check duration', () => {
    const request = {
        method: 'GET',
        url: "https://httpbin.org/get",
        failOnStatusCode: false,
    }

    it('test duration', () => {
        cy.request(request).then(response => {
           assert.isTrue(response.duration <= 1000) 
        });
    });
 });

 //9. Sprawdzenie zawartości odpowiedzi JSON:

 it('Should check JSON response content', () => {
    cy.request('GET', 'https://httpbin.org/json')
      .its('body')
      .should('have.property', 'slideshow');
  });

// 10. Wysyłanie żądania z nagłówkiem "Accept":

  it('Should send request with Accept header', () => {
    cy.request('GET', 'https://httpbin.org/headers', {
      headers: {
        Accept: 'application/json',
      },
    })
      .its('headers.Accept')
      .should('not.exist');
  });



    
