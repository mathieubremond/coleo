import {Schema} from '../../lib/api/schemas/index.js';
import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function updateTask(arg) {
    let companyId = getCurrentUserCompanyId(Meteor.userId());
    let task = arg.insertDoc;
    let upTask = arg.updateDoc;

    //console.log("insert :", task);
    //console.log("updating : ", upTask);

    Schema.taskSchema.validate(upTask, {modifier: true});

    Tasks.update({_id: task._id}, upTask);

    serverMessages.notify('serverMessage:company', 'Info', 'Tâche mise à jour : ' + task.name, {
        companyId: companyId,
        timeout: 1000
    });
}