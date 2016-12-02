// Initialisation des messages
serverMessages = new ServerMessages();

if (Meteor.isClient) {
    Accounts.onLogout(function () {
        console.log("Deconnexion !");
        FlowRouter.go("home");
    });
}
