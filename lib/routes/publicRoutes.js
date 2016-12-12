FlowRouter.route('/', {
    name: 'home',
    triggersEnter: [function (context, redirect) {
        if (!!Meteor.userId()) {
            var coleoUser = ColeoUsers.findOne({userId: Meteor.userId()});

            if (!!coleoUser) {

                // Si l'utilisateur est connecté et possède un profil coleo
                redirect('/suivi');
            }
        }
    }],
    action() {
        BlazeLayout.render('mainLayout', {main: 'home'});
    }
});

FlowRouter.route('/inscription', {
    name: 'inscription',
    action() {
        if (!!Meteor.userId()) Meteor.logout();
        BlazeLayout.render('mainLayout', {main: 'inscription'});
    }
});

FlowRouter.route('/connexion', {
    name: 'connexion',
    action() {
        if (!!Meteor.userId()) Meteor.logout();
        BlazeLayout.render('mainLayout', {main: 'connexion'});
    }
});

FlowRouter.route('/logout', {
    name: 'logout',
    action() {
        Meteor.logout();
    }
});

FlowRouter.notFound = {
    action: function () {
        BlazeLayout.render('mainLayout', {main: 'notFound'});
    }
};