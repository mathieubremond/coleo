import {initPaperDashboard} from '../assets/js/paper-dashboard.js';
Template.registerHelper( 'currentPage', () => {
    return Session.get('currentPage') || 'Suivi';
});
Template.suiviLayout.onCreated(function () {
    var self = this;

    Session.set('currentPage', 'Suivi');

    self.autorun(function () {
        if(Meteor.userId()) {
            // On subscribe a l'utilisateur courant et à l'entreprise courante
            // Permettra de ne récupérer que les taches qui concerne l'entreprise
            // et l'utilisateur connecté
            self.subscribe('coleousers.current', function() {
                let currentColeoUser = ColeoUsers.findOne({userId: Meteor.userId()});
                Session.set('currentColeoUser', currentColeoUser);
            });
            self.subscribe('companies.current', function() {
                let currentCompany = Companies.findOne({});
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
    },
    active: function(name) {
        let curName = Session.get('currentPage');
        let gestionTab = ['Utilisateurs', 'Projets', 'Équipes'];
        console.log("name  = ", name);
        console.log("curName = ", curName);
        if( curName == name ||  ( gestionTab.indexOf(curName) > -1 && name=="Gestion" ) ) {
            return 'active';
        } else {
            return '';
        }
    }
});

Template.suiviLayout.onRendered(initPaperDashboard);