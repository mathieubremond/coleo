import {Schema} from '../../../lib/api/schemas/index.js';
import {showNotificationError} from '../../notifications/index.js';

Template.editTeam.onCreated(function() {
    Session.set('currentPage', 'Équipes');
    let self = this;
    self.autorun(function () {
        let id = FlowRouter.getParam('id');
        self.subscribe('teams.single', id);
        self.subscribe('users.list');
    });
});

Template.editTeam.helpers({
    temporaryTeamSchema: () => {return Schema.temporaryTeamSchema;},
    team: () => {
        let id = FlowRouter.getParam('id');
        let team = Teams.findOne({_id: id});
        //console.log("curr team : ", team);
        return team;
    },
    userOption: () => {
        let users = ColeoUsers.find().fetch();
        let returnArray = [];
        if(!!users)
            users.forEach((user) => {
                //console.log("user = ", user);
                returnArray.push({value: user._id, label: user.firstName+' '+user.lastName});
            });
        //console.log("returnArr : ", returnArray);
        return returnArray;
    }
});

AutoForm.hooks({
    editTeamForm: {
        before: {
            method: (doc) => {
                doc.id = FlowRouter.getParam('id');
                return doc;
            }
        },
        after: {
            method: (error, result) => {
                if(!!error) {
                    showNotificationError('bottom', 'right', 'Erreur', error.reason);
                } else {
                    FlowRouter.go('teams');
                }
            }
        }
    }
});
