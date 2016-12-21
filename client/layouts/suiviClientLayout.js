import {initPaperDashboard} from '../assets/js/paper-dashboard.js';
Template.registerHelper( 'currentPage', () => {
    return Session.get('currentPage') || 'Statistiques';
});
Template.suiviClientLayout.onCreated(function () {
    let self = this;
    setTimeout(()=> {
        if(!Meteor.userId()) {
            FlowRouter.go('home');
        }

        Session.set('currentPage', 'Statistiques');
        Session.set('selectedTeamIds', []);
        Session.set('selectedProjectIds', []);

        self.autorun(function () {
            if (Meteor.userId()) {
                self.subscribe('clients.current', function () {
                    let currentClientUser = Clients.findOne({userId: Meteor.userId()});
                    if(!currentClientUser)
                    {
                        FlowRouter.go('home');
                    }
                    Session.set('currentClientUser', currentClientUser);
                });
                self.subscribe('coleousers.current', function () {
                    let currentColeoUser = ColeoUsers.findOne({userId: Meteor.userId()});
                    Session.set('currentColeoUser', currentColeoUser);
                });
                self.subscribe('companies.current', function () {
                    let currentCompany = Companies.findOne({});
                    Session.set('currentCompany', currentCompany);
                });
            }
        });


    }, 1500);
});

Template.suiviClientLayout.helpers({
    currentClientUser: function () {
        // L'utilisateur coleo courant
        return Session.get('currentClientUser');
    },
    currentCompany: function () {
        // La premiere instance dans la base mongo locale
        return Session.get('currentCompany');
    },
    hostname: () => {
        let full = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
        return full;
    }
});

Template.suiviClientLayout.onRendered(initPaperDashboard);
