import {initPaperDashboard} from '../assets/js/paper-dashboard.js';
Template.registerHelper( 'currentPage', () => {
    return Session.get('currentPage') || 'Suivi';
});
Template.suiviLayout.onCreated(function () {
    let self = this;

    Session.set('currentPage', 'Suivi');
    Session.set('selectedTeamIds', []);
    Session.set('selectedProjectIds', []);

    setTimeout(()=> {
        if (!Meteor.userId()) {
            FlowRouter.go('home');
        }

        let contextHotkeys = new Hotkeys();

        contextHotkeys.add({
            combo: "ctrl+n",
            callback: function () {
                if (Session.get('selectedTeamIds').length == 0
                    || Session.get('selectedProjectIds').length == 0) {
                    Modal.show('selectProjectTeamModal');
                } else {
                    Modal.show('addTask');
                }
            }
        });

        contextHotkeys.add({
            combo: "up up down down left right left right b a enter",
            callback: function () {
                alert("Konami Code !");
            }
        });

        self.autorun(function () {
            if (Meteor.userId()) {
                // On subscribe a l'utilisateur courant et à l'entreprise courante
                // Permettra de ne récupérer que les taches qui concerne l'entreprise
                // et l'utilisateur connecté
                self.subscribe('coleousers.current', function () {
                    let currentColeoUser = ColeoUsers.findOne({userId: Meteor.userId()});
                    if(!currentColeoUser)
                    {
                        FlowRouter.go('home');
                    }
                    Session.set('currentColeoUser', currentColeoUser);
                });
                self.subscribe('companies.current', function () {
                    let currentCompany = Companies.findOne({});
                    Session.set('currentCompany', currentCompany);
                });
            }
        });

    },1500);
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
        if( curName == name ||  ( gestionTab.indexOf(curName) > -1 && name=="Gestion" ) ) {
            return 'active';
        } else {
            return '';
        }
    },
    hostname: () => {
        let full = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
        return full;
    }
});

Template.suiviLayout.events({
    'click .add-task'() {
        if(Session.get('selectedTeamIds').length == 0
            || Session.get('selectedProjectIds').length == 0 ) {
            Modal.show('selectProjectTeamModal');
        } else {
            Modal.show('addTask');
        }
    }
});

Template.suiviLayout.onRendered(initPaperDashboard);
/*

function setUserTeamId() {
    let user = Session.get('currentColeoUser');
    let userName = user.firstName + ' ' + user.lastName;
    Meteor.call('teams.getTeamByName', userName, function(err, data) {
        if(!!err) {
            console.log(err);
            return;
        }
        //console.log("data : ", data);
        if(!!data)
            Session.set('selectedTeamIds', [data._id]);
    });
}*/
