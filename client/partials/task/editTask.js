import {Schema} from '../../../lib/api/schemas/index.js';
import {showNotificationError} from '../../notifications/index.js';

Template.editTask.events({
    'click .btn-add-save'(event, template) {

        //console.log("click .btn-add-save");
        let valid = AutoForm.validateForm('EditTaskForm');
        //console.log("form is valid ? ", valid);

        let value = AutoForm.getFormValues('EditTaskForm');
        //console.log("form value = ", value);

        if(valid) {
            value.insertDoc._id = template.data._id;
            //console.log("Maj de la tâche : ", value);
            Modal.hide(template);
            Meteor.call('tasks.update', value);
        } else {
            showNotificationError('bottom', 'right', 'Oups', "Une erreur s'est produite.");
        }
    }
});

Template.editTask.helpers({
    temporaryTaskSchema: () => Schema.temporaryTaskSchema,
    projectName: () => {
        let data = Template.instance().data;
        let pjt = Projects.findOne({_id: data.projectId});

        if (!!pjt) {
            return pjt.name;
        } else {
            return '...';
        }
    },
    teamName: () => {
        let data = Template.instance().data;
        let tm = Teams.findOne({_id: data.teamId});
        if (!!tm) {
            return tm.name;
        } else {
            return '...';
        }
    }
});

Template.editTask.onRendered(function () {
    // Init du checkbox
    $('#editTaskDone input[type="checkbox"]').each(function () {
        let $checkbox = $(this);
        $checkbox.checkbox();
    });
});

