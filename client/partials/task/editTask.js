import {Schema} from '../../../lib/api/schemas/index.js';
import {showNotificationError} from '../../notifications/index.js';

Template.editTask.onCreated(function() {
    let template = Template.instance();
    template.creatorName = new ReactiveVar();
});

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
    },
    creatorName: () => {
        let data = Template.instance().data;
        let creatorName = Template.instance().creatorName;

        // Si on connait déjà le nom du créateur de la tâche,
        // on stoppe l'exécution de la function en retournant le nom en question
        if(!!creatorName.get()) {
            return creatorName.get();

        } else {
            // Sinon on récupère le nom du créateur de la tâche depuis la coté serveur
            Meteor.call('tasks.getCreator', data._id, function (err, creator) {
                if (!!err || !creator) return null;

                console.log("creator = ", creator);

                // On met à jour la reactive var
                creatorName.set(creator.firstName + " " + creator.lastName);
            });
        }
    },
    creationDate: () => {
        let data = Template.instance().data;
        // La date de création de la tâche
        let creationDate = data.createdAt;
        let formatedCreationDate = moment(creationDate).format('DD/MM/YY [à] H[h]mm');
        return formatedCreationDate;
    }
});

Template.editTask.onRendered(function () {
    // Init du checkbox
    $('#editTaskDone input[type="checkbox"]').each(function () {
        let $checkbox = $(this);
        $checkbox.checkbox();
    });
});

