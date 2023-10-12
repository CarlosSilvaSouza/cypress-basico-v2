/// <reference types="Cypress" />

describe('USANDO GET', function(){

it('TESTE - REQUEST PARA API', function(){
    cy.request({
        method: 'GET',
        url: 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
    })
    .should(function(response){
        expect(response.status).to.be.equal(200);
        expect(response.statusText).to.be.equal('OK');
        expect(response.body).to.be.contain('CAC TAT');
    })
})
})