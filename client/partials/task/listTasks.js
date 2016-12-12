Template.listTasks.onCreated(function() {
    let self = this;
    self.showTasksDone = new ReactiveVar();
    self.showTasksDone.set(false);
});

Template.listTasks.helpers({
    selectTasks: () => {
        let selector = {};
        if(Session.get('selectedTeamIds').length > 0) {
            selector.teamId= {$in: Session.get('selectedTeamIds')}
        }
        if(Session.get('selectedProjectIds').length > 0) {
            selector.projectId= {$in: Session.get('selectedProjectIds')}
        }
        if(Template.instance().showTasksDone.get() != true) {
            selector.done = false;
        }
        return selector;
    }
});

Template.listTasks.events({
    'click .add-task'() {
        if(Session.get('selectedTeamIds').length == 0
            || Session.get('selectedProjectIds').length == 0 ) {
            Modal.show('selectProjectTeamModal');
        } else {
            Modal.show('addTask');
        }
    },
    'change #showTasksDone'(event, template) {
        let checked = $('#showTasksDone').prop('checked');
        template.showTasksDone.set(checked);
    }
});

Template.listTasks.onRendered(function() {
    $(".task-table-container input[type=search]").attr("placeholder", "Rechercher (appuyer sur entrée)");
    $(".dataTables_processing").first().remove();
});