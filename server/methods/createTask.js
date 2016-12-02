import {Schema} from '../../lib/api/schemas/index.js';
import {getCurrentUserCompanyId} from '../helpers/getCurrentUserCompanyId.js';

export function createTask (task) {

    var companyId = getCurrentUserCompanyId(Meteor.userId());

    Schema.taskSchema.clean(task);
    task.companyId = companyId;
    Schema.taskSchema.validate(task);
    Tasks.insert(task);

    serverMessages.notify('serverMessage:company', 'Info', 'Tâche ajoutée : ' + task.name, {
        companyId: companyId,
        timeout: 5000
    });
}