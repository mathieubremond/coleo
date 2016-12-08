Template.listTasks.onCreated(function() {
    let self = this;
    self.autorun(function() {
        self.subscribe('tasks.list', {
            projectIds: Session.get('selectedProjectIds'),
            teamIds: Session.get('selectedTeamIds')
        });
    });
});

Template.listTasks.helpers({
    tasks: () => {
        if(!Session.get('currentColeoUser')) return null;
        return Tasks.find({companyId: Session.get('currentColeoUser').companyId});
    },
    selectTasks: () => {
        return {
            $or: [
                {teamId: {$in: Session.get('selectedTeamIds')}},
                {projectId: {$in: Session.get('selectedProjectIds')}}
            ]
        };
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
    }
});

Template.listTasks.onRendered(function() {
    $(".task-table-container input[type=search]").attr("placeholder", "Rechercher (appuyer sur entrée)");
});