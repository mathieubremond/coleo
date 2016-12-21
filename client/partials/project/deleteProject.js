Template.deleteProject.events({
    'click .yesBtn'(event, template) {
        //console.log("this = ", template);
        Meteor.call('projects.delete', {id: this._id});
        Modal.hide(template);
    }
});