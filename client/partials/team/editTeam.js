import {showNotificationError} from '../../notifications/index.js';

Template.editTeam.onCreated(function() {
    let self = this;
    self.autorun(function () {
        let id = FlowRouter.getParam('id');
        self.subscribe('teams.single', id);
    });
});

Template.editTeam.helpers({
    team: () => {
        let id = FlowRouter.getParam('id');
        return Teams.findOne({_id: id});
    }
});

AutoForm.hooks({
    editTeamForm: {
        after: {
            update: (error, result) => {
                if(!!error) {
                    showNotificationError('top', 'right', 'Erreur', error.reason);
                } else {
                    FlowRouter.go('teams');
                }
            }
        }
    }
});