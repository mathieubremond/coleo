Template.taskActionCell.events({
    'click a.edit-task'(event, template) {
        let t = Tasks.findOne({_id: this._id});
        Modal.show('editTask', t);
    },
    'click a.delete-task'(event, template) {
        let t = Tasks.findOne({_id: this._id});
        Modal.show('removeTask', t);
    }
});