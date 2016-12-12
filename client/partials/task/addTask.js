import {Schema} from '../../../lib/api/schemas/index.js';
import {showNotificationError} from '../../notifications/index.js';

Template.addTask.helpers({
    temporaryTaskSchema: () => Schema.temporaryTaskSchema,
    projectOptions() {
        let selectedProjectIds = Session.get('selectedProjectIds');
        if (selectedProjectIds && selectedProjectIds.length > 0) {
            let selectedProjects = Projects.find({_id: {$in: selectedProjectIds}});
            let returnArray = [];
            selectedProjects.forEach((val) => {
                returnArray.push({value: val._id, label: val.name});
            });
            return returnArray;
        } else {
            return [{value: 0, label: "Aucun projet sélectionné"}];
        }
    },
    teamOptions() {
        let selectedTeamIds = Session.get('selectedTeamIds');
        if (selectedTeamIds && selectedTeamIds.length > 0) {
            let selectedTeams = Teams.find({_id: {$in: selectedTeamIds}});
            let returnArray = [];
            selectedTeams.forEach((val) => {
                returnArray.push({value: val._id, label: val.name});
            });
            return returnArray;
        } else {
            return [{value: 0, label: "Aucune équipe sélectionnée"}];
        }
    }
});

Template.addTask.events({
    'click .btn-add-task'(event, template) {
        //console.log("click .btn-add");
        let valid = AutoForm.validateForm('AddTaskForm');
        //console.log("form is valid ? ", valid);
        let value = AutoForm.getFormValues('AddTaskForm');
        //console.log("form value = ", value);
        if(valid) {
            console.log("Sauvegarde de la tâche : ", value);
            Modal.hide(template);
            Meteor.call('tasks.create', value.insertDoc);
        } else {
            showNotificationError('top', 'right', 'Oups', "Une erreur s'est produite.");
        }
    }
});



Template.addTask.onRendered(function() {
    // Init du checkbox
    $('#addTaskDone input[type="checkbox"]').each(function () {
        let $checkbox = $(this);
        $checkbox.checkbox();

    });
});