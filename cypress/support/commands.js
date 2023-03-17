// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
import '@testing-library/cypress/add-commands'
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createTask', (taskName)=> {

    cy.visit('http://localhost:8080');
    cy.get('input[placeholder="Add a new Task"]')
      .type(taskName)
    cy.contains('button', 'Create').click()
})

Cypress.Commands.add('removeTaskByName', (taskName)=> {
    
    //Teste independente utilizando API
    //requisição para deletar massa de teste
    cy.api({
      method: 'DELETE',
      url: 'http://localhost:3333/helper/tasks',
      body: {name: taskName}
    }).then(response => {
      expect(response.status).to.eq(204)
  })
})

Cypress.Commands.add('postTask', (task)=> {
    cy.api({
     method: 'POST',
     url: 'http://localhost:3333/tasks',
     body: task
   }).then(response => {
     expect(response.status).to.eq(201)
 })
})
