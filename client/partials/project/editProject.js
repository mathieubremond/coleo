import {Schema} from '../../../lib/api/schemas/index.js';
import {showNotificationError} from '../../notifications/index.js';

Template.editProject.onCreated(function() {
    let self = this;
    self.autorun(function () {
        let id = FlowRouter.getParam('id');
        self.subscribe('projects.single', id);
    });
});

Template.editProject.helpers({
    project: () => {
        let id = FlowRouter.getParam('id');
        return Projects.findOne({_id: id});
    },
    projectSchema: () => Schema.projectSchema
});

AutoForm.hooks({
    editProjectForm: {
        after: {
            update: (error, result) => {
                if(!!error) {
                    showNotificationError('top', 'right', 'Erreur', error.reason);
                } else {
                    FlowRouter.go('projects');
                }
            }
        }
    }
});