Template.listTasks.onCreated(function() {
    let self = this;
    self.selectTaskDone = new ReactiveVar(false);
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
        let selector = {
            companyId: Session.get('currentColeoUser').companyId
        };
        if(!Template.instance().selectTaskDone.get()) {
            selector.done = false;
        }
        return Tasks.find(selector);
    },
    selectTasks: () => {
        return {
            $or: [
                {teamId: {$in: Session.get('selectedTeamIds')}},
                {projectId: {$in: Session.get('selectedProjectIds')}}
            ]
        };
    },
    selectTaskDone: () => {return Template.instance().selectTaskDone.get()}
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
    'click #selectTaskDone'(event, template) {
        console.log("this.selectTaskDone.get() : ", template.selectTaskDone.get());
        template.selectTaskDone.set(true);
    }
});

Template.listTasks.onRendered(function() {
    $(".task-table-container input[type=search]").attr("placeholder", "Rechercher (appuyer sur entrée)");
});