import {initPaperDashboard} from '../assets/js/paper-dashboard.js';

Template.suiviLayout.onCreated(function () {
    var self = this;

    self.autorun(function () {
        if(Meteor.userId()) {
            // On subscribe a l'utilisateur courant et à l'entreprise courante
            // Permettra de ne récupérer que les taches qui concerne l'entreprise
            // et l'utilisateur connecté
            self.subscribe('coleousers.current', function() {
                var currentColeoUser = ColeoUsers.findOne({userId: Meteor.userId()});
                Session.set('currentColeoUser', currentColeoUser);
            });
            self.subscribe('companies.current', function() {
                var currentCompany = Companies.findOne({});
                Session.set('currentCompany', currentCompany);
            });
        }
    });
});

Template.suiviLayout.helpers({
    currentColeoUser: function () {
        // L'utilisateur coleo courant
        return Session.get('currentColeoUser');
    },
    currentCompany: function () {
        // La premiere instance dans la base mongo locale
        return Session.get('currentCompany');
    }
});

Template.suiviLayout.onRendered(initPaperDashboard);