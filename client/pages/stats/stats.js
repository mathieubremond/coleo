Template.stats.onCreated(function () {
    Session.set('currentPage', 'Statistiques');
    Session.set('selectedProjectIds', []);
    Session.set('selectedTeamIds', []);

    let self = this;
    self.autorun(function () {
        self.subscribe('tasks.list', {
            projectIds: Session.get('selectedProjectIds'),
            teamIds: Session.get('selectedTeamIds')
        });
    })
});