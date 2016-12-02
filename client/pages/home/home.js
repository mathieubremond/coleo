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
        FlowRouter.go('suivi');
    }
});