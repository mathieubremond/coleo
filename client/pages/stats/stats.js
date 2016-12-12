Template.stats.onCreated(function () {
    Session.set('currentPage', 'Statistiques');
    let self = this;
    self.autorun(function () {
        self.subscribe('tasks.list', {
            projectIds: Session.get('selectedProjectIds'),
            teamIds: Session.get('selectedTeamIds')
        });
    })
});