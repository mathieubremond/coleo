// Initialisation des messages
serverMessages = new ServerMessages();

if (Meteor.isClient) {
    Accounts.onLogout(function () {
        console.log("Déconnexion !");
        Modal.show('logoutPopup', null, {
            backdrop: 'static',
            keyboard: false
        });
    });
}
