import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function removeTask(id) {
    let companyId = getCurrentUserCompanyId(Meteor.userId());

    let taskToRemove = Tasks.findOne({_id:id});

    if(!taskToRemove) {
        throw new Meteor.Error(500, 'La tâche n\'existe pas.', e);
    }

    Tasks.remove({_id: taskToRemove._id});

    serverMessages.notify('serverMessage:company',
        'Info', 'Tâche supprimée : ' + taskToRemove.name, {
        companyId: companyId,
        timeout: 1000
    });
}