Template.inscription.onCreated(function () {
    Session.set('inscriptionStep', 'company');
    Session.set('inscriptionCompany', null);
});
Template.inscription.helpers({
    stepCompany: () => {return Session.get('inscriptionStep')=='company';},
    stepAdmin: () => {return Session.get('inscriptionStep')=='admin';},
    stepConfirmation: () => {return Session.get('inscriptionStep')=='confirmation';}
});
Template.inscription.events({
    'click .logout'() {Meteor.logout();}
});
Template.inscription.onRendered(function() {
    // Init des checkbox
    $('input[type="checkbox"]').each(function () {
        let $checkbox = $(this);
        $checkbox.checkbox();
    });
});