Template.deleteClient.events({
    'click .yesBtn'(event, template) {
        //console.log("this = ", this);
        Meteor.call('users.removeClient', template.data);
        Modal.hide(template);
    }
});