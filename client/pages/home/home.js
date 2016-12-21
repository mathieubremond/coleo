
Template.home.onCreated(function () {
    let self = this;
    self.autorun(function () {
        if(Meteor.userId()) {
            // On subscribe a l'utilisateur courant et à l'entreprise courante
            // Permettra de ne récupérer que les taches qui concerne l'entreprise
            // et l'utilisateur connecté
            self.subscribe('coleousers.current', function() {
                let currentColeoUser = ColeoUsers.findOne({userId: Meteor.userId()});
                Session.set('currentColeoUser', currentColeoUser);
            });
            self.subscribe('clients.current', function() {
                let currentClientUser = Clients.findOne({userId: Meteor.userId()});
                Session.set('currentClientUser', currentClientUser);
            });
            self.subscribe('companies.current', function() {
                let currentCompany = Companies.findOne({});
                Session.set('currentCompany', currentCompany);
            });
        }
    });
});
Template.home.helpers({
    loggedIn: () => Meteor.userId()
});
Template.home.events({
    'click #connexionBtn' (){
        FlowRouter.go('connexion');
    },
    'click #inscriptionBtn' (){
        FlowRouter.go('inscription');
    },
    'click #suiviBtn' (){
        let coleo = Session.get('currentColeoUser');
        let client = Session.get('currentClientUser');
        if(!!coleo)
            FlowRouter.go('suivi');
        if(!!client)
            FlowRouter.go('client');
    }
});