// Initialisation des messages
serverMessages = new ServerMessages();

if (Meteor.isClient) {
    Accounts.onLogout(function () {
        //console.log("Déconnexion !");
        FlowRouter.go("home");
    });
}
