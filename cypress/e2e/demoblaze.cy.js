/// <reference types='cypress' />
const {generateUser} = require('../support/generateUser');

describe('Registration', () => {
    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/');
        cy.findById('signin2').click();
    });
    it('should contains Sign up form', () => {
        cy.findById('sign-username').should('exist').and('be.visible');
        cy.findById('sign-password').should('exist').and('be.visible');
        cy.contains('button', 'Sign up').should('exist').click()
    });

    it('should provide the ability to register new user ', () => {
        const {username, password} = generateUser();
        cy.findById('sign-username').type(username);
        cy.wait(1000);
        cy.findById('sign-password').type(password);
        cy.wait(1000);
        cy.contains('button', 'Sign up').should('exist').click()
        cy.on('window:alert', (message) => { 
            expect(message).to.equal('Sign up successful.')
        }); 
    });

    it('should not provide the ability to register with empty form', () => {
        cy.wait(1000);
        cy.contains('button', 'Sign up').should('exist').click()
        cy.on('window:alert', (message) => { 
            expect(message).to.equal('Please fill out Username and Password.')
        }); 
    });

    it('should not provide the ability to register without username ', () => {
        const {username, password} = generateUser();
        cy.findById('sign-password').type(password);
        cy.wait(1000);
        cy.contains('button', 'Sign up').should('exist').click()
        cy.on('window:alert', (message) => { 
            expect(message).to.equal('Please fill out Username and Password.')
        }); 
    });

    it('should not provide the ability to register without password ', () => {
        const {username, password} = generateUser();
        cy.findById('sign-username').type(username);
        cy.wait(1000);
        cy.contains('button', 'Sign up').should('exist').click()
        cy.on('window:alert', (message) => { 
            expect(message).to.equal('Please fill out Username and Password.')
        }); 
    });
});

describe('Login', () => {
    beforeEach(() => {
        cy.visit('https://www.demoblaze.com/');
        cy.findById('login2').click();
    });

    it('should contains Log in form', () => {
        cy.findById('loginusername').should('exist').and('be.visible');
        cy.findById('loginpassword').should('exist').and('be.visible');
        cy.contains('button', 'Close').should('exist');
        cy.contains('button', 'Log in').should('exist').and('be.visible');
    });

    it('should provide the avility to login with valid data', () => {
        const username = 'andriidydyk';
        const password = 'Qwer1234';
        
        cy.wait(1000);
        cy.findById('loginusername').type(username);
        cy.wait(1000);
        cy.findById('loginpassword').type(password);
        cy.wait(1000);
        cy.contains('button', 'Log in').click();
        cy.contains('a', username).should('exist').and('be.visible');
    });

    it('should not provide the avility to login with empty form', () => {
        cy.contains('button', 'Log in').click();
        cy.on('window:alert', (message) => { 
            expect(message).to.equal('Please fill out Username and Password.')
        }); 
    });

    it('should not provide the avility to login with wrong username', () => {
        const username = 'adydyk';
        const password = 'Qwer1234';

        cy.wait(1000);
        cy.findById('loginusername').type(username);
        cy.wait(1000);
        cy.findById('loginpassword').type(password);
        cy.wait(1000);
        cy.contains('button', 'Log in').click();
        cy.on('window:alert', (message) => { 
            expect(message).to.equal('User does not exist.')
        }); 
    });

    it('should not provide the avility to login with wrong password', () => {
        const username = 'andriidydyk';
        const password = 'WrongPassword';

        cy.wait(1000);
        cy.findById('loginusername').type(username);
        cy.wait(1000);
        cy.findById('loginpassword').type(password);
        cy.wait(1000);
        cy.contains('button', 'Log in').click();
        cy.on('window:alert', (message) => { 
            expect(message).to.equal('Wrong password.')
        }); 
    });
});

describe('Add items to cart', () => {
    beforeEach(() => {
        cy.clearCookies();
    })
    it('should provide the ability to add items to cart', () => {
        cy.login().then (() => {
            cy.visit('https://www.demoblaze.com/');
            cy.contains('a', 'Samsung galaxy s6').should('exist').click();
            cy.contains('h2', 'Samsung galaxy s6').should('exist');
            cy.contains('a', 'Add to cart').should('exist').click();
            cy.on('window:alert', (message) => { 
                expect(message).to.equal('Product added.')
            });
        })
    });
});