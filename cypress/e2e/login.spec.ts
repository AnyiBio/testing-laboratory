describe('Login specs', () => {
    it('visit the login page', () => {
        cy.visit('/')
    })

    it('should name input has the focus when it clicks on it', () => {
        // Arrange
    
        // Act
        cy.visit('/');
        cy.get('input[name="user"]').click();
    
        // Assert
        cy.get('input[name="user"]').should('have.focus');
      });
      
      it('should show an alert with a message when type invalid credentials', () => {
        // Arrange
        const user = 'admin';
        const password = 'test';
    
        // Act
        cy.visit('/');
        cy.get('input[name="user"]').as('userInput');
        cy.get('input[name="password"]').as('passwordInput');

        cy.get('@userInput').type(user);
        cy.get('@passwordInput').type(password);

        // Assert
        cy.get('@userInput').should('have.value', user);
        cy.get('@passwordInput').should('have.value', password);

      });
    

})