Template.removeUserModal.events({
    'click .yesBtn'(event, template) {
        let id = FlowRouter.getParam('id');
        if (!id) return null;
        Meteor.call('users.remove', {_id:id});
        Modal.hide(template);
        FlowRouter.go('users');
    }
});