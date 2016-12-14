Template.listTasks.onCreated(function() {
    let self = this;
    self.showTasksDone = new ReactiveVar();
    self.showTasksDone.set(false);

    self.autorun(function() {
        let selectPjt = {hide:false};
        let selectedProjectIds = Session.get('selectedProjectIds');
        if(!!selectedProjectIds || selectedProjectIds > 0) {
            selectPjt._id = {$in: selectedProjectIds};
        }
        let pjtIds = Projects.find(selectPjt).map((item) => {
            return item._id;
        });
        self.subscribe('tasks.list', {
            projectIds: pjtIds,
            teamIds: Session.get('selectedTeamIds')
        });
    })
});

Template.listTasks.helpers({
    showTasksDone: () => {return Template.instance().showTasksDone.get();},
    tasks: () => {
        let teamIds = Session.get('selectedTeamIds');
        let projectIds = Session.get('selectedProjectIds');
        if(teamIds.length == 0 && projectIds.length == 0) {
            return null;
        }

        let selector = {};
        // Si la checkbox est pas coché, on ne montre que les taches en cours
        if(Template.instance().showTasksDone.get() != true) {
            selector.done = false;
        }

        // On ne retourne que les tâches dont le projet n'est pas terminé
        if(Projects.find().count() > 0) {
            let pjtIds = Projects.find({hide: false}).map((item) => {
                return item._id;
            });
            selector.projectId = {$in: pjtIds};
        }

        return Tasks.find(selector);
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

Template.rowTask.events({
    'click a.edit-task'(event, template) {
        let t = Tasks.findOne({_id: this._id});
        Modal.show('editTask', t);
    },
    'click a.delete-task'(event, template) {
        let t = Tasks.findOne({_id: this._id});
        Modal.show('removeTask', t);
    },
    'click tr'(){
        let t = Tasks.findOne({_id: this._id});
        Modal.show('editTask', t);
    }
});