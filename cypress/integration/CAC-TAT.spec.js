/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html');
})
    
    it('verifica o título da aplicação', function() {
        
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');

    })
    it('Ex0 - Preenche os campos obrigatórios e envia o formulário', function() {

        cy.get('input[id="firstName"]').type('Carlos')
        .should('have.value', 'Carlos');

        cy.get('input[id="lastName"]').type('Souza')
        .should('have.value', 'Souza');

        cy.get('input[id="email"]').type('crl-202@hotmail.com')
        .should('have.value', 'crl-202@hotmail.com');

        cy.get('textarea[id="open-text-area"]').type('TESTES CYPRESS')
        .should('have.value', 'TESTES CYPRESS');

        cy.get('button[type="submit"]').click();
        
        cy.clock();
        cy.get('span[class="success"]')
        .should('be.visible');

        cy.tick(3000)
        cy.get('span[class="success"]')
        .should('not.be.visible');
    })
    Cypress._.times(5, function(){
        
    it('Ex1 - Delay', function() {
        const longText = 'TESTE / TESTE / TESTE / TESTE / TESTE / TESTE / TESTE / TESTE / TESTE / TESTE / TESTE / TESTE / TESTE / TESTE / TESTE / TESTE / TESTE / TESTE /'
        cy.get('textarea[id="open-text-area"]')
        .type(longText, {delay:0})
        .should('have.value', longText)

    })
    })
    it('Ex2 - Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('input[id="firstName"]').type('Carlos');
        cy.get('input[id="lastName"]').type('Souza');
        cy.get('input[id="email"]').type('teste-email.com');
        cy.get('textarea[id="open-text-area"]').type('TESTES CYPRESS');

        cy.get('button[type="submit"]').click();
        
        cy.clock();
        cy.get('span[class="error"]')
        .should('be.visible');

        cy.tick(3000)
        cy.get('span[class="error"]')
        .should('not.be.visible');
    })
    it('Ex3 - Valida Telefone', function(){
        cy.get('input[id="phone"]').type('TESTE')
        .should('have.text', '')

    })
    it('Ex4 - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário ', function(){
        cy.get('input[id="firstName"]').type('Carlos');
        cy.get('input[id="lastName"]').type('Souza');
        cy.get('input[id="email"]').type('crl-202@hotmail.com');
        cy.get('textarea[id="open-text-area"]').type('TESTES CYPRESS');
        cy.get('input[id="phone-checkbox"]').check();

        cy.get('button[type="submit"]').click();

        cy.clock();
        cy.get('span[class="error"]')
        .should('be.visible');

        cy.tick(3000)
        cy.get('span[class="error"]')
        .should('not.be.visible');

    })
    it('Ex5 - Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('input[id="firstName"]').type('Carlos')
        .should('have.value', 'Carlos');

        cy.get('input[id="lastName"]').type('Souza')
        .should('have.value', 'Souza');

        cy.get('input[id="email"]').type('crl-202@hotmail.com')
        .should('have.value', 'crl-202@hotmail.com');

        cy.get('input[id="phone"]').type('998546585')
        .should('have.value', '998546585');

        cy.get('textarea[id="open-text-area"]').type('TESTES CYPRESS')
        .should('have.value', 'TESTES CYPRESS');

        //LIMPANDO E VALIDANDO

        cy.get('input[id="firstName"]').clear()
        .should('have.value', '');

        cy.get('input[id="lastName"]').clear()
        .should('have.value', '');

        cy.get('input[id="email"]').clear()
        .should('have.value', '');

        cy.get('input[id="phone"]').clear()
        .should('have.value', '');

        cy.get('textarea[id="open-text-area"]').clear()
        .should('have.value', '');

        //Poderia ser inserido o texto e depois o clear() e validação em apenas um get

    })
    it('Ex6 - exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click();

        cy.clock();
        cy.get('span[class="error"]')
        .should('be.visible');

        cy.tick(3000)
        cy.get('span[class="error"]')
        .should('not.be.visible');

    })
    it('Ex7 - Envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit('Carlos', 'Souza', 'caca.ssouza@hotmail.com', 'TESTE');

        cy.clock();
        cy.get('span[class="success"]')
        .should('be.visible');

        cy.tick(3000)
        cy.get('span[class="success"]')
        .should('not.be.visible');

    })
    it('Ex8 - Utilizando CY.CONTAINS ', function(){
        cy.contains('div', 'Nome').type('Carlos');
        cy.contains('div', 'Sobrenome').type('Souza');
        cy.contains('div', 'E-mail').type('crl-202@hotmail.com');
        cy.contains('div', 'Como podemos te ajudar?').type('TESTES CYPRESS');
        cy.contains('button', 'Enviar').click();

        cy.contains('span', 'Mensagem enviada com sucesso.').should('be.visible');
    })

    ///////// SELECTS 

    it('Ex9 - Seleciona um produto (YouTube) por seu texto', function(){
        cy.get('select[id="product"]').select('YouTube')
        .should('have.value', 'youtube');
    })
    it('Ex10 - Seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('select[id="product"]').select('mentoria')
        .should('have.value', 'mentoria');
    })
    it('Ex11 - seleciona um produto (Blog) por seu índice', function(){
        cy.get('select[id="product"]').select(1)
        .should('have.value', 'blog');
    })

    ///// RADIOS

    it('Ex12 -Marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check('feedback')
        .should('have.value', 'feedback');
    })
    it('Ex13 - marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]').should('have.length', 3)
        .each(($radio, index, $radios) =>{
            cy.wrap($radio).check().should('be.checked');
    //.each é similar ao FOR
        })    
    })

    ///////// CHECKBOX
    it('Ex13 - Marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]').check()
        .should('be.checked')
        .last().uncheck() // desmarcando o último checkbox
        .should('not.be.checked');
    })

    //// FAZENDO UPLOAD DE ARQUIVOS ATRAVÉS DO INPUT
    it('Ex14 - Seleciona um arquivo da pasta fixtures', function(){
        //cypress/fixtures/example.json
        cy.get('input[id="file-upload"]').selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        });
    })
    it('Ex15 - Seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[id="file-upload"]').selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        });
    })
    it('Ex16 - Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        //CY.FIXTURE busca arquivos da pasta CYPRESS/FIXTURES
        cy.fixture('example.json').as('arquivoExemplo');
        cy.get('input[id="file-upload"]').selectFile('@arquivoExemplo')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })

    })
    it('Ex17 - Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('div[id="privacy"] a').should('have.attr', 'target', '_blank');
    })
    it('Ex18 - Acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('div[id="privacy"] a').invoke('removeAttr', 'target').click();
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade');
  })
  it('Ex19 - Testa a página da política de privacidade de forma independente', function(){
    cy.visit('./src/privacy.html').should('be.ok');
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade');
  })
  it('Ex20 - Exibe e esconde as mensagens de sucesso e erro usando o .invoke', function(){
    //cy.invoke(show) serve para forçar a exibição de um elemento html
    //cy.invoke(hide) serve para esconder a exibição de um elemento
    cy.get('span[class="error"]')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')

  })
  it('Ex21 - Preenche a area de texto usando o comando invoke', function(){
    const texto = 'HELLO WORLD - TEXTO PARA PREENCHIMENTO DO TEXTAREA';
    cy.get('textarea[id="open-text-area"]').invoke('val', texto)
    .should('have.value', 'HELLO WORLD - TEXTO PARA PREENCHIMENTO DO TEXTAREA');
  })
  
  it.only('Ex22 - Procurando o gato', function(){
    //cy.contains('🐈').invoke('show')
    cy.get('#cat').invoke('show')
    .should('be.visible');

    //cy.invoke() pode ser utilizado para alterar itens do HTML
  })
})