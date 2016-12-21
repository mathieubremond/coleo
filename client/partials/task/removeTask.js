Template.removeTask.events({
    'click .btn-add-suppr'(event, template) {
        //console.log("template data = ", template.data._id);
        Meteor.call('tasks.remove', template.data._id);
        //Tasks.remove({_id: template.data._id});
        Modal.hide(template);
    }
});