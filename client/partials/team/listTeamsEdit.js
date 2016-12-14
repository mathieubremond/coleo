Template.listTeamsEdit.onCreated(function () {
    let template = Template.instance();

    let arr = Session.get('selectedTeamIds');
    if(!arr || arr.length == 0) {
        Session.set('selectedTeamIds', []);
    }
});

Template.listTeamsEdit.onRendered(function () {
    let self = this;

    self.autorun(function () {
        self.subscribe('teams.list', {
            search: null,
            selectedIds: Session.get('selectedTeamIds') || []
        });
    });
});

Template.listTeamsEdit.helpers({
    teams: () => {
        if (!Session.get('currentColeoUser')) return null;
        return Teams.find({hide:false, companyId: Session.get('currentColeoUser').companyId});
    }
});

Template.listTeamsEdit.events({
    'click .editTeam': redirectEditTeam,
    'click .removeTeam': deleteTeam,
});


function deleteTeam (event, template) {
    Modal.show('setTeamDone', this);
}

function redirectEditTeam(event, template) {
    FlowRouter.go('team', {id: this._id});
}
