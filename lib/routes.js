// Redirection après le login ou logout de l'utilisateur
if(Meteor.isClient) {
    Accounts.onLogin(function() {
        FlowRouter.go('suivi');
    });

    Accounts.onLogout(function() {
        FlowRouter.go('home');
    });
}

FlowRouter.route('/', {
    name: 'home',
    action() {
        // Si l'utilisateur est déjà connecté, direction vers la page de suivi
        if(Meteor.userId()) {
            FlowRouter.go('suivi');
        }
        BlazeLayout.render('mainLayout', {main: 'home'});
    }
});

FlowRouter.route('/inscription', {
    name: 'inscription',
    action() {
        //if(!!Meteor.userId()) Meteor.logout();
        BlazeLayout.render('mainLayout', {main: 'inscription'});
    }
});

FlowRouter.route('/suivi', {
    name: 'suivi',
    action() {
        BlazeLayout.render('mainLayout', {main: 'suivi'});
    }
});

FlowRouter.route('/connexion', {
    name: 'connexion',
    action() {
        if(!!Meteor.userId()) Meteor.logout();
        BlazeLayout.render('mainLayout', {main: 'connexion'});
    }
});