FlowRouter.route('/', {
    name: 'home',
    triggersEnter: [function (context, redirect) {
        if (!!Meteor.userId()) {
            let coleoUser = ColeoUsers.findOne({userId: Meteor.userId()});

            if (!!coleoUser) {

                // Si l'utilisateur est connecté et possède un profil coleo
                redirect('/suivi');
            }
        }
    }],
    action() {
        BlazeLayout.render('home');
    }
});
FlowRouter.route('/home', {
    name: 'homePage',
    triggersEnter: [function (context, redirect) {
        if (!!Meteor.userId()) {
            let coleoUser = ColeoUsers.findOne({userId: Meteor.userId()});

            if (!!coleoUser) {

                // Si l'utilisateur est connecté et possède un profil coleo
                redirect('/suivi');
            }
        }
    }],
    action() {
        BlazeLayout.render('home');
    }
});

FlowRouter.route('/inscription', {
    name: 'inscription',
    action() {
        if (!!Meteor.userId()) {
            /*alert("Vous dévez être déconnecté pour accéder à la page d'inscription.\n" +
                "Vous avez été déconnecté.");*/
            Meteor.logout();
        }
        BlazeLayout.render('mainLayout', {main: 'inscription'});
    }
});

FlowRouter.route('/connexion', {
    name: 'connexion',
    action() {
        if (!!Meteor.userId()) {
            console.log("logout depuis routeur connexion");
            Meteor.logout(function() {
                BlazeLayout.render('mainLayout', {main: 'connexion'});
            });
        }
        else BlazeLayout.render('mainLayout', {main: 'connexion'});
    }
});

FlowRouter.route('/logout', {
    name: 'logout',
    action: function () {
        console.log("login out");
        if (!!Meteor.userId()) {
            Meteor.logout(function() {
                console.log("redirecting to home page");
                FlowRouter.redirect('/');
            });
        }
        else FlowRouter.redirect('/connexion');
    }
});

FlowRouter.notFound = {
    action: function () {
        BlazeLayout.render('notFound');
    }
};