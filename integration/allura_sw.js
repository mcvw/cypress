const loginToAllura = () => {
    cy.visit('http://amigos.staging.intu.co.uk/djanus/allura/');
    
    cy.get('input[name=username]')
        .type('root')
        .should('have.value', 'root');
    
    cy.get('input[name=password]')
        .type('passwordpassword')
        .should('have.value', 'passwordpassword');
    
    cy.get("input[name='csrfmiddlewaretoken']").then($input => {
        cy.setCookie('csrftoken', $input.val());
        cy.get('form').submit();
    });
}


describe("My first Allura test", function() {
    before(() => {
        cy.visit('http://amigos.staging.intu.co.uk/djanus/allura/');
    });

    it('Open the Allura url', function() {
        cy.title().should('include', 'Login')
    })

    context('Logged in', () => {
        beforeEach(() =>  {
            loginToAllura();
        });

        it('Display Welcome page', function() {
            cy.get('h2').should('contain', 'Welcome');
        });

        it('Check Navigation', function() {
            const basicNav = [
                { 'label': 'Centres', 'url': '/allura/centres'}, 
                { 'label': 'Retailers', 'url': '/allura/retailers'}, 
                { 'label': 'Affiliate networks', 'url': '/allura/affiliate_networks'}, 
                { 'label': 'Integrations', 'url': '/allura/retailer_integrations'}
            ];

            basicNav.forEach((navItem) => {
                cy.get('nav li').contains(navItem.label).click();
                cy.url().should('include', navItem.url); 
            });
        });
    });
});