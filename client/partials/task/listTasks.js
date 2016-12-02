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
    }
});