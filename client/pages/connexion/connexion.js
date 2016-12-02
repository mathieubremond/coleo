let WaitTimer = 1000;

Template.connexion.events({
    'submit form' : function() {
        function sleep (time) {
            return new Promise((resolve) => setTimeout(resolve, time));
        }
        async function checkIfLoggedIn() {
            await sleep(WaitTimer);

            // Si l'utilisateur est connecté (et pas en cours de connexion)
            if(!!Meteor.userId()) {
                FlowRouter.go('suivi');
                Session.set('onGoingConnexion', false);
                return true;
            } else if(Meteor.loggingIn()) {
                return checkIfLoggedIn();
            } else {
                Session.set('onGoingConnexion', false);
                return false;
            }
        }
        Session.set('onGoingConnexion', true);
        checkIfLoggedIn();
    },
    'click #logoBig' () {/*FlowRouter.go('home');*/}
});

Template.connexion.helpers({
    // Pour savoir si l'utilisateur est en train de se connecter
    onGoing: () => {
        return Session.get('onGoingConnexion');
    }
});