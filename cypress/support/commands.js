// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import '@testing-library/cypress/add-commands'

Cypress.Commands.add('createTask', (taskName = '')=> {
  cy.visit('/');

  //Alias 
  cy.get('input[placeholder="Add a new Task"]').as('inputTask')
  
  if(taskName !== ''){
    cy.get('@inputTask')
      .type(taskName)
  }  

    cy.contains('button', 'Create').click()
})

Cypress.Commands.add('isRequired', (targetMessage) => {
  cy.get('@inputTask')
        .invoke('prop', 'validationMessage')
        .should((text) => {
            expect(
              targetMessage
            ).to.eq(text)
         })
})

Cypress.Commands.add('removeTaskByName', (taskName)=> {
    
    //Teste independente utilizando API
    //requisição para deletar massa de teste
    cy.api({
      method: 'DELETE',
      url: Cypress.env('apiUrl') + '/helper/tasks',
      body: {name: taskName}
    }).then(response => {
      expect(response.status).to.eq(204)
  })
})

Cypress.Commands.add('postTask', (task)=> {
    cy.api({
     method: 'POST',
     url:  Cypress.env('apiUrl') + '/tasks',
     body: task
   }).then(response => {
     expect(response.status).to.eq(201)
 })
})
