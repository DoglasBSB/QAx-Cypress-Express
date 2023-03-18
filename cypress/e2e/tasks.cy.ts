describe("Tarefas", () => {
  context("Cadastro", () => {
    it("Deve cadastrar uma nova tarefa", () => {
      const taskName = "Ler um livro Jornada QA";

      cy.removeTaskByName(taskName);
      // Encapsulamento - Função costumizada
      cy.createTask(taskName);

      cy.contains("main div p", taskName).should("be.visible");
    });

    it("Não deve permitir tarefa duplicada", () => {
      //constante criada como um objeto
      const task = {
        name: "Estudar Javascript",
        is_done: false,
      };

      cy.removeTaskByName(task.name);
      cy.postTask(task);
      cy.createTask(task.name);

      cy.get(".swal2-html-container")
        .should("be.visible")
        .should("have.text", "Task already exists!");
    });

    it("Campo obrigatório", () => {
      cy.createTask();
      //Validando a mensagem com invoke
      cy.isRequired("This is a required field");
    });
  });

  context("Atualização", () => {
    it("Deve concluir uma tarefa", () => {
      //cria um objeto
      const task = {
        name: "Automatizar testes",
        is_done: false,
      };

      cy.removeTaskByName(task.name);
      cy.postTask(task);

      cy.visit("/");

      cy.contains("p", task.name)
        .parent()
        .find("button[class*=ItemToggle]")
        .click();

      //Validando CSS Style
      cy.contains("p", task.name).should(
        "have.css",
        "text-decoration-line",
        "line-through",
        cy.wait(500)
      );
    });
  });

  context("Exclusão", () => {
    it("Deve remover uma tarefa", () => {
      //cria um objeto
      const task = {
        name: "Estudar Javascript",
        is_done: false,
      };

      cy.removeTaskByName(task.name);
      cy.postTask(task);

      cy.visit("/");

      cy.contains("p", task.name)
        .parent()
        .find("button[class*=ItemDelete]")
        .click();

      //Validando CSS Style
      cy.contains("p", task.name).should("not.exist");
    });
  });
});
