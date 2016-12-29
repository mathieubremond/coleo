Template.firstLogin.events({
    'click .understood'(event, template) {

        // Modification du boolean regissant le comportement de Coleo lors de la premiere connexion
        Meteor.call('users.updateFirstLogin', {firstLogin: false});

        // Fermeture du modal
        Modal.hide(template);
    }
});