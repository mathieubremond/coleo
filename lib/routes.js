if(Meteor.isClient) {
    Accounts.onLogout(function() {
       FlowRouter.go("home");
    });
}

FlowRouter.route('/', {
    name: 'home',
    action() {
        // Si l'utilisateur est déjà connecté, direction vers la page de suivi
        if(Meteor.userId()) {
            console.log("Redirection vers suivi car deja conecte");
            FlowRouter.go('suivi');
        }
        BlazeLayout.render('mainLayout', {main: 'home'});
    }
});

FlowRouter.route('/inscription', {
    name: 'inscription',
    action() {
        BlazeLayout.render('mainLayout', {main: 'inscription'});
    }
});

FlowRouter.route('/suivi', {
    name: 'suivi',
    action() {
        if(!Meteor.userId()) FlowRouter.go('home');
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