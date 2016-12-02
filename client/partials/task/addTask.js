import {Schema} from '../../../lib/api/schemas/index.js';
// Ajout d'un hook avant la création de la tâche
AutoForm.hooks({
    AddTaskForm: {
        before: {
            method: function (task) {

                // Récupération du projet sélectionnée
                let selectedProjectId = Session.get('selectedProjectIds')[0];

                // Récupération de l'équipe sélectionnée
                let selectedTeamId = Session.get('selectedTeamIds')[0];

                task.projectId = selectedProjectId;
                task.teamId = selectedTeamId;

                return task;
            }
        }
    }
});

Template.addTask.helpers({
    temporaryTaskSchema: () => Schema.temporaryTaskSchema
});