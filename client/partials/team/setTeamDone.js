Template.setTeamDone.onCreated(function(){
    Session.set('selectedTeamIds', []);
    Session.set('selectedProjectIds', []);
});

Template.setTeamDone.events({
    'click .yesBtn'(event, template) {
        Meteor.call('teams.markAsDone', template.data._id);
        Modal.hide(template);
        Session.set('selectedTeamIds', []);
    }
});