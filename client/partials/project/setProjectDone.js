Template.setProjectDone.onCreated(function(){
    Session.set('selectedTeamIds', []);
    Session.set('selectedProjectIds', []);
});
Template.setProjectNotDone.onCreated(function(){
    Session.set('selectedTeamIds', []);
    Session.set('selectedProjectIds', []);
});

Template.setProjectDone.events({
    'click .yesBtn'(event, template) {
        console.log("this = ", this);
        Meteor.call('projects.markAsDone', {id:this._id, done:true});
        Modal.hide(template);
        Session.set('selectedProjectIds', []);
    }
});
Template.setProjectNotDone.events({
    'click .yesBtn'(event, template) {
        Meteor.call('projects.markAsDone', {id:this._id, done:false});
        Modal.hide(template);
        Session.set('selectedProjectIds', []);
    }
});